// import "reflect-metadata"
// import { DataSource } from "typeorm"
// import config from "../config.json"
// import { Device } from "./entity/device"
// import { CodeToDevice, TPM, TPMCode } from "./entity/tpm"
// import { ErrorToTPMCode, OPL } from "./entity/opl"
// import { User, UserPassword } from "./entity/user"

// const AppDataSource = new DataSource({
//   type: "mssql",
//   host: config.DBConfig.host,
//   username: config.DBConfig.username,
//   password: config.DBConfig.password,
//   database: config.DBConfig.database,
//   synchronize: false,
//   logging: process.env.NODE_ENV === "development" ? true : false,
//   entities: [

//     // Add your entities here
//   ],
//   migrations: [],
//   subscribers: [],
//   extra: {
//     trustServerCertificate: true,
//   },
// })

// export default AppDataSource
