export interface Audit {
    dateTime: Date,
    host: string,
    event: string,
    description: string,
    result: string
}