export function getFormattedDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function getDateMinusDays(date: Date, days: number) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
