const fs = require('fs');
const path = require('path');
const multer  = require('multer');
const router = require('express').Router();

const upload = multer({ dest: 'uploads' });

router.post('/', upload.single('file'), (request, response) => {
  const secret = process.env.UPLOAD_SECRET;
  const { password } = request.query;

  if (!secret) {
    console.log('Upload secret has not been set!');
  }

  if (!!secret && password === secret) {
    const { file: { path: filePath } } = request;
    const uploaded = path.resolve(__dirname, '../' + filePath);
    const dest = path.resolve(__dirname, '../data.json');

    fs.renameSync(uploaded, dest);

    response.send(dest);
  }
});

module.exports = router;
