import {Parser} from "json2csv";
import csv from "csvtojson";
import {json2csv} from "json2csv/JSON2CSVBase";

interface File {
    getFilename(): string;
}

export interface SaveableFile<T> extends File {
    save(data: T): Buffer;
}

export interface ReadableFile<T> extends File {
    read(data: Buffer): Promise<T>;
}

export abstract class CsvFile<T> implements SaveableFile<T[]>, ReadableFile<T[]> {
    private static readonly CRLF = '\r\n';
    private static readonly DELIMITER = ',';

    public constructor(private readonly parser: Parser<T>) {
    }

    public abstract getFilename(): string;

    protected static createOptions<T>(headers: string[]): json2csv.Options<T> {
        return {fields: headers, quote: '', eol: CsvFile.CRLF}
    }

    private static spaceHeaders(csv: string): string {
        let indexOfNewline = csv.indexOf(CsvFile.CRLF);
        if (indexOfNewline > 0) {
            indexOfNewline += CsvFile.CRLF.length;
        } else {
            indexOfNewline = csv.length;
        }

        const header = csv.slice(0, indexOfNewline);
        const data = csv.slice(indexOfNewline);

        return header.split(CsvFile.DELIMITER).join(`${CsvFile.DELIMITER} `) + data
    }

    private static addTrailingNewline(csv: string): string {
        return `${csv}${CsvFile.CRLF}`
    }

    public save(data: T[]): Buffer {
        const csv = this.parser.parse(data);
        const preparedCsv = CsvFile.addTrailingNewline(CsvFile.spaceHeaders(csv));

        return Buffer.from(preparedCsv);
    }

    public async read(data: Buffer): Promise<T[]> {
        return await csv().fromString(data.toString('utf8')) as T[];
    }
}
