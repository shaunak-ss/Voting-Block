const express =require("express");
const user_route =express();
const session=require("express-session")
const config=require("../config/config");
user_route.use(session({secret:config.sessionSecret }));

const auth = require("../middleware/auth");
//var path = require('path');

user_route.use(express.json());
user_route.use(express.urlencoded({extended:true}))
user_route.use(express.static( 'public' ))
user_route.set('view engine','ejs');
user_route.set('views','./views/users');
//user_route.set('views', path.join(__dirname, 'views'));
//user_route.engine('html', require('ejs').renderFile);
//user_route.set('view engine', 'html');

const bodyParser = require('body-parser');


const userController=require("../controllers/userController");

user_route.get('/register',auth.isLogout,userController.loadRegister);

user_route.post('/register',userController.insertUser);

user_route.get('/login',auth.isLogout,userController.loginLoad);
user_route.post('/login',userController.verifyLogin);

user_route.get('/home',auth.isLogin,userController.loadHome);
user_route.get('/logout',auth.isLogin,userController.userLogout);

user_route.get('/edit',auth.isLogin,userController.editLoad);
user_route.post('/edit',auth.isLogin,userController.updateUser)
user_route.get('/vote',auth.isLogin,userController.voteLoad);
user_route.get('/about',userController.aboutLoad);
user_route.post('/about',userController.aboutSave);
//user_route.get('/test',auth.isLogin,userController.testLoad);
user_route.get('/verify',userController.verifyMail);
module.exports = user_route;