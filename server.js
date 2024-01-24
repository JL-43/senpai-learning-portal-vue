const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;
const DATA_FILE = './data/db.json';

app.get('/courses/:board', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }
    const board = req.params.board;
    const courses = JSON.parse(data)[board];
    res.json(courses);
  });
});

app.put('/courses/:board/:id', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }
    let db = JSON.parse(data);
    const { board, id } = req.params;
    const courseIndex = db[board].findIndex(c => c.id === id);
    if (courseIndex >= 0) {
      db[board][courseIndex] = req.body;
      fs.writeFile(DATA_FILE, JSON.stringify(db), (err) => {
        if (err) {
          res.status(500).send('Server error');
          return;
        }
        res.json(db[board][courseIndex]);
      });
    } else {
      res.status(404).send('Course not found');
    }
  });
});

app.get('/courses', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
