import axios from 'axios'
import { MongoClient } from 'mongodb'

import getMongoDbConnection from '../../config/mongo'

class Product {
	changeState = async (id, enable = true) => {
		try {
			let db = await getMongoDbConnection()
			const item = await db.collection('details').findOne({ xid: id })
			const objSave = await db.collection('details').save({ ...item, enable })

			const itemList = await db.collection('products').findOne({ id })
			const objSaveList = await db.collection('products').save({ ...itemList, enable })

			return objSave.result.ok
		} catch (e) {
			console.log(e.message)
		}
		return false
	}

	getProductsById = async id => {
		try {
			let db = await getMongoDbConnection()

			const item = await db.collection('details').findOne({ xid: id })

			if (item) {
				if (item.enable === false || item.enable === 'false') {
					return null
				}
				return item
			} else {
				const data = await axios.get(`http://garbarino-mock-api.s3-website-us-east-1.amazonaws.com/products/${id}`)

				if (!data.data) {
					return null
				}

				const objSave = await db.collection('details').save({ ...data.data, enable: true })

				return objSave.ops[0] || { ...data.data, enable: true }
			}
		} catch (e) {
			console.log('error:', e.message)
		}
		return null
	}

	getAllProducts = async () => {
		try {
			let db = await getMongoDbConnection()

			var items = await db
				.collection('products')
				.find({ enable: true })
				.toArray()

			if (items.length) {
				return items
			} else {
				items = await this.getAllProductsFromApi()
				items.forEach(async item => {
					const objSave = await db.collection('products').save({ ...item, enable: true })
				})

				items = await db
					.collection('products')
					.find({ enable: true })
					.toArray()

				return items
			}
		} catch (e) {
			console.log('error:', e.message)
		}

		return []
	}

	getAllProductsFromApi = async () => {
		try {
			const data = await axios.get('http://garbarino-mock-api.s3-website-us-east-1.amazonaws.com/products')
			const result = (data && data.data && data.data.items) || []

			return result
		} catch (e) {
			console.log('error:', e.message)
		}
		return []
	}
}

export default new Product()
