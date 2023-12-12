const express = require('express')
const router = require('./routes')
const cors = require('cors')
const app = express()

app.use(cors())
app.use('/products', router)
app.listen(3030)