const admin = require('firebase-admin');
const serviceAccount = require('../senpai-learning-portal-vue-firebase-adminsdk-1a519-1991a70234.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function printDocumentData(docRef, indent = 0) {
  const doc = await docRef.get();
  if (doc.exists) {
    console.log(`${' '.repeat(indent)}Document Data:`, doc.data());
    printCollections(docRef, indent + 2); // Also explore subcollections of the document
  } else {
    console.log(`${' '.repeat(indent)}No such document!`);
  }
}

async function printCollection(collectionRef, indent = 0) {
  const space = ' '.repeat(indent);
  const snapshot = await collectionRef.get();

  snapshot.forEach(doc => {
    console.log(`${space}- Document: ${doc.id}`);
    printDocumentData(doc.ref, indent + 4);
  });
}

async function printCollections(docRef, indent = 0) {
  const space = ' '.repeat(indent);
  const collections = await docRef.listCollections();

  collections.forEach(collection => {
    console.log(`${space}Collection: ${collection.id}`);
    printCollection(collection, indent + 2);
  });
}

db.listCollections().then(collections => {
  collections.forEach(collection => {
    console.log(`Collection: ${collection.id}`);
    printCollection(collection, 2);
  });
});