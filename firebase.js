import {firebaseConfig} from "./firebaseConfig.js"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, addDoc, updateDoc, getDocs, query, orderBy, where } from "firebase/firestore";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);


export const createUserDB = async (user) => {
  try {

    const usersRef = collection(db, "users");

    const nombreQuery = query(usersRef, where('nombre', '==', user.nombre));
    const correoQuery = query(usersRef, where('correo', '==', user.correo));
    const [nombreResults, correoResults] = await Promise.all([getDocs(nombreQuery), getDocs(correoQuery)]);

    if (!nombreResults.empty) {
      console.error("Error adding user: Duplicate name");
      return false;
    }

    if (!correoResults.empty) {
      console.error("Error adding user: Duplicate email");
      return false;
    }

    // Si no hay duplicados, procede a agregar el usuario
    const newUserRef = doc(usersRef);

    // Generar el ID del usuario (si es necesario)
    const userId = newUserRef.id;

    // Obtener la fecha actual como una cadena de texto en formato ISO
    const createdAt = new Date().toISOString();

    // Guardar el usuario en la base de datos con el ID generado
    await setDoc(newUserRef, { ...user, id: userId, createdAt });

    console.log("User added successfully: ", user);

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

export async function existUser(user) {
  try {
    const userRef = doc(db, "users", user.nombre); 


    userRef.forEach((userDoc) => {
      // Verificar si el usuario tiene un campo "nombre"
      if (userDoc.exists && userDoc.data().nombre) {
        const nombreUsuario = userDoc.data().nombre;

        // Contar la ocurrencia del nombre en el objeto nombresCount
        nombresCount[nombreUsuario] = (nombresCount[nombreUsuario] || 0) + 1;
      }
    });
    return true;
    } catch (error) {
    console.error("Error editing document: ", error);
    return false;
    }
}

