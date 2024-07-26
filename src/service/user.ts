import AppDataSource from "../datatsource"
import { User } from "../entity/user"

class UserService {
  UserRepo = AppDataSource.getRepository(User)
  async getUserInfo(offset: number, limit: number, search: string) {
    return this.UserRepo.createQueryBuilder("u")
      .where("u.personno like :search", { search: `%${search}%` })
      .orWhere("u.cnname like :search", { search: `%${search}%` })
      .orWhere("u.firstname like :search", { search: `%${search}%` })
      .orWhere("u.lastname like :search", { search: `%${search}%` })
      .orWhere("concat(u.firstname,u.lastname) like :search", {
        search: `%${search}%`,
      })
      .orWhere("concat(u.lastname,u.firstname) like :search", {
        search: `%${search}%`,
      })
      .skip(offset)
      .take(limit)
      .getMany()
  }
}
const userService = new UserService()

export default userService
