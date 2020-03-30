import {readFileSync} from "fs";
import path from "path";
import {SaveableFile} from "../../CsvFile";

export class BabyImageBinary implements SaveableFile<void> {

    // TODO Filename depends on whether an image is provided
    public getFilename(): string {
        return "baby_images_image_no_image";
    }

    save(): Buffer {
        return readFileSync(path.join(__dirname, "baby_images_image_no_image"))
    }
}
