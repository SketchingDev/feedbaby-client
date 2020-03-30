import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Sleep} from "../../client/models/Sleep";

export class SleepCsv extends CsvFile<Sleep> {
    private static readonly HEADERS: Array<keyof Sleep> = [
        "id",
        "Start Time",
        "End Time",
        "Notes",
        "Approximate Duration (Minutes)"
    ];

    public static create(): SleepCsv {
        return new SleepCsv(new Parser<Sleep>(CsvFile.createOptions(SleepCsv.HEADERS)))
    }

    public getFilename(): string {
        return "sleeps.csv";
    }
}
