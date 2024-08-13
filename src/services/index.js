import {
 collection,
 doc,
 getDoc,
 getDocs,
 getFirestore,
 orderBy,
 query,
 where,
 addDoc,
 limitToLast,
 updateDoc,
 deleteDoc,
} from "firebase/firestore";
import app from "@/lib/firebase/init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName) {
 const snapshot = await getDocs(collection(firestore, collectionName));
 const data = snapshot.docs.map((doc) => ({
  [`id-${collectionName}`]: doc.id,
  ...doc.data(),
 }));
 return data;
}

export async function retrieveDataById(collectionName, id) {
 const snapshot = await getDoc(doc(firestore, collectionName, id));
 const data = snapshot.data();
 if (data) data[`id-${collectionName}`] = snapshot.id;
 return data;
}

export async function createData(collectionName, data) {
 const snapshot = await addDoc(collection(firestore, collectionName), data);
 const userData = await retrieveDataById(collectionName, snapshot.id);
 return userData;
}

export async function updateData(collectionName, id, data) {
 const docRef = doc(firestore, collectionName, id);
 await updateDoc(docRef, data);
 const finalData = await retrieveDataById(collectionName, id);
 return finalData;
}

export async function deleteData(collectionName, id) {
 const docRef = doc(firestore, collectionName, id);
 await deleteDoc(docRef);
}

export const retrieveDataByField = async (collectionName, field, value) => {
 const q = query(
  collection(firestore, collectionName),
  where(field, "==", value)
 );

 const snapshot = await getDocs(q);
 const data = snapshot.docs.map((doc) => ({
  [`id-${collectionName}`]: doc.id,
  ...doc.data(),
 }));
 return data;
};

// export const retrieveDataByOrder = async (
//  collectionName,
//  order,
//  direction = "asc"
// ) => {
//  const q = query(
//   collection(firestore, collectionName),
//   orderBy(order, direction)
//  );

//  const snapshot = await getDocs(q);
//  const data = snapshot.docs.map((doc) => ({
//   id: doc[`id-${collectionName}`],
//   ...doc.data(),
//  }));
//  return data;
// };

// export const retrieveDataByOrderLimit = async (
//  collectionName,
//  order,
//  direction = "asc",
//  limit = 10
// ) => {
//  const q = query(
//   collection(firestore, collectionName),
//   orderBy(order, direction),
//   limitToLast(limit)
//  );

//  const snapshot = await getDocs(q);
//  const data = snapshot.docs.map((doc) => ({
//   id: doc[`id-${collectionName}`],
//   ...doc.data(),
//  }));
//  return data;
// };
