import AdmZip from "adm-zip";
import {AppDataZip, AppDataZipReader} from "../client/FeedBabyClient";
import {Feed} from "../client/models/Feed";
import {Growth} from "../client/models/Growth";
import {Medicine} from "../client/models/Medicine";
import {ReadableFile} from "./CsvFile";

export class AppDataAdmZip implements AppDataZip {

    constructor(private readonly zip: AdmZip,
                private readonly feedFile: ReadableFile<Feed[]>,
                private readonly growthFile: ReadableFile<Growth[]>,
                private readonly medicineFile: ReadableFile<Medicine[]>) {
    }

    public async getFeeds(): Promise<Feed[]> {
        return this.read(this.feedFile);
    }

    public async getGrowths(): Promise<Growth[]> {
        return this.read(this.growthFile);
    }

    public async getMedicines(): Promise<Medicine[]> {
        return this.read(this.medicineFile);
    }

    public getBuffer(): Buffer {
        return this.zip.toBuffer();
    }

    private read<T>(csvFile: ReadableFile<T[]>): Promise<T[]> {
        const entry = this.zip.getEntry(csvFile.getFilename()); // TODO Does this throw an error if the file doesn't exist?
        return csvFile.read(entry.getData());
    }
}

export class AppDataAdmZipReader implements AppDataZipReader {

    constructor(private readonly feedFile: ReadableFile<Feed[]>,
                private readonly growthFile: ReadableFile<Growth[]>,
                private readonly medicineFile: ReadableFile<Medicine[]>) {
    }

    public read(zip: Buffer): AppDataZip {
        const admZip = new AdmZip(zip);
        AppDataAdmZipReader.checkValidZip(admZip);

        return new AppDataAdmZip(admZip, this.feedFile, this.growthFile, this.medicineFile);
    }

    private static checkValidZip(zip: AdmZip): void {
        zip.getZipComment();
    }
}
