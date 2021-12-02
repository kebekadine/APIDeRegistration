import React from "react";
import Button from '@mui/material/Button';
import app from '../Style/app.css';
const Validator = require("validator");
const Axios= require ('axios');
class Home extends React.Component{
    constructor(props){
      super(props);
      this.state={
        pseudo:"",
        password:"",
        errors:{}
      };
      
    }
    onChange=(e)=>  {
      this.setState({[e.target.id]: e.target.value });
    };
    onSubmit= (e)=>{
      e.preventDefault();
      if (this.Validation()){
        const data= {
          pseudo:this.state.pseudo,
          password: this.state.password
        };
      
        
         Axios.post("/register", data)
        .then ((response)=>{ 
          if (response.data.message){
            alert(response.data.message);
          }
          else{
            alert("compte crée avec succes");
            window.location = "/";
          }
          
        })
        .catch((error)=>{
          console.log(error);
        })
        this.setState({
          pseudo:"",
          password:"",
          errors:{}
        });
    
      }
      else {
        console.log("erreur");
      }
    };
    onSubmitLogin= (e)=>{
      e.preventDefault();
      if (this.Validation()){
        const data= {
          pseudo:this.state.pseudo,
          password: this.state.password
        };
        Axios.post("/login", data)
        .then ((response) => {
          if (response.data.token){
            localStorage.setItem('token', response.data.token);
            alert("connexion effectuée avec succès");
            window.location.href="/users";
          }else {
            alert(response.data.username);
          }
        })
        .catch ((error) =>{
          console.log(error);
        })
        this.setState({
          pseudo:"",
          password:"",
          errors:{}
        });
    
      }
      else {
        console.log("erreur");
      }
    };
    Validation=()=>{
      console.log("valid");
      let mail= this.state.pseudo;
      let password= this.state.password;
      let error={};
      let formIsValid= true;
      if (!mail){
        formIsValid= false;
        error['pseudo']= "Ce champ ne peut pas être vide";
      }
      if (!Validator.isEmail(mail)){
        formIsValid= false;
        error['pseudo']= "Votre email n'est pas valide";
      }
      if (Validator.isEmpty(password)|| password=== ' '){
        formIsValid= false;
        error['password']= "Ce champ ne peut pas être vide";
      }
      this.setState({ errors: error });
      return formIsValid;
    };
    render(){
      return (
        <div className ="test">
        <div class="global">
          <div class="titre">
        <h1>Connexion</h1>
        </div>
        <form action="">
          <div class="">
            <div>
            <label htmlFor="pseudo">Pseudo: </label>
            </div>
            <div>
          <input type="text" id="pseudo"
          value={this.state.pseudo}
          onChange={this.onChange}
          />
          </div>
        <span style={{ color: "red" }}>{this.state.errors["pseudo"]}</span>
        </div>
        <br />
        <div class="">
        <div class="">
        <label htmlFor="password">Password:</label>
        </div>
       <div class="p-2">
       <input type="password" id="password"
       value={this.state.password}
       onChange={this.onChange}
        />
       </div>
        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
        </div>
          <br />
          <div class="boutons">
          <Button onClick={this.onSubmit} class="register">Register</Button>
          <Button class="register" onClick= {this.onSubmitLogin}>Log in</Button>
          </div>
          </form>
          </div>
          </div>
      );
    }


   
}
export default Home;