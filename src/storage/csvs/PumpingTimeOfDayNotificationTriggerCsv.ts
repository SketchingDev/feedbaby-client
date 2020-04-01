import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {PumpingTimeOfDayNotificationTrigger} from "../../models/PumpingTimeOfDayNotificationTrigger";

export class PumpingTimeOfDayNotificationTriggerCsv extends CsvFile<PumpingTimeOfDayNotificationTrigger> {
    private static readonly HEADERS: Array<keyof PumpingTimeOfDayNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "start_time_hour",
        "start_time_minute",
        "type",
    ];

    public static create(): PumpingTimeOfDayNotificationTriggerCsv {
        return new PumpingTimeOfDayNotificationTriggerCsv(
            new Parser<PumpingTimeOfDayNotificationTrigger>(
                CsvFile.createOptions(PumpingTimeOfDayNotificationTriggerCsv.HEADERS)
            )
        );
    }

    public getFilename(): string {
        return "pumpings_time_of_day_notification_triggers.csv";
    }
}
