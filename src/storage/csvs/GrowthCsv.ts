import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Growth} from "../../models/Growth";

export class GrowthCsv extends CsvFile<Growth> {
    private static readonly HEADERS: Array<keyof Growth> = [
        "id",
        "Day",
        "Weight",
        "Weight Unit",
        "Height",
        "Head",
        "Length Unit",
        "Notes"
    ];

    public static create(): GrowthCsv {
        return new GrowthCsv(new Parser<Growth>(CsvFile.createOptions(GrowthCsv.HEADERS)));
    }

    public getFilename(): string {
        return "growths.csv";
    }
}
