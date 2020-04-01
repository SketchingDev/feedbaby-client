import {Authentication} from "../FeedBabyClient";

export class AuthParameters {
    private static validPassphrase(passphrase: string): boolean {
        return /^[a-z0-9]+$/i.test(passphrase)
    }

    public create(auth: Authentication): { [key: string]: string } {
        if (!AuthParameters.validPassphrase(auth.passphrase)) {
            throw new Error('Passphrase can only contain letters and numbers');
        }

        const pad = (value: number): string => ('0' + value).slice(-2);
        const paddedMonth = (date: Date): string => pad(date.getMonth() + 1);
        const paddedDay = (date: Date): string => pad(date.getDate());

        return {
            "passphrase": auth.passphrase,
            "dob_year": `${auth.dateOfBirth.getFullYear()}`,
            "dob_month": paddedMonth(auth.dateOfBirth),
            "dob_day": paddedDay(auth.dateOfBirth),
        }
    }
}
