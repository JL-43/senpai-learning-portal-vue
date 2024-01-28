const fs = require('fs');
const admin = require('firebase-admin');
const serviceAccount = require('./senpai-learning-portal-vue-firebase-adminsdk-1a519-1991a70234.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateData() {
  const data = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));

  for (const board in data) {
    const boardRef = db.collection('courses').doc(board);

    for (const course of data[board]) {
      await boardRef.collection('items').doc(course.id).set(course);
    }
  }

  console.log('Migration completed!');
}

migrateData().catch(console.error);