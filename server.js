const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
const serviceAccount = require('./senpai-learning-portal-vue-firebase-adminsdk-1a519-1991a70234.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/courses/:board', async (req, res) => {
  try {
    const board = req.params.board;
    const boardRef = db.collection('courses').doc(board);
    const doc = await boardRef.get();
    if (!doc.exists) {
      return res.status(404).send('Board not found');
    }
    return res.json(doc.data());
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
});

app.put('/courses/:board/:id', async (req, res) => {
  try {
    const { board, id } = req.params;
    const courseRef = db.collection('courses').doc(board).collection('items').doc(id);
    await courseRef.set(req.body, { merge: true });
    return res.json({ id, ...req.body });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
});

// Static file serving for Vue.js frontend
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
