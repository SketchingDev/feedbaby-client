import {CsvFile} from "../CsvFile";
import {Parser} from "json2csv";
import {Feed} from "../../client/models/Feed";

export class FeedCsv extends CsvFile<Feed> {
    private static readonly HEADERS: Array<keyof Feed> = [
        "id",
        "Start Time",
        "End Time",
        "Feed Type",
        "Quantity (oz)",
        "Quantity (ml or g)",
        "Notes",
        "Duration (Minutes)",
        "Food Type",
        "Unit",
        "Bottle Type",
    ];

    public static create(): FeedCsv {
        return new FeedCsv(new Parser<Feed>(CsvFile.createOptions(FeedCsv.HEADERS)));
    }

    public getFilename(): string {
        return "feeds.csv";
    }
}
