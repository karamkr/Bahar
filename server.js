const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const secretParamsCheck = (req, res, next) => {
  const { r, pass, active } = req.query;
  if (r === '0' && pass === 'ali2008aaa1' && active === 'true') {
    next();
  } else {
    res.status(404).send('404 Not Found');
  }
};

const strictAccessCheck = (req, res, next) => {
  const allowedDomains = [
    'https://careful-burnt-honesty.glitch.me',
    'http://localhost:3000'
  ];

  const requestOrigin = req.get('Origin');
  const requestReferer = req.get('Referer');

  if (req.path === '/data.json') {
    const isAllowed = allowedDomains.some(domain => 
      requestOrigin === domain || 
      (requestReferer && requestReferer.startsWith(domain))
    );

    if (!isAllowed) {
      return res.status(403).json({ 
        error: 'forbidden' 
      });
    }
  }

  next();
};

app.use(strictAccessCheck);

app.get('/admin.html', secretParamsCheck, (req, res) => {
  const filePath = __dirname + '/admin.html';
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('404 Not Found');
  }
});

app.get('/server.js', secretParamsCheck, (req, res) => {
  const filePath = __dirname + '/server.js';
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('404 Not Found');
  }
});

app.get('/package.json', secretParamsCheck, (req, res) => {
  const filePath = __dirname + '/package.json';
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('404 Not Found');
  }
});

app.get('/api/data', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('data.json'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'فشل في قراءة الملف' });
  }
});

app.post('/api/save', (req, res) => {
  try {
    fs.writeFileSync('data.json', JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'تم الحفظ بنجاح' });
  } catch (error) {
    res.status(500).json({ error: 'فشل في حفظ البيانات' });
  }
});

app.get('/data.json', (req, res) => {
  res.status(403).json({ 
    error: 'forbidden' 
  });
});

app.use(express.static(__dirname, {
  index: false,
  setHeaders: (res, path) => {
    if (
      path.endsWith('index.html') ||
      path.endsWith('server.js') ||
      path.endsWith('package.json')
    ) {
      res.setHeader('Cache-Control', 'no-store');
    }
  }
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`الخادم يعمل على http://localhost:${port}`);
});
