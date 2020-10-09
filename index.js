const express = require('express');
const app = express();
const os = require("os");
const path = require('path');
const port = process.env.PORT || 8080;
const lbCookieName = process.env.LB_COOKIE_NAME || "oci-lb-cookie";

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', "ejs");

const ip = require('ip');
const ipAddress = ip.address();

app.get('/', (req, res) => {

    const serverInfo = {
      platform: os.platform(),
      cpus: os.cpus(),
      arch: os.arch(),
      userInfo: os.userInfo().shell,
      hostname: os.hostname(),
      ipAddress
    }

    var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.setHeader('Set-Cookie', lbCookieName);
    res.render("index", { serverInfo, clientInfo: { ip: clientIp }, headers: req.headers});
});

app.listen(port, () => {
    console.log(`Server running on ${port}.`);
});
