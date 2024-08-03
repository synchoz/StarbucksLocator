const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const sharedUtils = require('../shared/util');

app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

//later need to change to get with req params
app.get('/api/verifystoreservice', async (req,res) => {
    const {latitude, longtitude, alpha3code} =  req.query;
    console.log(req.query);
    if (alpha3code) {
        try {
            let message = await sharedUtils.verifyByCordsCode(latitude, longtitude, alpha3code);
            res.status(201).json({
                success: true,
                msg: message
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                msg: error
            })
        }
    }
});

app.listen(port, () => {
    console.log('listening on a port ', port);
})


