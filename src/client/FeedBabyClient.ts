import {AxiosInstance} from "axios";
import * as url from "url";
import {Feed} from "../models/Feed";
import FormData from "form-data";
import {defaultAndroidHttpClientFactory} from "./defaults/defaultAndroidHttpClientFactory";
import {defaultAppDataZipCreator} from "./defaults/defaultAppDataZipCreator";
import {AppData} from "./AppData";
import {defaultAppDataZipReader} from "./defaults/defaultAppDataZipReader";
import {v4 as uuidv4} from "uuid";
import {Growth} from "../models/Growth";
import {Medicine} from "../models/Medicine";
import {AuthParameters} from "./parameters/AuthParameters";
import {DeviceParameters} from "./parameters/DeviceParameters";
import {BaseParameters} from "./parameters/BaseParameters";
import {SyncParameters} from "./parameters/SyncParameters";

export type HttpClientFactory = (baseUrl: string) => AxiosInstance;

export class Device {
    public static create(): Device {
        return new Device(`${Date.now()}-${uuidv4()}`)
    }

    constructor(public readonly id: string) {
    }
}

export interface Authentication {
    /**
     * Alphanumeric string used by all devices sharing the data
     */
    readonly passphrase: string;
    /**
     * Date of birth used by all devices sharing the data
     */
    readonly dateOfBirth: Date;
}

export interface Version {
    readonly version: string;
    readonly dateOfLastSync: Date;
}

export interface AppDataZip {
    getFeeds: () => Promise<Feed[]>;
    getGrowths: () => Promise<Growth[]>;
    getMedicines: () => Promise<Medicine[]>;
    getBuffer: () => Buffer;
}

export interface AppDataZipReader {
    read(zip: Buffer): AppDataZip;
}

export interface AppDataZipCreator {
    create(appData: AppData): Buffer;
}

export class FeedBabyClient {
    private static readonly HOST: string = "http://www.feedbaby.com.au/";
    private static readonly BASE_PATH: string = "feedbabysync_v12";

    private static readonly PING_ENDPOINT: string = "/ping";
    private static readonly CHECK_VERSION_ENDPOINT: string = "/checkversion";
    private static readonly MERGE_ENDPOINT: string = "/merge";
    private static readonly REGISTER_DEVICE_TOKEN_ENDPOINT = "/registerDeviceToken";

    private client: AxiosInstance;
    private readonly baseParameters = new BaseParameters();
    private readonly syncParameters = new SyncParameters();
    private readonly authParameters = new AuthParameters();
    private readonly deviceParameters = new DeviceParameters();


    constructor(readonly host: string = FeedBabyClient.HOST,
                readonly httpClientFactory: HttpClientFactory = defaultAndroidHttpClientFactory,
                private readonly appDataCreator: AppDataZipCreator = defaultAppDataZipCreator(),
                private readonly appDataReader: AppDataZipReader = defaultAppDataZipReader()) {
        this.client = httpClientFactory(url.resolve(host, FeedBabyClient.BASE_PATH))
    }

    public async ping(): Promise<boolean> {
        let pingMessage = "";
        try {
            const response = await this.client.get<string>(
                FeedBabyClient.PING_ENDPOINT,
                {params: this.baseParameters.create()}
            );
            pingMessage = response.data;
        } catch (error) {
            console.error("Ping failed", {error});
        }

        return (pingMessage === "success");
    }

    /**
     * Determines the latest 'version' synchronisation, which is just a unix timestamp of the last sync.
     *
     * Contrary to what I thought this is not the same date returned in the Date header of the merge.
     */
    public async checkVersion(authentication: Authentication): Promise<Version> {
        this.authParameters.validate(authentication);

        const params = {
            ...this.baseParameters.create(),
            ...this.authParameters.create(authentication),
            ...this.syncParameters.create(),
        };

        const {data} = await this.client.get<number>(
            FeedBabyClient.CHECK_VERSION_ENDPOINT,
            {params}
        );

        try {
            return {
                version: `${data}`,
                dateOfLastSync: new Date(data)
            }
        } catch (err) {
            throw new Error(`API replied with value that is not a date: ${data}`);
        }

    }

