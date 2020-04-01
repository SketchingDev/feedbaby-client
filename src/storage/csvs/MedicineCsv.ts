import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Medicine} from "../../models/Medicine";

export class MedicineCsv extends CsvFile<Medicine> {
    private static readonly HEADERS: Array<keyof Medicine> = [
        "id",
        "Medicine Name",
        "Color Code",
        "Default Quantity",
        "Default Measurement Type",
        "Image Name",
    ];

    public static create(): MedicineCsv {
        return new MedicineCsv(new Parser<Medicine>(CsvFile.createOptions(MedicineCsv.HEADERS)))
    }

    public getFilename(): string {
        return "medicines.csv";
    }
}
