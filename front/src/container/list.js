import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { withStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

const styles = {
	card: {
		height: 400,
		maxWidth: 345
	}
}

class List extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			products: []
		}
	}

	getProducts = async () => {
		const products = await axios.get('http://localhost:4000/products')
		this.setState({ products: products.data || [] })
	}

	componentDidMount() {
		this.getProducts()
	}

	handleClick(id) {}

	render() {
		const { classes } = this.props
		const { products } = this.state

		return (
			<Grid container spacing={2} style={{ marginTop: '20px' }}>
				{products &&
					products.map((item, i) => {
						return (
							<Grid item xs={6} md={4} key={i}>
								<Card
									className={classes.card}
									component={Link}
									to={`/detail/${item.id}`}
									style={{ textDecoration: 'none' }}
								>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											height="140"
											image={item.image_url}
											title="Contemplative Reptile"
											style={{ minHeight: 300 }}
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2">
												$ {formatNumber(item.price)}
											</Typography>
											<Typography variant="body2" color="textSecondary" component="p">
												{item.description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						)
					})}
			</Grid>
		)
	}
}

export default withStyles(styles)(List)
