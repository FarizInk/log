import axios from "axios";
import bcrypt from "bcrypt";

const config = useRuntimeConfig();

export const getTicket = async () => {
  const { data } = await axios.get(config.SPACEGRAM_API_URL + "/api/ticket");
  return data.ticket ?? null;
};

export const makeToken = async (ticket: string) => {
  return bcrypt.hashSync(ticket + config.SPACEGRAM_KEY, 11);
};

export const getData = async (date: string) => {
  const filename = config.SPACEGRAM_PREFIX + date + '.json';
  // console.log(config.SPACEGRAM_API_URL + "/file/" + filename);
  const { data } = await axios.get(
    config.SPACEGRAM_API_URL + "/file/" + filename,
  );
  return data;
};

export const storeData = async (content: object, date: string) => {
  const ticket = await getTicket();
  const token = await makeToken(ticket);
  
  const id = config.SPACEGRAM_PREFIX + date

  let json = [];

  try {
    json = await getData(date);
  } catch (error) {
    // console.log(error?.response?.data);
    if (error?.response?.data === "File Not Found!") {
      try {
        
        await axios.post(config.SPACEGRAM_API_URL + "/api/store", {
          content: [content],
          custom_id: id,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.log(error);
        
      }
    }

    return null
  }

  // console.log(config.SPACEGRAM_API_URL + "/api/update/" + id);
  
  try {
    await axios.post(config.SPACEGRAM_API_URL + "/api/update/" + id, {
      content: [
        ...json,
        content
      ],
      // content: [],
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error?.response?.data);
  }
  

  return null;
}
