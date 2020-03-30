import {AxiosInstance} from "axios";
import * as url from "url";
import {Feed} from "./models/Feed";
import FormData from "form-data";
import {defaultAndroidHttpClientFactory} from "./defaults/defaultAndroidHttpClientFactory";
import {defaultAppDataZipCreator} from "./defaults/defaultAppDataZipCreator";
import {AppData} from "./AppData";
import {defaultAppDataZipReader} from "./defaults/defaultAppDataZipReader";
import {v4 as uuidv4} from "uuid";
import {Growth} from "./models/Growth";
import {Medicine} from "./models/Medicine";

export type HttpClientFactory = (baseUrl: string) => AxiosInstance;

export class Device {
    public static create(): Device {
        return new Device(`${Date.now()}-${uuidv4()}`)
    }

    constructor(public readonly id: string) {
        if (!id){
            throw new Error("Device ID must be provided");
        }
    }
}

export interface SyncAuth {
    /**
     * Alphanumeric PassPhrase used by all devices sharing the data
     */
    passphrase: string;
    dateOfBirth: Date;
}

export interface Version {
    version: string;
    date: Date;
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

    constructor(readonly host: string = FeedBabyClient.HOST,
                readonly httpClientFactory: HttpClientFactory = defaultAndroidHttpClientFactory,
                private readonly appDataCreator: AppDataZipCreator = defaultAppDataZipCreator(),
                private readonly appDataReader: AppDataZipReader = defaultAppDataZipReader()) {
        this.client = httpClientFactory(url.resolve(host, FeedBabyClient.BASE_PATH))
    }

    private static getBaseParameters(): { [key: string]: string | number } {
        return {
            product: "pro",
            serverVersionCode: 1,
            flavor: "lite"
        }
    }

    private static createAuthParameters(syncAuth: SyncAuth): { [key: string]: string } {
        const pad = (value: number): string => ('0' + value).slice(-2);
        const paddedMonth = (date: Date): string => pad(date.getMonth() + 1);
        const paddedDay = (date: Date): string => pad(date.getDate());

        return {
            "passphrase": syncAuth.passphrase,
            "dob_year": `${syncAuth.dateOfBirth.getFullYear()}`,
            "dob_month": paddedMonth(syncAuth.dateOfBirth),
            "dob_day": paddedDay(syncAuth.dateOfBirth),
        }
    }

    public async ping(): Promise<boolean> {
        try {
            const response = await this.client.get<string>(
                FeedBabyClient.PING_ENDPOINT,
                {params: FeedBabyClient.getBaseParameters()}
            );
            if (response.data === "success") {
                return true;
            }
        } catch (error) {
            console.error("Ping failed", {error});
        }
        return false;
    }

    // TODO Should this actually be named 'dateOfLastSync'
    // TODO Check if this is date of sync
    // TODO What does the app do if the passphrase contains invalid URL characters like question mark
    public async checkVersion(syncAuth: SyncAuth): Promise<Version> {
        if (!syncAuth.passphrase) {
            throw new Error("Authentication passphrase must be defined");
        }

        const params = {
            ...FeedBabyClient.getBaseParameters(),
            ...FeedBabyClient.createAuthParameters(syncAuth),
            "handle_unsaved_changes": "PREFER_SERVER_DATA",
            "sync_version": 17
        };

        const response = await this.client.get<number>(
            FeedBabyClient.CHECK_VERSION_ENDPOINT,
            {params}
        );

        return {
            version: `${response.data}`,
            date: new Date(response.data)
        }
    }

    public async registerDevice(syncAuth: SyncAuth, device: Device, deviceToken: string): Promise<string> {
        if (!syncAuth.passphrase) {
            throw new Error("Authentication passphrase must be defined");
        }

        const params = {
            ...FeedBabyClient.getBaseParameters(),
            ...FeedBabyClient.createAuthParameters(syncAuth),
            "handle_unsaved_changes": "PREFER_SERVER_DATA",
            "sync_version": 17,
            deviceToken,
            "sync_device_id": device.id
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
    public async merge(syncAuth: SyncAuth, device: Device, zip?: Buffer): Promise<AppDataZip> {
        if (!syncAuth.passphrase) {
            throw new Error("Authentication passphrase must be defined");
        }

        if (!zip) {
            zip = this.createZipFromAppFirstStart();
        }

        const responseZip = await this.mergeZip(syncAuth, device, zip);
        return this.appDataReader.read(responseZip);
    }

    private async mergeZip(syncAuth: SyncAuth, device: Device, zip: Buffer): Promise<Buffer> {
        const params = {
            ...FeedBabyClient.getBaseParameters(),
            ...FeedBabyClient.createAuthParameters(syncAuth),
            "handle_unsaved_changes": "PREFER_SERVER_DATA",
            "sync_version": 17,
            "lastSyncFinishedStatus": "FINISHED",
            "sync_device_id": device.id
        };

        const form = new FormData();
        form.append("newZip", zip, {
            contentType: "application/zip",
            filename: 'newZip'
        });

        const formHeaders = form.getHeaders();

        const response = await this.client.post<Buffer>(FeedBabyClient.MERGE_ENDPOINT, form, {
            responseType: 'arraybuffer',
            params,
            headers: {
                ...formHeaders,
                "Accept-Encoding": "gzip",
            },
        });

        return response.data
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
