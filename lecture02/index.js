require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const verifyToken = require('./lib/middleware/verifyToken');
const handleError = require('./lib/middleware/handleError');

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger.json');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const { SwaggerTheme } = require('swagger-themes');
const theme = new SwaggerTheme('v3');
const options = {
    explorer: true,
    customCss: theme.getBuffer('material'),
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));


// load routers
const adminRouter = require('./lib/components/admin/routes');
const clientRouter = require('./lib/components/client/routes');
const healthcheckRouter = require('./lib/components/healthcheck/routes');
const hoursRouter = require('./lib/components/hour/routes');
const invoiceRouter = require('./lib/components/invoice/routes');
const userRouter = require('./lib/components/user/routes');

app.use('/admin', verifyToken, adminRouter);
app.use('/client', verifyToken, clientRouter);
app.use('/healthcheck', healthcheckRouter);
app.use('/hour', verifyToken, hoursRouter);
app.use('/invoice', verifyToken, invoiceRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.json({msg: "this works"});
});


app.all('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.use(handleError);




app.listen(port, () => {
    console.log(`App running at http://localhost:${port}\nDocs running at http://localhost:${port}/docs`);
});