import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {SleepingsTimeOfDayNotificationTrigger} from "../../models/SleepingsTimeOfDayNotificationTrigger";

export class SleepingsTimeOfDayNotificationTriggerCsv extends CsvFile<SleepingsTimeOfDayNotificationTrigger> {
    private static readonly HEADERS: Array<keyof SleepingsTimeOfDayNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "start_time_hour",
        "start_time_minute"
    ];

    public static create(): SleepingsTimeOfDayNotificationTriggerCsv {
        return new SleepingsTimeOfDayNotificationTriggerCsv(
            new Parser<SleepingsTimeOfDayNotificationTrigger>(
                CsvFile.createOptions(SleepingsTimeOfDayNotificationTriggerCsv.HEADERS)
            )
        );
    }

    public getFilename(): string {
        return "sleepings_time_of_day_notification_triggers.csv";
    }
}
