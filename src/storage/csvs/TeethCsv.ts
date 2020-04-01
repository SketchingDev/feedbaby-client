import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Teeth} from "../../models/Teeth";

export class TeethCsv extends CsvFile<Teeth> {
    private static readonly HEADERS: Array<keyof Teeth> = [
        "Id",
        "Recorded Time",
        "Tooth",
        "Notes",
    ];

    public static create(): TeethCsv {
        return new TeethCsv(new Parser<Teeth>(CsvFile.createOptions(TeethCsv.HEADERS)))
    }

    public getFilename(): string {
        return "teeths.csv";
    }
}
