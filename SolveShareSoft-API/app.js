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

app.listen(process.env.PORT, () => {
    console.log(`API Server is running on : http://localhost:${process.env.PORT}/api/v1/`);
});