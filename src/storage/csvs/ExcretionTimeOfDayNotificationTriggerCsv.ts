import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {ExcretionTimeOfDayNotificationTrigger} from "../../client/models/ExcretionTimeOfDayNotificationTrigger";

export class ExcretionTimeOfDayNotificationTriggerCsv extends CsvFile<ExcretionTimeOfDayNotificationTrigger> {
    private static readonly HEADERS: Array<keyof ExcretionTimeOfDayNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "start_time_hour",
        "start_time_minute",
        "type",
    ];

    public static create(): ExcretionTimeOfDayNotificationTriggerCsv {
        return new ExcretionTimeOfDayNotificationTriggerCsv(
            new Parser<ExcretionTimeOfDayNotificationTrigger>(
                CsvFile.createOptions(ExcretionTimeOfDayNotificationTriggerCsv.HEADERS)
            )
        )
    }

    public getFilename(): string {
        return "excretion_time_of_day_notification_triggers.csv";
    }
}
