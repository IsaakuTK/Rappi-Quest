import {firebaseConfig} from "./firebaseConfig.js"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, addDoc, updateDoc, getDocs, query, orderBy } from "firebase/firestore";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);


export const createUserDB = async (user) => {
    try {
      // Referencia a la colección 'users'
      const usersRef = collection(db, "users");
      const newUserRef = doc(usersRef);
  
      // Generar el ID del usuario (si es necesario)
      const userId = newUserRef.id;
  
      // Obtener la fecha actual como una cadena de texto en formato ISO
      const createdAt = new Date().toISOString();
  
      // Guardar el usuario en la base de datos con el ID generado
      await setDoc(newUserRef, { ...user, id: userId, createdAt });

      console.log("User added successfull: ", user)
  
      return { ...user, id: newUserRef.id, createdAt };
    } catch (error) {
      console.error("Error adding user: ", error);
      return false;
    }
};
  
export const EditUserDB = async (user) => {
    try {
    const userRef = doc(db, "users", user.id); 
    await updateDoc(userRef, user); // Actualiza el documento con los nuevos datos

    console.log("User edited successfully");
    return true;
    } catch (error) {
    console.error("Error editing document: ", error);
    return false;
    }
};

export const getUsersDB = async () => {
    try {
      // Crear una consulta para ordenar los usuarios por 'score' de mayor a menor
      const q = query(collection(db, "users"), orderBy("score", "desc"));
  
      const querySnapshot = await getDocs(q);
      const transformed = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transformed.push({ id: doc.id, ...data });
      });
  
      return transformed;
    } catch (error) {
      console.error("Error getting users: ", error);
      return [];
    }
};

