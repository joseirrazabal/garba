import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

class Detail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			detail: {},
			notFound: false
		}
	}

	getProduct = async id => {
		try {
			const product = await axios.get(`http://localhost:4000/products/${id}`)
			this.setState({ detail: product.data || {} })
		} catch (e) {
			this.setState({ notFound: true })
		}
	}

	componentDidMount() {
		const {
			match: { params }
		} = this.props
		this.getProduct(params.id)
	}

	render() {
		const { detail, notFound } = this.state

		if (notFound) {
			return <Redirect to="/error" />
		}

		var image = (detail && detail.main_image) || {}

		return (
			<Grid container spacing={2} style={{ marginTop: '20px' }}>
				{detail && (
					<div>
						<Typography variant="h6" component="h1" gutterBottom>
							{detail.description}
						</Typography>
						<Typography variant="overline" display="block" gutterBottom>
							{detail.summary}
						</Typography>
						<div>Categoria: {detail.category}</div>
						<CardMedia component="img" height="240" image={image['url']} style={{ minHeight: 300, width: 400 }} />
						<Typography variant="h6" component="h1" gutterBottom>
							$ {formatNumber(Number(detail.price))}
						</Typography>
					</div>
				)}
			</Grid>
		)
	}
}

export default Detail
