const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));

const admin = require('firebase-admin');
const serviceAccount = require('./senpai-learning-portal-vue-firebase-adminsdk-1a519-1991a70234.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateData() {
  for (const board in data) {
    const boardRef = db.collection('courses').doc(board);

    // Iterate directly over the array of courses in each board
    for (const course of data[board]) {
      await boardRef.collection('items').add({ ...course });
    }
  }
}


migrateData().then(() => console.log('Migration completed!'));

