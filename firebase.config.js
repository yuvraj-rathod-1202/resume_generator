import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { 
    getFirestore, 
    doc, 
    getDoc,
    addDoc,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCb9Aow6fnjCxSguFJmVZqs_bxenT_C034",
    authDomain: "video-call-web-app-2639c.firebaseapp.com",
    projectId: "video-call-web-app-2639c",
    storageBucket: "video-call-web-app-2639c.firebasestorage.app",
    messagingSenderId: "789998716818",
    appId: "1:789998716818:web:8cbde628966863dccda34b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


export const getUser = () => {
    return JSON.parse(localStorage.getItem("user")) || user;
};


// Function to save resume data
export const saveResume = async (resumeData) => {
    try {
        const docRef = await addDoc(collection(db, "resume"), resumeData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id; // Returns the auto-generated document ID
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

// Function to get saved resume data
export const getsavedResume = async (queryemail) => {
    const q = query(collection(db, "resume"), where("savedEmail", "==", queryemail));
    const querySnapshot = await getDocs(q);
    let resumeData = [];

    querySnapshot.forEach((doc) => {
        resumeData.push(doc.data());
    });

    return resumeData;
};

// Google Sign-In Function
export const signInWithGoogle = async () => {
    return await signInWithPopup(auth, provider);
};

// Google Logout Function
export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};

// Auth State Listener (Triggers on Login/Logout)
onAuthStateChanged(auth, (authUser) => {
    let user = {};
    if (authUser) {
        user.name = authUser.displayName;
        user.email = authUser.email;
        user.photoURL = authUser.photoURL;
        user.uid = authUser.uid;

        localStorage.setItem("user", JSON.stringify(user)); // Store in local storage
    } else {
        user.name = null;
        user.email = null;
        user.photoURL = null;
        user.uid = null;

        localStorage.removeItem("user"); // Clear storage on logout
    }
});

