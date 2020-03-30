import AdmZip from "adm-zip";
import {AppDataZipCreator} from "../client/FeedBabyClient";
import {AppData} from "../client/AppData";
import {SaveableFile} from "./CsvFile";

type Saver = (zip: AdmZip, appData: AppData) => void;

export class AppDataAdmZipCreator implements AppDataZipCreator {

    private savers: Saver[] = [];

    public addFileSaver<T>(file: SaveableFile<T>, dataExtractor: (appData: AppData) => T): void {
        this.savers.push(
            (zip: AdmZip, appData: AppData) => zip.addFile(file.getFilename(), file.save(dataExtractor(appData)))
        );
    }

    public create(appData: AppData): Buffer {
        const zip = new AdmZip();
        this.savers.forEach(s => s(zip, appData));

        return zip.toBuffer();
    }
}
