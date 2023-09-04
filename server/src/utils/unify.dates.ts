export const unifyDates = (date: string, hours: string[]): string[] => {
  return hours.map((hour: string) => {
    return date.concat(' ').concat(hour).concat(':00')
  })
}

//console.log(unifyDates('2023-08-01', ['08:00', '09:00', '10:00']))
