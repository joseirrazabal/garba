import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	error: {
		marginTop: '30px',
		color: 'red'
	}
}))

const Message = () => {
	const classes = useStyles()

	return <div className={classes.error}>No se encontro resultado :(</div>
}

export default Message
