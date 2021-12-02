import jwt from "jsonwebtoken";
import { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import DisplayAll from "./DisplayAll";
import Button from '@mui/material/Button';
const Axios= require ('axios');

const User = ()=>{
  const history = useHistory;
  const [user, getAllUsr] = useState("");
  //recuperation de la reponse venant du server
    function getUser(){
         Axios.get("/users",{ headers :{'x-access-token': localStorage.getItem('token')}})
        .then ((response)=>{ 
          getAllUsr(response.data);
        })
        .catch((error)=>{
          console.log(error);
        });
    } 
    //teste du token  
    useEffect(()=>{ 
      const token = localStorage.getItem('token');
      if(token){
        const user = jwt.decode(token);
        
        if (!user){
          localStorage.removeItem('token');
          history.replaceState("/");
        } else {
          getUser();
        }
      }
    }, []);
    let onSubmitLogOut = (e)=>{
      console.log("entre");
      e.preventDefault();
      localStorage.clear();
      window.location.href="/";
    }

    if (user !== ''){
    return(
      <div class="listuser">
<nav class="navbar navbar-expand-lg navbar-light bg-light ">  
<div class="container-fluid">
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <Button color="inherit" onClick= {onSubmitLogOut}>Deconnexion</Button>
        </li>
        
    </ul>
    <span class="navbar-text">
        Heureux de vous revoir !
      </span>
    </div>
  </div>
</nav>

      <p></p>
        <h1>Liste de tous les utilisateurs</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Pseudo</th>
            </tr>
          </thead>
          <tbody>
            <DisplayAll user ={user}/>
          </tbody>
        </table>  
      </div>
  );
    }
    else {
      return (
      <div><p>Token introuvable</p></div>
      );
    }   
}
export default User;