    public async registerDevice(auth: Authentication, device: Device, deviceToken: string): Promise<string> {
        this.authParameters.validate(auth);
        this.deviceParameters.validate(device);

        const params = {
            ...this.baseParameters.create(),
            ...this.syncParameters.create(),
            ...this.authParameters.create(auth),
            ...this.deviceParameters.create(device),
            deviceToken,
        };

        const response = await this.client.get<string>(
            FeedBabyClient.REGISTER_DEVICE_TOKEN_ENDPOINT,
            {params}
        );

        return response.data;
    }

    /**
     * WARNING: This method is destructive!
     *
     * The first time a new device syncs with the server no data will be erased from the server, only added. What is
     * returned is all the data that the server has of the passphrase + date combination.
     *
     * Subsequent syncs for a device the server knows could result in data being erased from the account. i.e. if the
     * ZIP from the device doesn't contain data that the server knows it previously sent to the device, then the server
     * will assume the user of the device deleted this data, thus update the data on the server accordingly.
     *
     * @return Returns the merged sync
     */
    public async merge(auth: Authentication, device: Device, zip?: Buffer): Promise<AppDataZip> {
        this.authParameters.validate(auth);
        this.deviceParameters.validate(device);

        if (!zip) {
            zip = this.createZipFromAppFirstStart();
        }

        const responseZip = await this.mergeZip(auth, device, zip);
        return this.appDataReader.read(responseZip);
    }

    private async mergeZip(auth: Authentication, device: Device, zip: Buffer): Promise<Buffer> {
        const params = {
            ...this.baseParameters.create(),
            ...this.syncParameters.create(),
            ...this.authParameters.create(auth),
            ...this.deviceParameters.create(device),
            "lastSyncFinishedStatus": "FINISHED",
        };

        const form = new FormData();
        form.append("newZip", zip, {
            contentType: "application/zip",
            filename: 'newZip'
        });

        const formHeaders = form.getHeaders();

        try {
            const response = await this.client.post<Buffer>(FeedBabyClient.MERGE_ENDPOINT, form, {
                responseType: 'arraybuffer',
                params,
                headers: {
                    ...formHeaders,
                    "Accept-Encoding": "gzip",
                },
            });

            return response.data
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private createZipFromAppFirstStart(): Buffer {
        return this.appDataCreator.create({
            babies: [{
                id: "1",
                name: "",
                birthDate: "2019-06-19 00:00:00",
                babyType: "PRIMARY",
                gender: "MALE"
            }],
            babyDateOfBirth: [
                {
                    "id": "2",
                    "day_of_the_month": "19",
                    "month_of_the_year": "6",
                    "year": "2019"
                }
            ],
            babyImages: [],
            excretionNotificationTriggers: [],
            excretions: [],
            feeds: [],
            growths: [],
            journalEntries: [],
            medicineRecords: [],
            medicines: [],
            pauses: [],
            pumpingNotificationTriggers: [],
            pumpingTimeOfDayNotificationTriggers: [],
            pumpings: [],
            sleepingNotificationTriggers: [],
            sleepingsTimeOfDayNotificationTriggers: [],
            sleeps: [],
            teeths: [],
            temperatures: [],
            vaccinations: [],
            excretionTimeOfDayNotificationTriggers: [],
            feedingNotificationTriggers: [],
            feedingTimeOfDayNotificationTriggers: [],
            generalNotesNotificationTriggers: [],
            generalNotesTimeOfDayNotificationTriggers: [],
            medicationRecordsNotificationTriggers: [],
            medicationRecordsTimeOfDayNotificationTriggers: []
        });
    }
}
