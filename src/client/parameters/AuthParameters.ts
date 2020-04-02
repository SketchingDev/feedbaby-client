import {Authentication} from "../FeedBabyClient";

export class AuthParameters {
    private static validPassphrase(passphrase: string): boolean {
        return /^[a-z0-9]+$/i.test(passphrase)
    }

    public validate(auth: Authentication): void {
        if (!AuthParameters.validPassphrase(auth.passphrase)) {
            throw new Error('Passphrase can only contain letters and numbers');
        }
    }

    public create(auth: Authentication): { [key: string]: string } {
        this.validate(auth);

        return {
            "passphrase": auth.passphrase,
            "dob_year": `${auth.dateOfBirth.getFullYear()}`,
            "dob_month": AuthParameters.paddedMonth(auth.dateOfBirth),
            "dob_day": AuthParameters.paddedDay(auth.dateOfBirth),
        }
    }

    private static pad(value: number): string {
        return ('0' + value).slice(-2);
    }

    private static paddedMonth(date: Date): string {
        return AuthParameters.pad(date.getMonth() + 1);
    }

    private static paddedDay(date: Date): string {
        return AuthParameters.pad(date.getDate());
    }
}
