import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Excretion} from "../../client/models/Excretion";

export class ExcretionCsv extends CsvFile<Excretion> {
    private static readonly HEADERS: Array<keyof Excretion> = [
        "id",
        "Time",
        "Type",
        "Notes"
    ];

    public static create(): ExcretionCsv {
        // const parserOptions = {fields: BabyDateOfBirthCsv.HEADERS, ...CsvFile.COMMON_PARSER_CONFIG};
        return new ExcretionCsv(new Parser<Excretion>(CsvFile.createOptions(ExcretionCsv.HEADERS)));
    }

    public getFilename(): string {
        return "excretions.csv";
    }
}
