const express = require('express');
const app = express();
const os = require("os");
const path = require('path');

const port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "ejs");

app.get('/', (req, res) => {
    //var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const serverInfo = {
      platform: os.platform(),
      cpus: os.cpus(),
      arch: os.arch(),
      userInfo: os.userInfo().shell,
      hostname: os.hostname(),
    }


    

    res.render("index", { serverInfo, clientInfo: req.headers});
   // res.send(os.hostname());
    // console.log('req', req.headers);
    //res.send('Hello');
});

app.listen(port, () => {
    console.log(`Server runnng on ${port}.`);
});
