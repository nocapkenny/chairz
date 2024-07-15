
const express = require('express')
const routesRouter = require('./database/router')
const PORT = 3030
const api = express()
const fileUpload = require('express-fileupload');

api.use(fileUpload({
  createParentPath: true
}));

api.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

api.use(express.json())
api.use('/api', routesRouter)

api.listen(PORT, ()=> console.log(`server started on port ${PORT}`))