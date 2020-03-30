import {FeedCsv} from "../../storage/csvs/FeedCsv";
import {AppDataAdmZipReader} from "../../storage/AppDataAdmZipReader";
import {GrowthCsv} from "../../storage/csvs/GrowthCsv";
import {MedicineCsv} from "../../storage/csvs/MedicineCsv";

export const defaultAppDataZipReader = (): AppDataAdmZipReader => new AppDataAdmZipReader(
    FeedCsv.create(),
    GrowthCsv.create(),
    MedicineCsv.create()
);
