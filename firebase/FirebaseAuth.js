const firebase = require("firebase/app");
const { firebaseAuth, firebaseDb } = require("../firebase.config");

const auth = firebaseAuth;
const db = firebaseDb;

// Google Sign In
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    const user = result.user;
    const { displayName, email, photoURL } = user;

    // Check if user already exists in Firestore
    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      // Create new user in Firestore
      await userRef.set({
        name: displayName,
        email,
        photoURL,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Facebook Sign In
const facebookProvider = new firebase.auth.FacebookAuthProvider();

const signInWithFacebook = async () => {
  try {
    const result = await auth.signInWithPopup(facebookProvider);
    const user = result.user;
    const { displayName, email, photoURL } = user;

    // Check if user already exists in Firestore
    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      // Create new user in Firestore
      await userRef.set({
        name: displayName,
        email,
        photoURL,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// GitHub Sign In
const githubProvider = new firebase.auth.GithubAuthProvider();

const signInWithGithub = async () => {
  try {
    const result = await auth.signInWithPopup(githubProvider);
    const user = result.user;
    const { displayName, email, photoURL } = user;

    // Check if user already exists in Firestore
    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      // Create new user in Firestore
      await userRef.set({
        name: displayName,
        email,
        photoURL,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Email and Password Sign In
const signInWithEmailAndPassword = async (email, password) => {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    const user = result.user;
    const { displayName, email, photoURL } = user;

    // Check if user already exists in Firestore
    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      // Create new user in Firestore
      await userRef.set({
        name: displayName,
        email,
        photoURL,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Link Google Account
const linkWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    const credential = result.credential;
    await auth.currentUser.linkWithCredential(credential);

    // Update Firestore with additional data from Google account
    const { displayName, email, photoURL } = result.user;
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        name: displayName || "",
        email: email || "",
        photoURL: photoURL || "",
      });
  } catch (error) {
    if (error.code === "auth/credential-already-in-use") {
      // The Google account is already linked to another user
      // You can handle this case by merging the accounts
      console.error(error.message);
    }
  }
};

// Link Facebook Account
const linkWithFacebook = async () => {
  try {
    const result = await auth.signInWithPopup(facebookProvider);
    const credential = result.credential;
    await auth.currentUser.linkWithCredential(credential);

    // Update Firestore with additional data from Facebook account
    const { displayName, email, photoURL } = result.user;
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        name: displayName || "",
        email: email || "",
        photoURL: photoURL || "",
      });
  } catch (error) {
    if (error.code === "auth/credential-already-in-use") {
      // The Facebook account is already linked to another user
      // You can handle this case by merging the accounts
      console.error(error.message);
    }
  }
};

// Link GitHub Account
const linkWithGithub = async () => {
  try {
    const result = await auth.signInWithPopup(githubProvider);
    const credential = result.credential;
    await auth.currentUser.linkWithCredential(credential);

    // Update Firestore with additional data from GitHub account
    const { displayName, email, photoURL } = result.user;
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        name: displayName || "",
        email: email || "",
        photoURL: photoURL || "",
      });
  } catch (error) {
    if (error.code === "auth/credential-already-in-use") {
      // The GitHub account is already linked to another user
      // You can handle this case by merging the accounts
      console.error(error.message);
    }
  }
};
