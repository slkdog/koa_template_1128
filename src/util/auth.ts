import axios from "axios"
import { ParameterizedContext, Next } from "koa"
import { ServiceError, StatusCode } from "./error"
import logger from "./logger"
import crypto from "crypto"
import jwt from "jsonwebtoken"

const authServerUrl = "https://sgpvm172.apac.bosch.com/api"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const instance = axios.create({
  baseURL: authServerUrl,
})

const verifyToken = async (token: string) => {
  try {
    const res = await instance.post("/auth/token", null, {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    logger.error(error)
    throw new ServiceError("invalid token").setStatusCode(
      StatusCode.Unauthorized
    )
  }
}
export const verifyInsightToken = async (token: string) => {
  try {
    const res = await instance.post("/auth/token", null, {
      headers: {
        authorization: `bearer ${token}`,
      },
      proxy: false,
    })
    return res.data
  } catch (error) {
    logger.error(error)
    throw new ServiceError("invalid token").setStatusCode(
      StatusCode.Unauthorized
    )
  }
}
const key = crypto.randomBytes(256).toString("base64")
export const genToken = (payload: string | object | Buffer) => {
  const token = jwt.sign(payload, key)
  return token
}
const roleFilter =
  (...roles: string[]) =>
    async (ctx: ParameterizedContext, next: Next) => {
      const headers = ctx.header.authorization
      const token = headers?.substring(7) || ""
      const payload = await verifyToken(token)
      let role = ""
      if (payload.academyRole != null) {
        role = payload.academyRole.role
      }
      if (roles.length == 0 || roles.includes(role)) {
        ctx.state.identity = payload
        await next()
      } else {
        logger.error("unauthorized")
        throw new ServiceError("invalid token").setStatusCode(
          StatusCode.Unauthorized
        )
        return
      }
    }

export { roleFilter }
