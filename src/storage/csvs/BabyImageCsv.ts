import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {BabyImage} from "../../client/models/BabyImage";

export class BabyImageCsv extends CsvFile<BabyImage> {
    private static readonly HEADERS: Array<keyof BabyImage> = [
        "id",
        "type",
        "image (empty...see the filename baby_images_[id])",
        "babyId"
    ];

    public static create(): BabyImageCsv {
        return new BabyImageCsv(new Parser<BabyImage>(CsvFile.createOptions(BabyImageCsv.HEADERS)));
    }

    public getFilename(): string {
        return "baby_images.csv";
    }
}
