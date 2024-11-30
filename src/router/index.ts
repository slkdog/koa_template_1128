import { koaBodyConfig } from "../util/file"
import { errorHandler } from "../util/error"
import { tick, tack } from "../util/tick-tack"
import { roleFilter } from "../util/auth"
import UserRouter from "./user"
import Router from "koa-router"
import koaBody from "koa-body"
const UserRouterGroup = new Router()
// .get("/tpm/:deviceId",TPMRouter.getTPMById)
// .get("/devices", TPMRouter.getDevices)

const router = new Router()
  .use(errorHandler)
  .use(koaBody(koaBodyConfig))
  .use(tick, tack)
  .use(UserRouterGroup.routes())

export default router
