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
const adminRouter = require('./lib/components/admin/routes');
const clientRouter = require('./lib/components/client/routes');
const healthcheckRouter = require('./lib/components/healthcheck/routes');
const hoursRouter = require('./lib/components/hour/routes');
const invoiceRouter = require('./lib/components/invoice/routes');

app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/healthcheck', healthcheckRouter);
app.use('/hour', hoursRouter);
app.use('/invoice', invoiceRouter);

app.get('/', (req, res) => {
    res.json({msg: "this works"});
});


app.all('*', (req, res) => {
    res.status(404).send('Not Found');
});

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`)
});