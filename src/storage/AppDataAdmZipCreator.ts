import AdmZip from "adm-zip";
import {AppDataZipCreator} from "../client/FeedBabyClient";
import {AppData} from "../client/AppData";
import {BabyDateOfBirth} from "../client/models/BabyDateOfBirth";
import {BabyImage} from "../client/models/BabyImage";
import {ExcretionNotificationTrigger} from "../client/models/ExcretionNotificationTrigger";
import {MedicationRecordsTimeOfDayNotificationTrigger} from "../client/models/MedicationRecordsTimeOfDayNotificationTrigger";
import {MedicationRecordsNotificationTrigger} from "../client/models/MedicationRecordsNotificationTrigger";
import {GeneralNotesTimeOfDayNotificationTrigger} from "../client/models/GeneralNotesTimeOfDayNotificationTrigger";
import {GeneralNotesNotificationTrigger} from "../client/models/GeneralNotesNotificationTrigger";
import {FeedingTimeOfDayNotificationTrigger} from "../client/models/FeedingTimeOfDayNotificationTrigger";
import {FeedingNotificationTrigger} from "../client/models/FeedingNotificationTrigger";
import {ExcretionTimeOfDayNotificationTrigger} from "../client/models/ExcretionTimeOfDayNotificationTrigger";
import {MedicineRecord} from "../client/models/MedicineRecord";
import {SleepingsTimeOfDayNotificationTrigger} from "../client/models/SleepingsTimeOfDayNotificationTrigger";
import {Growth} from "../client/models/Growth";
import {Pause} from "../client/models/Pause";
import {Medicine} from "../client/models/Medicine";
import {Excretion} from "../client/models/Excretion";
import {Feed} from "../client/models/Feed";
import {JournalEntry} from "../client/models/JournalEntry";
import {Vaccination} from "../client/models/Vaccination";
import {Temperature} from "../client/models/Temperature";
import {Teeth} from "../client/models/Teeth";
import {SleepingNotificationTrigger} from "../client/models/SleepingNotificationTrigger";
import {Sleep} from "../client/models/Sleep";
import {PumpingTimeOfDayNotificationTrigger} from "../client/models/PumpingTimeOfDayNotificationTrigger";
import {PumpingNotificationTrigger} from "../client/models/PumpingNotificationTrigger";
import {Pumping} from "../client/models/Pumping";
import {Baby} from "../client/models/Baby";
import {SaveableFile} from "./CsvFile";

export class AppDataAdmZipCreator implements AppDataZipCreator {

    public constructor(
        private readonly babyFile: SaveableFile<Baby[]>,
        private readonly babyDateOfBirthFile: SaveableFile<BabyDateOfBirth[]>,
        private readonly babyImageFile: SaveableFile<BabyImage[]>,
        private readonly excretionNotificationTriggerFile: SaveableFile<ExcretionNotificationTrigger[]>,
        private readonly pumpingFile: SaveableFile<Pumping[]>,
        private readonly pumpingNotificationTriggerFile: SaveableFile<PumpingNotificationTrigger[]>,
        private readonly pumpingTimeOfDayNotificationTriggerFile: SaveableFile<PumpingTimeOfDayNotificationTrigger[]>,
        private readonly sleepFile: SaveableFile<Sleep[]>,
        private readonly sleepingNotificationTriggerFile: SaveableFile<SleepingNotificationTrigger[]>,
        private readonly teethFile: SaveableFile<Teeth[]>,
        private readonly temperatureFile: SaveableFile<Temperature[]>,
        private readonly vaccinationFile: SaveableFile<Vaccination[]>,
        private readonly journalEntryFile: SaveableFile<JournalEntry[]>,
        private readonly feedFile: SaveableFile<Feed[]>,
        private readonly excretionFile: SaveableFile<Excretion[]>,
        private readonly medicineFile: SaveableFile<Medicine[]>,
        private readonly pausesFile: SaveableFile<Pause[]>,
        private readonly growthFile: SaveableFile<Growth[]>,
        private readonly sleepingsTimeOfDayNotificationTriggerFile: SaveableFile<SleepingsTimeOfDayNotificationTrigger[]>,
        private readonly medicineRecordFile: SaveableFile<MedicineRecord[]>,
        private readonly excretionTimeOfDayNotificationTriggerFile: SaveableFile<ExcretionTimeOfDayNotificationTrigger[]>,
        private readonly feedingNotificationTriggerFile: SaveableFile<FeedingNotificationTrigger[]>,
        private readonly feedingTimeOfDayNotificationTriggerFile: SaveableFile<FeedingTimeOfDayNotificationTrigger[]>,
        private readonly generalNotesNotificationTriggerFile: SaveableFile<GeneralNotesNotificationTrigger[]>,
        private readonly generalNotesTimeOfDayNotificationTriggerFile: SaveableFile<GeneralNotesTimeOfDayNotificationTrigger[]>,
        private readonly medicationRecordsNotificationTriggerFile: SaveableFile<MedicationRecordsNotificationTrigger[]>,
        private readonly medicationRecordsTimeOfDayNotificationTriggerFile: SaveableFile<MedicationRecordsTimeOfDayNotificationTrigger[]>,
        private readonly syncDeviceIdFile: SaveableFile<void>,
        private readonly babyImageBinary: SaveableFile<void>,
    ) {
    }

