import {BabyImageBinary} from "../../storage/csvs/image/BabyImageBinary";
import {AppDataAdmZipCreator} from "../../storage/AppDataAdmZipCreator";
import {BabyCsv} from "../../storage/csvs/BabyCsv";
import {BabyDateOfBirthCsv} from "../../storage/csvs/BabyDateOfBirthCsv";
import {BabyImageCsv} from "../../storage/csvs/BabyImageCsv";
import {ExcretionCsv} from "../../storage/csvs/ExcretionCsv";
import {ExcretionNotificationTriggerCsv} from "../../storage/csvs/ExcretionNotificationTriggerCsv";
import {ExcretionTimeOfDayNotificationTriggerCsv} from "../../storage/csvs/ExcretionTimeOfDayNotificationTriggerCsv";
import {FeedCsv} from "../../storage/csvs/FeedCsv";
import {FeedingNotificationTriggerCsv} from "../../storage/csvs/FeedingNotificationTriggerCsv";
import {FeedingTimeOfDayNotificationTriggerCsv} from "../../storage/csvs/FeedingTimeOfDayNotificationTriggerCsv";
import {GeneralNotesNotificationTriggerCsv} from "../../storage/csvs/GeneralNotesNotificationTriggerCsv";
import {GeneralNotesTimeOfDayNotificationTriggerCsv} from "../../storage/csvs/GeneralNotesTimeOfDayNotificationTriggerCsv";
import {GrowthCsv} from "../../storage/csvs/GrowthCsv";
import {JournalEntryCsv} from "../../storage/csvs/JournalEntryCsv";
import {MedicationRecordsNotificationTriggerCsv} from "../../storage/csvs/MedicationRecordsNotificationTriggerCsv";
import {MedicationRecordsTimeOfDayNotificationTriggerCsv} from "../../storage/csvs/MedicationRecordsTimeOfDayNotificationTriggerCsv";
import {MedicineCsv} from "../../storage/csvs/MedicineCsv";
import {MedicineRecordCsv} from "../../storage/csvs/MedicineRecordCsv";
import {PauseCsv} from "../../storage/csvs/PauseCsv";
import {PumpingCsv} from "../../storage/csvs/PumpingCsv";
import {PumpingNotificationTriggerCsv} from "../../storage/csvs/PumpingNotificationTriggerCsv";
import {PumpingTimeOfDayNotificationTriggerCsv} from "../../storage/csvs/PumpingTimeOfDayNotificationTriggerCsv";
import {SleepCsv} from "../../storage/csvs/SleepCsv";
import {SleepingNotificationTriggerCsv} from "../../storage/csvs/SleepingNotificationTriggerCsv";
import {SleepingsTimeOfDayNotificationTriggerCsv} from "../../storage/csvs/SleepingsTimeOfDayNotificationTriggerCsv";
import {SyncDeviceIdCsv} from "../../storage/csvs/SyncDeviceIdCsv";
import {TeethCsv} from "../../storage/csvs/TeethCsv";
import {TemperatureCsv} from "../../storage/csvs/TemperatureCsv";
import {VaccinationCsv} from "../../storage/csvs/VaccinationCsv";

export const defaultAppDataZipCreator = (): AppDataAdmZipCreator => new AppDataAdmZipCreator(
    BabyCsv.create(),
    BabyDateOfBirthCsv.create(),
    BabyImageCsv.create(),
    ExcretionNotificationTriggerCsv.create(),
    PumpingCsv.create(),
    PumpingNotificationTriggerCsv.create(),
    PumpingTimeOfDayNotificationTriggerCsv.create(),
    SleepCsv.create(),
    SleepingNotificationTriggerCsv.create(),
    TeethCsv.create(),
    TemperatureCsv.create(),
    VaccinationCsv.create(),
    JournalEntryCsv.create(),
    FeedCsv.create(),
    ExcretionCsv.create(),
    MedicineCsv.create(),
    PauseCsv.create(),
    GrowthCsv.create(),
    SleepingsTimeOfDayNotificationTriggerCsv.create(),
    MedicineRecordCsv.create(),
    ExcretionTimeOfDayNotificationTriggerCsv.create(),
    FeedingNotificationTriggerCsv.create(),
    FeedingTimeOfDayNotificationTriggerCsv.create(),
    GeneralNotesNotificationTriggerCsv.create(),
    GeneralNotesTimeOfDayNotificationTriggerCsv.create(),
    MedicationRecordsNotificationTriggerCsv.create(),
    MedicationRecordsTimeOfDayNotificationTriggerCsv.create(),
    new SyncDeviceIdCsv(),
    new BabyImageBinary(),
);
