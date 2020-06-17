import mongoose from './mongoose'
import { CounterKeyEnum } from '../enums/counterKeyEnum'
const Schema = mongoose.Schema

// 生成自增主键的类，countName为键名，count为键值
const Counters = new Schema({
  countName: {
    type: String,
    unique: true,
  },
  count: Number,
})
const Counter = mongoose.model('Counter', Counters)
// 生成自增主键的函数
function incrementCounter(
  counterName: CounterKeyEnum,
  callback: (err: Error, result?: any) => any
) {
  // @ts-ignore
  Counter.collection.findAndModify(
    { countName: counterName },
    [],
    { $inc: { count: 1 } },
    { new: true, upsert: true },
    function (err: Error, result?: any) {
      if (err) callback(err)
      else callback(null, result.value.count)
    }
  )
}

// 将自增主键函数包裹一层Promise便于使用await返回值
export async function counter(counterName: CounterKeyEnum): Promise<number> {
  return new Promise((resolve, reject) => {
    incrementCounter(counterName, (err, num) => {
      if (err) {
        reject(err)
      }
      resolve(num)
    })
  })
}
