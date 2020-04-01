import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {FeedingNotificationTrigger} from "../../models/FeedingNotificationTrigger";

export class FeedingNotificationTriggerCsv extends CsvFile<FeedingNotificationTrigger> {
    private static readonly HEADERS: Array<keyof FeedingNotificationTrigger> = [
        "id",
        "type",
        "notification_duration_in_milliseconds",
        "active",
        "repeatingAlarm"
    ];

    public static create(): FeedingNotificationTriggerCsv {
        return new FeedingNotificationTriggerCsv(
            new Parser<FeedingNotificationTrigger>(
                CsvFile.createOptions(FeedingNotificationTriggerCsv.HEADERS)
            )
        )
    }

    public getFilename(): string {
        return "feeding_notification_triggers.csv";
    }
}
