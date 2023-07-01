export function getToday(): Date {
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    return today
}

export function isSameDate(date1: Date, date2: Date): boolean {
    return date1.getTime() === date2.getTime()
}