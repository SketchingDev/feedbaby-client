export interface FeedingNotificationTrigger {
    id: string;
    type: "FEEDING_TIME";
    notification_duration_in_milliseconds: string;
    active: string;
    repeatingAlarm: string;
}

