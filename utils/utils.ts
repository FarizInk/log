import bcrypt from "bcrypt";

export const checkAuth = (event) => {
  const baseError = {
    statusCode: 401,
    message: 'Unauthorized'
  }
  const token = getHeader(event, "Authorization")?.replace("Bearer ", "")
    .trim();
    
  if (token) {
    const config = useRuntimeConfig();
    const result = bcrypt.compareSync(config.PASSWORD, token);
    return (result) ? result : baseError
  } else {
    return baseError;
  }
};
