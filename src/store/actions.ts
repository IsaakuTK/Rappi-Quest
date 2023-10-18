import { User } from "../types/user";
import {  EditProfileAction, LoginAction, LogoutAction, NavigationAction, NavigationActions, NewUserAction, Screens, SetUserCredentialsAction, SomeActionsofls, UserActions } from "../types/store";
//import firebase from "../utils/firebase";
import { appState } from ".";
import { onAuthStateChanged } from "firebase/auth";

export const navigate = (screen:Screens): NavigationAction =>{
  return{
      action: NavigationActions.NAVIGATE,
      payload: screen,
  }
}


export const setUserCredentials = (user: string): SetUserCredentialsAction => {
return {
    action: UserActions.SETUSERCREDETIALS,
    payload: user,
  }
}

export const newUser = (user:User): NewUserAction =>{
  navigate(Screens.DASHBOARD)
  return{
      action: UserActions.NEWUSER,
      payload: user,
  }
}

export const LogOut =  (): LogoutAction =>{

  if(appState.userCredentials !==null || ''){
  navigate(Screens.LOGIN)
  setUserCredentials('')  
  sessionStorage.clear()
  localStorage.clear()

    appState.user={
        uid: "",
      username: "",
      image: "",
    }    
  
}

  return{
      action: UserActions.LOGOUT,
      payload: undefined,
  }
}

// export const getUs = async (): Promise<LoginAction> =>{
//   onAuthStateChanged
//   const user = await firebase.GetUser()
//   navigate(Screens.DASHBOARD)
//   return{
//       action: SomeActionsofls.LOGIN,
//       payload: user,
//   }
// }

// export const editProfile = async (user:User): Promise<EditProfileAction> =>{

//   await firebase.EditProfile(user)

//   return{
//       action: UserActions.EDIT,
//         payload: user,
//     }
// }