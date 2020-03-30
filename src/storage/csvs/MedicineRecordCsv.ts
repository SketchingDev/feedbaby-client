import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {MedicineRecord} from "../../client/models/MedicineRecord";

export class MedicineRecordCsv extends CsvFile<MedicineRecord> {
    private static readonly HEADERS: Array<keyof MedicineRecord> = [
        "Id",
        "Medicine Id",
        "Medicine",
        "Time",
        "Quantity",
        "Unit",
        "Notes",
    ];

    public static create(): MedicineRecordCsv {
        return new MedicineRecordCsv(new Parser<MedicineRecord>(CsvFile.createOptions(MedicineRecordCsv.HEADERS)))
    }

    public getFilename(): string {
        return "medicine_records.csv";
    }
}
