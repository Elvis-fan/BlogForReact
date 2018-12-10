import { MongoClient, Db } from 'mongodb'
let db: Db
const mongodbPool = async (callback) => {
  const client = await MongoClient.connect('mongodb://174.137.55.117:27017/', { useNewUrlParser: true })
  db = client.db('blog')
  callback()
}
const getNextId = async (sequenceName) => {
  let { value } = await db.collection('counters')
    .findOneAndUpdate({ _id: sequenceName }, { $inc: { sequence_value: 1 } })
  return `${value.sequence_value}`
}
export { mongodbPool, db, getNextId }
