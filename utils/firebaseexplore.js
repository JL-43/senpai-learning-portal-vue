const admin = require('firebase-admin');

const serviceAccount = require('../senpai-learning-portal-vue-firebase-adminsdk-1a519-1991a70234.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function queryCollection(collectionPath) {
  try {
    const snapshot = await db.collection(collectionPath).get();
    snapshot.forEach(doc => {
      console.log(`Document ID: ${doc.id}, Data: `, doc.data());
    });
  } catch (error) {
    console.log("Query Collection Error");
  }
}

// Replace 'courses/generalBoard/items' with your desired collection path
// queryCollection('courses/generalBoard/items');
// queryCollection('courses/otcBoard/items');
// queryCollection('courses/scmBoard/items');

async function updateCourseCompletion(board, courseId, newCompletionStatus) {
  try {
    const courseRef = db.collection('courses').doc(board).collection('items').doc(courseId);
    // const courseRef = db.collection('courses').doc('generalBoard').collection('items').doc('"gen5"');
    console.log("---------------------- start");
    console.log(courseRef);
    console.log("---------------------- end");
    console.log("---------------------- get start");
    const snapshot = await courseRef.get();

    if (snapshot.exists) {
      console.log(`Document ID: ${snapshot.id}, Data: `, snapshot.data());
      await courseRef.update({ completed: newCompletionStatus });
      console.log(`Updated course ${courseId} in board ${board} to completion status ${newCompletionStatus}`);
    } else {
      console.log(`Document with ID ${courseId} does not exist.`);
    }
    console.log("---------------------- get end");
  } catch (error) {
    console.log("Update Course Completion Error");
    console.log("----");
    console.log(courseRef);
  }
}

// Example usage
updateCourseCompletion('generalBoard', "'gen1'", true);
queryCollection('courses/generalBoard/items');
// updateCourseCompletion('generalBoard', 'gen1', false);
// queryCollection('courses/generalBoard/items');
