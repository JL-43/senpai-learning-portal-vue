// src/services/courseService.js
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

async function getCourses(board) {
  const courses = [];
  const coursesCollection = collection(db, 'courses', board, 'items');
  const querySnapshot = await getDocs(coursesCollection);
  querySnapshot.forEach((doc) => {
    courses.push({ id: doc.id, ...doc.data() });
  });
  return courses;
}

export { getCourses };
