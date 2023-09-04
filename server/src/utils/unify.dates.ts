export const unifyDates = (date: string, hours: string[]): string[] => {
  return hours.map((hour: string) => {
    return date.concat(' ').concat(hour).concat(':00')
  })
}
