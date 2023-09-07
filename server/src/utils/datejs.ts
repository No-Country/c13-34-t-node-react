import dayjs from 'dayjs'

export const secondsToDate = (dateInSeconds: string): string =>
  dayjs.unix(Number(dateInSeconds)).format('YYYY-MM-DD HH:mm')

export const dateToSecondsToString = (date: string): string =>
  dayjs(date).unix().toString()

export const secondsToOnlyDate = (dateInSeconds: string): string =>
  dayjs.unix(Number(dateInSeconds)).format('YYYY-MM-DD')
