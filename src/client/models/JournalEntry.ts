export interface JournalEntry {
    Id: string;
    "Start Time": string;
    "End Time": string;
    Category: "DIARY";
    "Sub Category": string;
    Notes: string; // TODO What encoding is this? Only managed 15 mins on one breast<<<COMMA>>> no
    "Uses Timer": "0" | "1";
}

