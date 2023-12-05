import { getData } from "~/utils/spacegram";

export default defineEventHandler(async (event) => {
  const param = getQuery(event);
  let data = [];

  try {
    data = await getData(
      param.year + "-" + param.month?.toString().padStart(2, "0"),
    );
  } catch (error) {
    // console.log(error);
  }

  const result = data
    .filter((item) =>
      param.date ? item.date.toString() === param.date.toString() : true
    )
    .sort((a, b) => a.timestamp - b.timestamp)
    .reverse();

  return result;
});
