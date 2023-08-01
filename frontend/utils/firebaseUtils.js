import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const { storage } = require("./firebaseConfig");

export const savePhotoToFirebase = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  uploadBytes(storageRef, file).then(() => {});
};

export const loadPhotoFromFirebase = async (fileName) => {
  if (fileName === undefined || fileName === null) {
    return null;
  }
  try {
    const storage = getStorage(); // Initialize the Firebase storage instance
    const fileRef = ref(storage, `images/${fileName}`); // Create a reference to the file in Firebase Storage
    const downloadURL = await getDownloadURL(fileRef); // Fetch the download URL for the file
    return downloadURL;
  } catch (error) {
    console.error("Error fetching file from Firebase Storage:", error);
    return null;
  }
};
