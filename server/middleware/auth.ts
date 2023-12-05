import bcrypt from "bcrypt";

export default defineEventHandler((event) => {
  // const token = getHeader(event, "Authorization")?.replace("Bearer ", "")
  //   .trim();


  // if (token) {
  //   const config = useRuntimeConfig();
  //   console.log(config.PASSWORD, token);
    
  //   event.context.auth = bcrypt.compareSync(config.PASSWORD, token);
  // } else {
  //   event.context.auth = false;
  // }
});
