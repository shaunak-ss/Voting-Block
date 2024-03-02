const express =require("express");
const admin_route= express();

const session=require("express-session");

const config = require("../config/config");
admin_route.use(session({secret:config.sessionSecret }));

admin_route.use(express.json());
admin_route.use(express.urlencoded({extended:true}))
admin_route.use(express.static( 'public' ))
admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');

const auth =require('../middleware/adminAuth')
const adminController = require("../controllers/adminController");

admin_route.get('/',auth.isLogout,adminController.loadLogin);
admin_route.post('/',adminController.verifyLogin);
admin_route.get('/home',auth.isLogin,adminController.loadDashboard);
admin_route.get('/logout',auth.isLogin,adminController.logout);

admin_route.get('/dashboard',auth.isLogin,adminController.adminDashboard);
admin_route.get('/newuser',auth.isLogin,adminController.newUserLoad);
admin_route.post('/newuser',adminController.addUser);
admin_route.get('/edit-user',auth.isLogin,adminController.editUserLoad);
admin_route.post('/edit-user',adminController.updateUsers);

admin_route.get('/delete-user',adminController.deleteUser);

admin_route.get('/updaterequest',auth.isLogin,adminController.loadUpdate);
admin_route.get('/update-yes',adminController.updateYesLoad);
admin_route.post('/update-yes',adminController.updateYes);
admin_route.get('/update-no',adminController.updateNo);
//admin_route.post('/update-yes',adminController.updateYes)
admin_route.get('/review-page',auth.isLogin,adminController.reviewLoad);
//keep this route at last
//this means if someone write localhost:5000/admin/dnadsbfb or anything infront of
// /admin/ then it will redirect to /admin only and change url to localhost:5000/admin
admin_route.get('*',function(req,res){
    res.redirect('/admin');
});

module.exports = admin_route;
