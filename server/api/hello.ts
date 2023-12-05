import { getData } from "~/utils/spacegram";

export default defineEventHandler(async (event) => {
  const date = new Date();
  
  return {
    data: await getData('2023-09'),
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    date: date.getDate(),
    date_string: date.toISOString().split('T')[0],
    time: date.toISOString().substring(11, 19),
    timezone_offset: date.getTimezoneOffset(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: date.getTime(),
  };
});
