// import { useError } from "nuxt/app";
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  return {
    token:config.PASSWORD === body.password ? bcrypt.hashSync(config.PASSWORD, 11) : null
  }
});
