import {Device, FeedBabyClient, SyncAuth} from "../../src";
import nock from "nock";
import {readFileSync} from "fs";
import * as path from "path";

describe("Client", () => {
    const pathToTestZip = path.join(__dirname, "../storage/test-data/initial-app-state.zip");
    const testHost = "http://test.test";
    const serverHeaders = {
        "Server": "Apache-Coyote/1.1",
        "Transfer-Encoding": "chunked",
        "Date": (new Date()).toUTCString()
    };

    let feedBabyClient: FeedBabyClient;

    beforeEach(() => {
        feedBabyClient = new FeedBabyClient(testHost);
    });

    test("ping returns true if server returns 'success'", async () => {
        nock(testHost)
            .get('/feedbabysync_v12/ping?product=pro&serverVersionCode=1&flavor=lite')
            .reply(200, "success", serverHeaders);

        expect(await feedBabyClient.ping()).toBe(true);
    });

    test("ping returns false if server does not return 'success'", async () => {
        const scope = nock(testHost)
            .get(uri => uri.includes("/feedbabysync_v12/ping"))
            .reply(500, "", serverHeaders);

        expect(await feedBabyClient.ping()).toBe(false);
        expect(scope.isDone()).toBe(true);
    });

    test("checkVersion encodes dates correctly", async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mockHttpClient = {get: jest.fn().mockResolvedValue({data: ""})} as any;
        const feedBabyClient = new FeedBabyClient(testHost, () => mockHttpClient);

        const dateOfBirth = new Date('2019/6/9');

        await feedBabyClient.checkVersion({passphrase: 'secret-code', dateOfBirth});
        expect(mockHttpClient.get).toHaveBeenCalledWith(expect.anything(),
            {"params": expect.objectContaining({"dob_day": "09", "dob_month": "06", "dob_year": "2019"})}
        );
    });

    test("checkVersion returns version", async () => {
        const auth: SyncAuth = {
            passphrase: 'secret-code',
            dateOfBirth: new Date('2019/6/19')
        };

        nock(testHost)
            .get(`/feedbabysync_v12/checkversion?product=pro&serverVersionCode=1&flavor=lite&passphrase=secret-code&dob_year=2019&dob_month=06&dob_day=19&handle_unsaved_changes=PREFER_SERVER_DATA&sync_version=17`)
            .reply(200, "1584119903044", serverHeaders);

        const response = await feedBabyClient.checkVersion(auth);

        expect(response).toMatchObject({version: "1584119903044"});
        expect(response.date).toStrictEqual(new Date("2020-03-13T17:18:23.044Z"))
    });

    test("Register Device Token", async () => {
        const device = new Device("test-sync-device-id");
        const deviceToken = "test-device-token";
        const auth: SyncAuth = {
            passphrase: "test-passphrase",
            dateOfBirth: new Date('2020/3/24')
        };

        nock(testHost)
            .get(`/feedbabysync_v12/registerDeviceToken?product=pro&serverVersionCode=1&flavor=lite&passphrase=test-passphrase&dob_year=2020&dob_month=03&dob_day=24&handle_unsaved_changes=PREFER_SERVER_DATA&sync_version=17&deviceToken=test-device-token&sync_device_id=test-sync-device-id`)
            .reply(200, "7\nsuccess\n0", serverHeaders);

        const response = await feedBabyClient.registerDevice(auth, device, deviceToken);
        expect(response).toStrictEqual("7\nsuccess\n0");
    });

    test("Merge", async () => {
        const device = Device.create();
        const auth: SyncAuth = {
            passphrase: 'test-passphrase',
            dateOfBirth: new Date('2020/3/25')
        };

        nock(testHost)
            .post(`/feedbabysync_v12/merge?product=pro&serverVersionCode=1&flavor=lite&passphrase=test-passphrase&dob_year=2020&dob_month=03&dob_day=25&handle_unsaved_changes=PREFER_SERVER_DATA&sync_version=17&lastSyncFinishedStatus=FINISHED&sync_device_id=${device.id}`,
                (body: string) => {
                    body = Buffer.from(body, 'hex').toString('utf8');

                    return body.includes('Content-Disposition: form-data; name="newZip"; filename="newZip"') &&
                        body.includes("Content-Type: application/zip")
                },
                {
                    reqheaders: {
                        "accept": "application/json, text/plain, */*",
                        "content-type": new RegExp("^multipart/form-data; boundary=-------"),
                        "user-agent": "okhttp/2.4.0",
                        "accept-encoding": "gzip"
                    }
                })

            .reply(200, readFileSync(pathToTestZip), serverHeaders);

        const response = await feedBabyClient.merge(auth, device);
        expect(await response.getMedicines()).toStrictEqual([
            {
                "Color Code": "#ffff9933",
                "Default Measurement Type": "IMPERIAL",
                "Default Quantity": "0",
                "Image Name": "PANADOL_1",
                "Medicine Name": "Panadol",
                "id": "1"
            }
        ]);
    });
});
