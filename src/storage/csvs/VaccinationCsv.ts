import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Vaccination} from "../../client/models/Vaccination";

export class VaccinationCsv extends CsvFile<Vaccination> {
    private static readonly HEADERS: Array<keyof Vaccination> = [
        "id",
        "Time",
        "Vaccine Name",
        "Status",
        "Completed",
        "Notes",
    ];

    public static create(): VaccinationCsv {
        return new VaccinationCsv(new Parser<Vaccination>(CsvFile.createOptions(VaccinationCsv.HEADERS)));
    }

    public getFilename(): string {
        return "vaccinations.csv";
    }
}
