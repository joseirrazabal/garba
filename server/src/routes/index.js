import express from 'express'

import products from '../controllers/products'

const router = express.Router()

router.get('/products/:id', async (req, res, next) => {
	const id = req.params.id || null
	const result = await products.getProductsById(id)

	if (result) {
		res.send(result)
	} else {
		res.sendStatus(404)
	}
})

router.patch('/products/:id', async (req, res, next) => {
	const id = req.params.id || null
	const enable = req.body.enable || null

	const result = await products.changeState(id, enable)

	res.send(Boolean(result))
})

router.get('/products', async (req, res, next) => {
	const result = await products.getAllProducts()

	res.send(result)
})

export default router
