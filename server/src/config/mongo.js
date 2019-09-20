import { MongoClient } from 'mongodb'

import config from './index'

let connection

export default function() {
	return new Promise((resolve, reject) => {
		if (connection) resolve(connection)
		MongoClient.connect(config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
			if (err) reject(err)
			connection = db.db()
			resolve(connection)
		})
	})
}
