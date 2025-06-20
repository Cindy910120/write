// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKW-WUC57Wa-JSrbikXQNHaXc5w99Kzso",
  authDomain: "test-af901.firebaseapp.com",
  projectId: "test-af901",
  storageBucket: "test-af901.firebasestorage.app",
  messagingSenderId: "305242945053",
  appId: "1:305242945053:web:681ce178cd638cd09678f4",
  measurementId: "G-7VKXPK3STD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Helper function to fetch articles
const fetchArticles = async (authorFilter: string, publishedOnly: boolean = true) => {
  try {
    const articlesRef = collection(db, "articles");
    
    // Create query based on parameters
    let queryConstraints: any[] = [where("author", "==", authorFilter)];
    
    if (publishedOnly) {
      queryConstraints.push(where("published", "==", true));
    }
    
    queryConstraints.push(orderBy("publishedAt", "desc"));
    
    const q = query(articlesRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);
    
    const articlesList: any[] = [];
    querySnapshot.forEach((doc) => {
      articlesList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return articlesList;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

// Helper function to get a specific article
const getArticleById = async (articleId: string) => {
  try {
    const docRef = doc(db, "articles", articleId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting article:", error);
    return null;
  }
};

export { 
  app, 
  analytics, 
  db, 
  fetchArticles,
  getArticleById,
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  getDoc, 
  doc,
  addDoc, 
  updateDoc,
  deleteDoc,
  serverTimestamp
};

export default defineNuxtPlugin(() => {
  // Plugin setup if needed
});
