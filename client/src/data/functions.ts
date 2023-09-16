import { differenceInCalendarYears } from "date-fns";

export const getAge = (value: string) => {
  const birthDay = new Date(value);
  const now = new Date();
  const age = differenceInCalendarYears(now, birthDay);
  return age;
};
