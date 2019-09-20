import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import config from './config'
import router from './routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', router);

router.use(function(err, req, res, next) {
  console.error(err);

  res.status(500).send('Error');
});

app.listen(config.port, () => { 
  console.log(`App listening on port ${config.port}`)
})
