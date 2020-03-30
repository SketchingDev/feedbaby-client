import {SaveableFile} from "../CsvFile";

export class SyncDeviceIdCsv implements SaveableFile<void> {
    private static NO_SOURCE_DEVICE_ID = "[NOT SET]";

    public save(): Buffer {
        return Buffer.from(SyncDeviceIdCsv.NO_SOURCE_DEVICE_ID);
    }

    public getFilename(): string {
        return "sync_device_id.csv";
    }
}
