export default interface BackgroundJob {
    handler(data: Record<string, any>): void;
}