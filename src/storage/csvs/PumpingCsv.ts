import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Pumping} from "../../client/models/Pumping";

export class PumpingCsv extends CsvFile<Pumping> {
    private static readonly HEADERS: Array<keyof Pumping> = [
        "id",
        "Pumping Time",
        "Side",
        "Quantity",
        "Unit",
        "Notes",
        "Bottle Feed Id",
        "Finished Time",
        "Uses Timer",
        "Duration"
    ];

    public static create(): PumpingCsv {
        return new PumpingCsv(new Parser<Pumping>(CsvFile.createOptions(PumpingCsv.HEADERS)));
    }

    public getFilename(): string {
        return "pumpings.csv";
    }
}
