import * as mongoose from 'mongoose'
import config from '../config/config'
mongoose
  .connect(config.mongoHost, {
    dbName: config.mongoDBName,
    user: config.mongoUser,
    pass: config.mongoPassword,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(config.mongoDBName + '数据库连接成功！')
  })
  .catch(err => {
    console.log(config.mongoDBName + '数据库连接出错：' + err)
  })

export default mongoose
