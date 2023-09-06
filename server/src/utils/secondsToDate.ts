import dayjs from 'dayjs'

export const secondsToDate = (dateInSeconds: string): string => {
  return dayjs.unix(Number(dateInSeconds)).format('YYYY-MM-DD HH:mm')
}
