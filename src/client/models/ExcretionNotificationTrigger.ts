export interface ExcretionNotificationTrigger {
    id: string;
    repeatingAlarm: string;
    excretion_type: "PEE" | "POO";
    notification_duration_in_milliseconds: string;
}

