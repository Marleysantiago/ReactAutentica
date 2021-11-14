import { useState } from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import './App.css';
import {auth} from './firebase-config'

function App() {

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
  })

  const registar = async ()=>{
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user)
    } catch(error) {
      console.log(error.message)
    }
    
  }

  const login = async ()=>{
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(user)
    } catch(error) {
      alert("Ops, parece que alguma coisa deu errado "+ error.message)
      
    }
  }

  const sair = async ()=>{
    await signOut(auth)
  }

  return (
    <div className="App">
      <div>
        <h3>Registar usuario</h3>
        <input placeholder="Email..." onChange={(event) =>{setRegisterEmail(event.target.value)}}></input>
        <input placeholder="Senha..." onChange={(event) =>{setRegisterPassword(event.target.value)}}></input>

        <button onClick={registar}>Criar Usuario</button>
      </div>

      <div>
        <h3>Login</h3>
        <input placeholder="Email..." onChange={(event) =>{setLoginEmail(event.target.value)}}></input>
        <input placeholder="Senha..." onChange={(event) =>{setLoginPassword(event.target.value)}}></input>
        <button onClick={login}>Login</button>
      </div>

      <h4>Sair da conta</h4>
      {user?.email}
      <button onClick={sair}>Sair</button>
    </div>
  );
}

export default App;
