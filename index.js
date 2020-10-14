const express = require('express');
const app = express();
const os = require('os');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 8080;
const lbCookieName = process.env.LB_COOKIE_NAME || 'oci-lb-cookie';

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/images'));

app.set('view engine', 'ejs');

const ip = require('ip');
const ipAddress = ip.address();

app.get('/', (req, res) => {
    const serverInfo = {
        platform: os.platform(),
        cpus: os.cpus(),
        arch: os.arch(),
        userInfo: os.userInfo().shell,
        hostname: os.hostname(),
        ipAddress,
    };

    var clientIp =
        req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.setHeader('Set-Cookie', lbCookieName);
    res.render('index', {
        serverInfo,
        clientInfo: { ip: clientIp },
        headers: req.headers,
    });
});

app.get('/hello', (req, res) => {
    const data = {
        message: 'Hello',
        date: Date.now(),
    };
    res.json(data);
});

app.get('/version', (req, res) => {
    const pkg = require('./package.json');
    const data = {
        name: pkg.name,
        version: pkg.version,
        dependencies: pkg.dependencies,
    };
    res.json(data);
});

//* image stuff 
const multer = require('multer');
// const upload = multer({ dest: __dirname + '/public' });

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/public/images'))
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname)
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.json(req.file);
        return;
    }
    throw Error('blah');
});

app.get('/gallery', (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, 'public/images'));
  const imgSrcs =files.map(f => `/images/${f}`)
  res.render('gallery', { images: imgSrcs})
});

// * end image stuff

app.listen(port, () => {
    console.log(`Server running on ${port}.`);
});
