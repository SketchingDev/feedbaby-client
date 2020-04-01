import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {FeedingTimeOfDayNotificationTrigger} from "../../models/FeedingTimeOfDayNotificationTrigger";

export class FeedingTimeOfDayNotificationTriggerCsv extends CsvFile<FeedingTimeOfDayNotificationTrigger> {
    private static readonly HEADERS: Array<keyof FeedingTimeOfDayNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "start_time_hour",
        "start_time_minute",
        "feed_type"
    ];

    public static create(): FeedingTimeOfDayNotificationTriggerCsv {
        return new FeedingTimeOfDayNotificationTriggerCsv(
            new Parser<FeedingTimeOfDayNotificationTrigger>(
                CsvFile.createOptions(FeedingTimeOfDayNotificationTriggerCsv.HEADERS)
            )
        )
    }

    public getFilename(): string {
        return "feeding_time_of_day_notification_triggers.csv";
    }
}
