import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {GeneralNotesTimeOfDayNotificationTrigger} from "../../client/models/GeneralNotesTimeOfDayNotificationTrigger";

export class GeneralNotesTimeOfDayNotificationTriggerCsv extends CsvFile<GeneralNotesTimeOfDayNotificationTrigger> {
    private static readonly HEADERS: Array<keyof GeneralNotesTimeOfDayNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "start_time_hour",
        "start_time_minute",
        "sub_category_type",
        "category_type"
    ];

    public static create(): GeneralNotesTimeOfDayNotificationTriggerCsv {
        return new GeneralNotesTimeOfDayNotificationTriggerCsv(
            new Parser<GeneralNotesTimeOfDayNotificationTrigger>(
                CsvFile.createOptions(GeneralNotesTimeOfDayNotificationTriggerCsv.HEADERS)
            )
        )
    }

    public getFilename(): string {
        return "general_notes_time_of_day_notification_triggers.csv";
    }
}
