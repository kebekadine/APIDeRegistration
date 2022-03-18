const express = require("express");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const userSchema = require('../../models/userSchema');
const db = require("../../models/db");
var cors = require('cors')
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())
app.use(express.static("public"));

app.set('view engine');

const UserModel = mongoose.model('userSchema', userSchema);

/*
* essaie de creer un utilisateur si il n'est pas deja present dans la bdd
*/

router.post('/register', function(req, res) {
    UserModel.findOne({username : req.body.pseudo}).then((user)=>{
            //veriefie l'existence dans la bdd
            if (user) { 
                console.log("Votre email existe deja");
                res.json({ message: 'Cette adresse existe dejà.' })
            }
            else {
                //cree un user 

                const newUser = new UserModel({ 
                        username : req.body.pseudo,
                        password : req.body.password
                    });

                //hash le mot de passe et insere dans la bdd l'utilisateur

                bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (error, newPassword)=>{
                    if (error) {
                        throw error;
                    } else {
                        newUser.password = newPassword
                        newUser.save()
                        .then((result) =>{
                            res.json(result)
                        })
                        .catch(err => console.log(err));
                        
                    }
                })
            });
            }
        })
});

/*
*
*essaie de connecter un utilisateur si identifiant incorect.
*/
router.post("/login", (req, res)=>{
    //recherche l'utilisateur
    UserModel.findOne({username:req.body.pseudo}).then((user)=>{

        if (!user) { 
            console.log("Votre email n'existe pas");
            res.json({ username: 'Cette adresse est inexistante.', statut:"non ok" })
        }
        else{
            //comparaison du mot de passe saisi et celui de la bdd
            bcrypt.compare(req.body.password, user.password, (err, result)=>{
                if (result){
                    //creation du token
                    jwt.sign({
                        username: user.username,
                        password: user.password
                        },
                        '2021Kebe', 
                        {expiresIn: 3600}, 
                            (err, token) =>{
                                if (err) throw err;
                                //res.headers('x-access-token',token); 
                                res.json({ token : token, username:user.username});
                            });

                    }
                    else{
                        res.json({username: "mot de passe ou identifiant incorrect"});
                    }
                })
            }

});
});

//recupere la liste de tout les utilisateurs si token valable
app.get("/users", (req, res) =>{
    const token = req.headers['x-access-token'];
    
    if (token){
    const decodedToken = jwt.verify(token, '2021Kebe', (err, decode)=>{
        if (err) {
            res.json({message: "Pas d'autorisation trouvée"});
        }
        else {

            UserModel.find().then((user)=>{
            if (!user) { 
                return res.json({ username: 'Aucun utilisateur dans la base de données.' })
            }
            else {
                res.send(user);

            }
        });
        }
    });
}
else{
    res.json({message: "Token introuvable"});
}
    
  }); 

app.post("/logout", (req, res)=>{
    localStorage.clear();
    req.session.destroy();
    res.json({message: "Deconnecter"});
})


app.use(router);
app.listen(5000);
module.exports = router;
