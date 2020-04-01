export class BaseParameters {
    public create(): { [key: string]: string | number } {
        return {
            product: "pro",
            serverVersionCode: 1,
            flavor: "lite"
        }
    }
}
