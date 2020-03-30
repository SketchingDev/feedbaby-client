import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Baby} from "../../client/models/Baby";

export class BabyCsv extends CsvFile<Baby> {
    private static readonly HEADERS: Array<keyof Baby> = [
        "id",
        "name",
        "birthDate",
        "babyType",
        "gender",
    ];

    public static create(): BabyCsv {
        return new BabyCsv(new Parser<Baby>(CsvFile.createOptions(BabyCsv.HEADERS)));
    }

    public getFilename(): string {
        return "babies.csv";
    }
}
