import { storeData } from "~/utils/spacegram";
import { checkAuth } from "~/utils/utils";

export default defineEventHandler(async (event) => {
  // NOTE:
  // - format file log_year-month, ex: log_2023-09
  // - format data:
  // {
  //   timestamp: 1694585682314, // use timestamp as unique id
  //   type: 'simple-text', // type of content
  //   content: 'ini konten', // depends on type, it can be string, json, or long text
  //   meta: '', // meta content, depends on content, it can be null, string, json or something
  // }

  // 1. get data from spacegram (after hit, u know history or file json exist or no)
  // 2. merge data (request, spacegram result)
  // 3. send data (depend on step 1, if file 404 -> create file, else -> update file)

  const authResult = checkAuth(event)
  if (authResult !== true) throw createError(authResult)

  const body = await readBody(event);
  const date = new Date()
  const year = date.getFullYear()
  const data = {
    year,
    month: date.getMonth() + 1,
    date: date.getDate(),
    timestamp: date.getTime(), // use timestamp as unique id
    type: 'simple-text', // type of content
    content: body.content, // depends on type, it can be string, json, or long text
    meta: '', // meta content, depends on content, it can be null, string, json or something
  }
  
  await storeData(data, year + '-' + (date.getMonth() + 1).toString().padStart(2, '0'))

  return {
    data,
  };
});
