import React, { useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { HandleFacebookSignOut, HandleFacebookSignIn, HandleGoogleSignIn, HandleGoogleSignOut, initializeFrameWorker, signInWithEmailAndPassword, createUserWithEmailAndPassword } from './LoginManager';

  initializeFrameWorker();
const Login = () => {

 const [loggedInUser,setLoggedInUser]= useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

const [user, setUser] = useState({
    isSingIn: false,
    name: '',
    email: '',
    photo: '',
    success: false,
    password: '',
    error: ''
})
const [newUser, setNewUser] = useState(false);

      //login and logout  google 
  const singInGoogle=()=>{
    HandleGoogleSignIn()
    .then(res => {
      HandleResponse(res,true)
    })
  }
  const singOutGoogle =()=>{
    HandleGoogleSignOut()
    .then(res => {
      HandleResponse(res,false)
    })
  }
  
                  // facebook login 
  const FacebookSignIn =()=>{
    HandleFacebookSignIn()
    .then(res => {
      HandleResponse(res,true)
    })
  }

  const FacebookSignOut =()=>{
        HandleFacebookSignOut()
        .then(res => {
          HandleResponse(res,false)
        })
  }
  

  // create account and submit

  const HandleBlur =(e)=> {
      const name = e.target.name;
      let isValid;
      if(name === "name"){
        isValid = /^\S/.test(e.target.value);
      }else if(name === "email"){
          isValid = /^\S+@\S+\.\S+$/.test(e.target.value);
      }else if(name === "password"){
        isValid = /^(?=.*\d)(?=.*[a-zA-Z])(?=.{6,})/.test(e.target.value)
      }
    if(isValid){
      const newValid = {...user};
      newValid[e.target.name] = e.target.value;
      setUser(newValid)
    }
  }
        // create account and sing in
  const submitHandler = (e) => {
         // create account
    if(newUser && user.email && user.password && user.name) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        HandleResponse(res,true)
      })
    }
            // sign in account
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword( user.email, user.password)
      .then(res => {
        HandleResponse(res,true)
      })
    }
    e.preventDefault();
  }

 const HandleResponse =(res,redirect)=>{
  setUser(res)
  setLoggedInUser(res)
  if(redirect){
    history.replace(from)
  }
 }
    return(
      <div style={{textAlign:"center"}}>
          {user.isSingIn ? <button onClick={singOutGoogle}>sign Out google</button> :
                          <button onClick={singInGoogle}>sign in google</button> }
          {user.isSingIn ? <button onClick={FacebookSignOut}>sign out facebook</button> : 
          <button onClick={FacebookSignIn}>sign in facebook</button>}
              {
        user.isSingIn && <div>
              <h2>Welcome {user.name} to your profile</h2>
              <p>Your email: {user.email}</p>
              <img src={user.photo} alt=""/>
        </div>
      }
  <br/><br/>
      <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)} id="newUser"/>
      <label htmlFor="newUser">Create a new account</label>
      <form action="" onSubmit={submitHandler}>
           {newUser && <input name="name" type="text" placeholder="enter your username" onBlur={HandleBlur} required/>}<br/>
            <input name="email" type="email" placeholder="enter your email" onBlur={HandleBlur} required/><br/>
            <input name="password" type="password" placeholder="enter your password" onBlur={HandleBlur} required/><br/>
            <input type="submit" value={newUser ? "sign up": "sign in"}/>
        </form>
            <p style={{color: "red"}}>{user.error}</p>
            {user.success && <p style={{color: "green"}}>you have {newUser? "create" : "Login"} successfully</p>}

      </div>
    )
}
export default Login;