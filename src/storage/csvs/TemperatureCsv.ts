import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Temperature} from "../../client/models/Temperature";

export class TemperatureCsv extends CsvFile<Temperature> {
    private static readonly HEADERS: Array<keyof Temperature> = [
        "id",
        "Recorded Time",
        "Temperature",
        "Unit",
        "Notes",
    ];

    public static create(): TemperatureCsv {
        return new TemperatureCsv(new Parser<Temperature>(CsvFile.createOptions(TemperatureCsv.HEADERS)))
    }

    public getFilename(): string {
        return "temperatures.csv";
    }
}
