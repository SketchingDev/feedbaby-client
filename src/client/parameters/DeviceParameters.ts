import {Device} from "../FeedBabyClient";

export class DeviceParameters {
    public create(device: Device): { [key: string]: string } {
        if (!device || !device.id) {
            throw new Error("Device ID must be provided");
        }

        return {"sync_device_id": device.id}
    }
}
