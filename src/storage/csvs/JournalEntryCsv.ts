import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {JournalEntry} from "../../client/models/JournalEntry";

export class JournalEntryCsv extends CsvFile<JournalEntry> {
    private static readonly HEADERS: Array<keyof JournalEntry> = [
        "Id",
        "Start Time",
        "End Time",
        "Category",
        "Sub Category",
        "Notes",
        "Uses Timer"
    ];

    public static create(): JournalEntryCsv {
        return new JournalEntryCsv(new Parser<JournalEntry>(CsvFile.createOptions(JournalEntryCsv.HEADERS)))
    }

    public getFilename(): string {
        return "journal_entries.csv";
    }
}
