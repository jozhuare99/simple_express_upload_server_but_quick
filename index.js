const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
}).single('myFile');

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.send('An error occurred while uploading the file');
    } else {
      res.send('File uploaded successfully');
    }
  });
});
const port = "3000"

app.listen(port, () => {
  console.log('Server started on port 3000');
});
