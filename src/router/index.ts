import Router from "koa-router"
import koaBody from "koa-body"
import { koaBodyConfig } from "../util/file"
import { errorHandler } from "../util/error"
import { tick, tack } from "../util/tick-tack"
import { roleFilter } from "../util/auth"
import UserRouter from "./user"
import TPMRouter from "./tpm"
import OPLRouter from "./opl"

const UserRouterGroup = new Router()
  // .use(roleFilter())
  .post("/user/token", UserRouter.createToken)
  .get("/users", UserRouter.getUsers)
  .get("/legacy/users", UserRouter.getLegacy)

const TPMRouterGroup = new Router()
  .post("/tpm/opl/create", TPMRouter.createOPL)
  .get("/tpm/opl/get", TPMRouter.getOPL)
  .get("/tpm/list/:deviceId/get", TPMRouter.getTpmList)
  .post("/tpm/opl/plan/update", OPLRouter.updateOPLById)
  .post("/tpm/record/create", TPMRouter.createRecord)
  .get("/tpm/code/:deviceId/getAll", TPMRouter.getTPMErrorById)
  .post("/tpm/tpmCode/:tpmCodeId/update", TPMRouter.updateTPMCodeById)
  .post("/tpm/pic/upload",TPMRouter.uploadTPMPic)
// .get("/tpm/:deviceId",TPMRouter.getTPMById)
// .get("/devices", TPMRouter.getDevices)

const router = new Router()
  .use(errorHandler)
  .use(koaBody(koaBodyConfig))
  .use(tick, tack)
  .use(UserRouterGroup.routes())
  .use(TPMRouterGroup.routes())
  .get("/devices/get", TPMRouter.getDevices)
  .post("/device/update", TPMRouter.updateById)

export default router
