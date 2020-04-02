import {Device} from "../FeedBabyClient";

export class DeviceParameters {

    public validate(device: Device): void {
        if (!device || !device.id) {
            throw new Error("Device ID must be provided");
        }
    }

    public create(device: Device): { [key: string]: string } {
        this.validate(device);

        return {"sync_device_id": device.id}
    }
}
