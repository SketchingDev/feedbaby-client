import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {SleepingNotificationTrigger} from "../../client/models/SleepingNotificationTrigger";

export class SleepingNotificationTriggerCsv extends CsvFile<SleepingNotificationTrigger> {
    private static readonly HEADERS: Array<keyof SleepingNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "notification_duration_in_milliseconds",
    ];

    public static create(): SleepingNotificationTriggerCsv {
        return new SleepingNotificationTriggerCsv(new Parser<SleepingNotificationTrigger>(
            CsvFile.createOptions(SleepingNotificationTriggerCsv.HEADERS)
        ));
    }

    public getFilename(): string {
        return "sleeping_notification_triggers.csv";
    }
}
