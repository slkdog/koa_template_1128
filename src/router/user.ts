import { ParameterizedContext } from "koa"
import { getPagingParams } from "../util/pagination"
import userService from "../service/user"
import { genToken, verifyInsightToken } from "../util/auth"
import { User } from "../entity/user"
import AppDataSource from "../datatsource"
interface CreateTokenReq {
  token: string
}
const UserRouter = {
  async getUsers(ctx: ParameterizedContext) {
    // TODO not implemented
  },
  async getLegacy(ctx: ParameterizedContext) {
    const { offset, limit } = getPagingParams(ctx)
    const search = ctx.query.search || ""
    const users = await userService.getUserInfo(offset, limit, search as string)
    ctx.body = users
  },
  async createToken(ctx: ParameterizedContext) {
    const req = ctx.request.body as CreateTokenReq
    let payload = (await verifyInsightToken(req.token)) as User
    let DigitalRole = {}
    // const role = await AppDataSource.getRepository(AEMSUserRole).findOne({
    //   where: { userId: payload.userId },
    // })
    if (DigitalRole) {
      DigitalRole = Object.assign(payload)
    }
    payload = Object.assign(payload)
    const token = genToken(payload)
    ctx.body = {
      token: token,
    }
  },
}

export default UserRouter
