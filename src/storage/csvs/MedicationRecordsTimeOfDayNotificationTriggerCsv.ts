import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {MedicationRecordsTimeOfDayNotificationTrigger} from "../../client/models/MedicationRecordsTimeOfDayNotificationTrigger";

export class MedicationRecordsTimeOfDayNotificationTriggerCsv extends CsvFile<MedicationRecordsTimeOfDayNotificationTrigger> {
    private static readonly HEADERS: Array<keyof MedicationRecordsTimeOfDayNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "start_time_hour",
        "start_time_minute",
        "medicineId",
    ];

    public static create(): MedicationRecordsTimeOfDayNotificationTriggerCsv {
        return new MedicationRecordsTimeOfDayNotificationTriggerCsv(
            new Parser<MedicationRecordsTimeOfDayNotificationTrigger>(
                CsvFile.createOptions(MedicationRecordsTimeOfDayNotificationTriggerCsv.HEADERS)
            )
        )
    }

    public getFilename(): string {
        return "medication_records_time_of_day_notification_triggers.csv";
    }
}
