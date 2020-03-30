export interface PumpingNotificationTrigger {
    id: string;
    repeatingAlarm: string;
    pumping_side: "LEFT" | "RIGHT" | "LEFT_OR_RIGHT";
    notification_duration_in_milliseconds: string;
}

