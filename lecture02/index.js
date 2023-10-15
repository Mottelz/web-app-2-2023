require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// load routers
const healthcheckRouter = require('./components/healthcheck/routes');
app.use('/healthcheck', healthcheckRouter);

app.get('/', (req, res) => {
    res.json({msg: "this works"});
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`)
});