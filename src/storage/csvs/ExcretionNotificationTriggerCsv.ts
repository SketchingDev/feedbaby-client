import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {ExcretionNotificationTrigger} from "../../models/ExcretionNotificationTrigger";

export class ExcretionNotificationTriggerCsv extends CsvFile<ExcretionNotificationTrigger> {
    private static readonly HEADERS: Array<keyof ExcretionNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "excretion_type",
        "notification_duration_in_milliseconds",
    ];

    public static create(): ExcretionNotificationTriggerCsv {
        return new ExcretionNotificationTriggerCsv(
            new Parser<ExcretionNotificationTrigger>(CsvFile.createOptions(ExcretionNotificationTriggerCsv.HEADERS))
        );
    }

    public getFilename(): string {
        return "excretion_notification_triggers.csv";
    }
}
