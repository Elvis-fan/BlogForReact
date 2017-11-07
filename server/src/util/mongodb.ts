import { MongoClient, Db } from 'mongodb';
import * as assert from 'assert';
var db: Db;
const mongodbPool = async (callback) => {
	const client = await MongoClient.connect('mongodb://174.137.55.117:27017/', { useNewUrlParser: true });
	db = client.db('blog');
	callback();
};
export { mongodbPool, db };
