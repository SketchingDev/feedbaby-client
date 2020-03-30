import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {GeneralNotesNotificationTrigger} from "../../client/models/GeneralNotesNotificationTrigger";

export class GeneralNotesNotificationTriggerCsv extends CsvFile<GeneralNotesNotificationTrigger> {
    private static readonly HEADERS: Array<keyof GeneralNotesNotificationTrigger> = [
        "id",
        "repeatingAlarm",
        "sub_category_type",
        "category_type",
        "notification_duration_in_milliseconds"
    ];

    public static create(): GeneralNotesNotificationTriggerCsv {
        return new GeneralNotesNotificationTriggerCsv(
            new Parser<GeneralNotesNotificationTrigger>(
                CsvFile.createOptions(GeneralNotesNotificationTriggerCsv.HEADERS)
            )
        )
    }

    public getFilename(): string {
        return "general_notes_notification_triggers.csv";
    }
}
