import { ParameterizedContext } from "koa"
import { getPagingParams } from "../util/pagination"
import userService from "../service/user"
import { genToken, verifyInsightToken } from "../util/auth"
// import AppDataSource from "../datatsource"
interface CreateTokenReq {
  token: string
}
const UserRouter = {
  
}

export default UserRouter
