import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {MedicationRecordsNotificationTrigger} from "../../models/MedicationRecordsNotificationTrigger";

export class MedicationRecordsNotificationTriggerCsv extends CsvFile<MedicationRecordsNotificationTrigger> {
    private static readonly HEADERS: Array<keyof MedicationRecordsNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "medicine_id",
        "notification_duration_in_milliseconds",
    ];

    public static create(): MedicationRecordsNotificationTriggerCsv {
        return new MedicationRecordsNotificationTriggerCsv(
            new Parser<MedicationRecordsNotificationTrigger>(
                CsvFile.createOptions(MedicationRecordsNotificationTriggerCsv.HEADERS)
            )
        )
    }

    public getFilename(): string {
        return "medication_records_notification_triggers.csv";
    }
}
