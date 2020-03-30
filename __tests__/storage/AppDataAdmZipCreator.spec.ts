import {readdirSync, readFileSync} from "fs";
import * as path from "path";
import {defaultAppDataZipCreator} from "../../src/client/defaults/defaultAppDataZipCreator";
import {AppDataAdmZipCreator} from "../../src/storage/AppDataAdmZipCreator";
import AdmZip = require("adm-zip");

describe("ZIP Creation", () => {
    const filesToIgnore = [".ds_store", "thumbs.db"];

    const initialAppStatueTestData = path.join(__dirname, 'test-data/initial-app-state/');
    let zipCreator: AppDataAdmZipCreator;

    beforeEach(() => {
        zipCreator = defaultAppDataZipCreator();
    });

    it("should create ZIP with same contents as real first-sync ZIP", () => {
        const actualZip = zipCreator.create({
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
            excretionNotificationTriggers: [{
                "id": "1",
                "repeatingAlarm": "0",
                "excretion_type": "PEE",
                "notification_duration_in_milliseconds": "10800000"

            },
                {
                    "id": "2",
                    "repeatingAlarm": "0",
                    "excretion_type": "POO",
                    "notification_duration_in_milliseconds": "10800000"

                }
            ],
            medicines: [
                {
                    "id": "1",
                    "Medicine Name": "Panadol",
                    "Color Code": "#ffff9933",
                    "Default Quantity": "0",
                    "Default Measurement Type": "IMPERIAL",
                    "Image Name": "PANADOL_1"
                }
            ],
            pumpingNotificationTriggers: [
                {
                    "id": "1",
                    "pumping_side": "LEFT",
                    "repeatingAlarm": "0",
                    "notification_duration_in_milliseconds": "10800000"
                },
                {
                    "id": "2",
                    "pumping_side": "RIGHT",
                    "repeatingAlarm": "0",
                    "notification_duration_in_milliseconds": "10800000"
                },
                {
                    "id": "3",
                    "pumping_side": "LEFT_OR_RIGHT",
                    "repeatingAlarm": "1",
                    "notification_duration_in_milliseconds": "10830000"
                },
            ],
            feedingNotificationTriggers: [
                {
                    "id": "1",
                    "type": "FEEDING_TIME",
                    "notification_duration_in_milliseconds": "7230000",
                    "active": "1",
                    "repeatingAlarm": "0"
                }
            ],
        });

        const zip = new AdmZip(actualZip);
        const testFiles = readdirSync(initialAppStatueTestData).filter(f => !filesToIgnore.includes(f.toLowerCase()));
        for (const testFile of testFiles) {
            console.log(testFile);

            const createdFile = zip.getEntries().find(f => f.entryName === testFile);
            expect(createdFile).toBeDefined();

            if (createdFile) {
                const testFileContents = readFileSync(path.join(initialAppStatueTestData, testFile));
                expect(createdFile.getData().toString('utf8')).toBe(testFileContents.toString('utf8'));
            }
        }
    })
});
