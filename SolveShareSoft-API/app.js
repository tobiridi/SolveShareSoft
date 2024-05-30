const express = require('express');
const router = require('./Routers');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

//config app middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//TODO: config cors
app.use(cors());
//TODO: config headers
app.use(helmet());

//config app router
app.use('/api/v1', router);

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`API Server is running on : http://localhost:${port}/api/v1/`);
});