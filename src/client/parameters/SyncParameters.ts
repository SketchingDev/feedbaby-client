export class SyncParameters {
    public create(): { [key: string]: string | number } {
        return {
            "handle_unsaved_changes": "PREFER_SERVER_DATA",
            "sync_version": 17
        }
    }
}