    public create(appData: AppData): Buffer {
        const zip = new AdmZip();

        AppDataAdmZipCreator.addFile(zip, this.babyFile, appData.babies || []);
        AppDataAdmZipCreator.addFile(zip, this.babyDateOfBirthFile, appData.babyDateOfBirth || []);
        AppDataAdmZipCreator.addFile(zip, this.babyImageFile, appData.babyImages || []);
        AppDataAdmZipCreator.addFile(zip, this.excretionNotificationTriggerFile, appData.excretionNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.pumpingFile, appData.pumpings || []);
        AppDataAdmZipCreator.addFile(zip, this.pumpingNotificationTriggerFile, appData.pumpingNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.pumpingTimeOfDayNotificationTriggerFile, appData.pumpingTimeOfDayNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.sleepFile, appData.sleeps || []);
        AppDataAdmZipCreator.addFile(zip, this.sleepingNotificationTriggerFile, appData.sleepingNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.teethFile, appData.teeths || []);
        AppDataAdmZipCreator.addFile(zip, this.temperatureFile, appData.temperatures || []);
        AppDataAdmZipCreator.addFile(zip, this.vaccinationFile, appData.vaccinations || []);
        AppDataAdmZipCreator.addFile(zip, this.journalEntryFile, appData.journalEntries || []);
        AppDataAdmZipCreator.addFile(zip, this.feedFile, appData.feeds || []);
        AppDataAdmZipCreator.addFile(zip, this.excretionFile, appData.excretions || []);
        AppDataAdmZipCreator.addFile(zip, this.medicineFile, appData.medicines || []);
        AppDataAdmZipCreator.addFile(zip, this.pausesFile, appData.pauses || []);
        AppDataAdmZipCreator.addFile(zip, this.growthFile, appData.growths || []);
        AppDataAdmZipCreator.addFile(zip, this.sleepingsTimeOfDayNotificationTriggerFile, appData.sleepingsTimeOfDayNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.medicineRecordFile, appData.medicineRecords || []);
        AppDataAdmZipCreator.addFile(zip, this.excretionTimeOfDayNotificationTriggerFile, appData.excretionTimeOfDayNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.feedingNotificationTriggerFile, appData.feedingNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.feedingTimeOfDayNotificationTriggerFile, appData.feedingTimeOfDayNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.generalNotesNotificationTriggerFile, appData.generalNotesNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.generalNotesTimeOfDayNotificationTriggerFile, appData.generalNotesTimeOfDayNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.medicationRecordsNotificationTriggerFile, appData.medicationRecordsNotificationTriggers || []);
        AppDataAdmZipCreator.addFile(zip, this.medicationRecordsTimeOfDayNotificationTriggerFile, appData.medicationRecordsTimeOfDayNotificationTriggers || []);
        zip.addFile(this.syncDeviceIdFile.getFilename(), Buffer.from(this.syncDeviceIdFile.save()));
        zip.addFile(this.babyImageBinary.getFilename(), Buffer.from(this.babyImageBinary.save()));

        return zip.toBuffer();
    }

    private static addFile<T>(zip: AdmZip, file: SaveableFile<T[]>, data: T[]): void {
        zip.addFile(file.getFilename(), Buffer.from(file.save(data)));
    }
}
