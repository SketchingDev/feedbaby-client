import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {PumpingNotificationTrigger} from "../../models/PumpingNotificationTrigger";

export class PumpingNotificationTriggerCsv extends CsvFile<PumpingNotificationTrigger> {
    private static readonly HEADERS: Array<keyof PumpingNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "pumping_side",
        "notification_duration_in_milliseconds",
    ];

    public static create(): PumpingNotificationTriggerCsv {
        return new PumpingNotificationTriggerCsv(
            new Parser<PumpingNotificationTrigger>(CsvFile.createOptions(PumpingNotificationTriggerCsv.HEADERS))
        );
    }

    public getFilename(): string {
        return "pumping_notification_triggers.csv";
    }
}
