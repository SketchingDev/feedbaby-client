import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Pause} from "../../models/Pause";

export class PauseCsv extends CsvFile<Pause> {
    private static readonly HEADERS: Array<keyof Pause> = [
        "id",
        "Start Time",
        "End Time",
        "Feeding History ID"
    ];

    public static create(): PauseCsv {
        return new PauseCsv(new Parser<Pause>(CsvFile.createOptions(PauseCsv.HEADERS)))
    }

    public getFilename(): string {
        return "pauses.csv";
    }
}
