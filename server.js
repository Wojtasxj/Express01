const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.post('/contact/send-message', upload.single('file'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const file = req.file;

  // console.log('Author:', author);
  // console.log('Sender:', sender);
  // console.log('Title:', title);
  // console.log('Message:', message);
  // console.log('File:', file);

  if (!author || !sender || !title || !message || !file) {
    return res.render('contact', { isError: true, errorMessage: 'All fields, including file, are required.' });
  }

  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
  const extension = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return res.render('contact', { isError: true, errorMessage: 'Invalid file type.' });
  }

  const successMessage = `The message has been sent! File ${file.originalname} has been saved.`;

  res.render('contact', {
    isError: false,
    successMessage: successMessage
  });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});