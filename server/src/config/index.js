import dotenv from 'dotenv'

dotenv.config()

const config = {
	mongo: {
		url: process.env.MONGO_URL
	},
	port: process.env.PORT
}

export default config
