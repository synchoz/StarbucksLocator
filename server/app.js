require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000
const cors = require('cors');
const storeRoutes = require('./src/routes/storeRoutes');
const bodyParser = require('body-parser')


app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

app.use('/api', storeRoutes);

app.listen(port, () => {
    console.log('listening on a port ',port);
})