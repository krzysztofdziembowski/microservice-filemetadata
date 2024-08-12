var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser')
var multer = require('multer')
require('dotenv').config()

var app = express();
var upload = multer({dest: 'uploads/'})

app.use(cors());
app.use(bodyparser.urlencoded({extended: false}))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = req.file.originalname;
  const fileSize = req.file.size;
  const fileType = req.file.mimetype;

  res.json({
    name: fileName,
    type: fileType,
    size: fileSize
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
