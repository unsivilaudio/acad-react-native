export function genUUID(): string {
    return Math.round(Math.random() * 1e10).toString(16);
}
