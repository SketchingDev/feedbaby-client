import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {BabyDateOfBirth} from "../../models/BabyDateOfBirth";

export class BabyDateOfBirthCsv extends CsvFile<BabyDateOfBirth> {
    private static readonly HEADERS: Array<keyof BabyDateOfBirth> = [
        "id",
        "day_of_the_month",
        "month_of_the_year",
        "year"
    ];

    public static create(): BabyDateOfBirthCsv {
        return new BabyDateOfBirthCsv(new Parser<BabyDateOfBirth>(CsvFile.createOptions(BabyDateOfBirthCsv.HEADERS)));
        // const parserOptions = {fields: BabyDateOfBirthCsv.HEADERS, ...CsvFile.COMMON_PARSER_CONFIG};
        // return new BabyDateOfBirthCsv(new Parser<BabyDateOfBirth>(parserOptions));
    }

    public getFilename(): string {
        return "baby_date_of_birth.csv";
    }
}
