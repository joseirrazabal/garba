import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import Home from './home'
import List from './list'
import Detail from './detail'
import Error404 from './error404'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}))

const App = () => {
	const classes = useStyles()

	return (
		<Router>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Button color="inherit" component={Link} to="/">
							Home
						</Button>
						<Button color="inherit" component={Link} to="/list">
							List
						</Button>
					</Toolbar>
				</AppBar>

				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/list" component={List} />
					<Route path="/detail/:id" component={Detail} />
					<Route component={Error404} />
				</Switch>
			</div>
		</Router>
	)
}

export default App
