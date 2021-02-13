import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';


export const initializeFrameWorker = () =>{
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
}

export const HandleGoogleSignIn = ()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
      return  firebase.auth().signInWithPopup(googleProvider)
        .then(res =>{
          const {displayName, email,photoURL} = res.user ;
          const singInUser= {
            isSingIn:true,
            name: displayName,
            email: email,
            photo: photoURL,
            success: true,
          }
          return singInUser
    
        })
        .catch(err =>{console.log(err.message)})
      }
export const HandleGoogleSignOut =()=>{

      return  firebase.auth().signOut().then(() => {
          const signOutUser ={
            isSingIn: false,
            name: '',
            email: '',
            photo: '',
          }
          return signOutUser ;
        })
        .catch((error) => {
          console.log(error.message);
        });
      }
                //Facebook login log out
export const HandleFacebookSignIn= () =>{
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
return firebase.auth().signInWithPopup(facebookProvider)
    .then(result => {
        const user = result.user;
        const {displayName, email, photoURL} = user;
        const FbUser ={
        isSingIn: true,
        name: displayName,
        email: email,
        photo: photoURL
        }
        return  FbUser;
    })
    .catch(error => {
        console.log(error.message);
    })
    }

export const HandleFacebookSignOut = () =>{
    return firebase.auth().signOut()
        .then(res => {
          const FbUser = {
            isSingIn: false,
            name: '',
            email: '',
            photo:'',
          }
          return FbUser;
        }).catch((error) => {
          console.log(error.message);
        });
      }


export const createUserWithEmailAndPassword =(name, email, password) =>{
  return  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.success = true;
        newUserInfo.error = '';
        UpdateUserInfo(name)
        return newUserInfo;
      })
      .catch(error => {
        const newUserInfo = {};
        newUserInfo.success = false;
        newUserInfo.error = error.message;
        return newUserInfo;
      });
}

export const signInWithEmailAndPassword = (email, password) =>{
   return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '' ;
        newUserInfo.success = true ;
       return newUserInfo;
      })
      .catch(error => {
        const newUserInfo = {} ;
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
        
      });
}

const UpdateUserInfo =(name)=>{
    var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(res=> {
            console.log("Update successful",res)
        }).catch(error=> {
            console.log(error.message);
        });
    }
