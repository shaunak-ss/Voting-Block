const User = require('../models/userModel');
const Updateuser =require('../models/updateuser');
const Review =require('../models/userReview');
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
//var ls = require('local-storage');
//const { get, increment ,decrement } = require('../../src/activeuser.js');
//const activeuser = require('../../src/activeuser.js');
const securePassword = async(password)=>{
    try {
        const passwordHash= await bcrypt.hash(password,10);
        return passwordHash;

    } catch (error) {
        console.log(error.message)
    }
}
const sendVerifyMail  =async(name,email,user_id)=>{
    try {
        const transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:'samshukla1211@gmail.com',
                pass:'cmcearayyiglluxw'
            }
        });
        const mailOptions = {
            from:'samshukla1211@gmail.com',
            to:email,
            subject:'For Email verification',
            html:'<p> Hii '+name+', please click here to <a href="http://localhost:3002/verify?id='+user_id+'">Verify </a> your mail.</p>'
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log("EMail has been sent:- ",info.response);
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}
const loadRegister = async(req,res)=>{
    try{
        res.render('registration');
    }catch(error){
        console.log(error.message);
    }
}

const insertUser = async(req,res)=>{
    try{
        const spassword = await securePassword(req.body.password);
        const user={
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mno,
            adhar:req.body.adhar,
            password:spassword,
            is_admin:0,
            is_verified:0,
            is_update:0,
            request_count:0,
        }

        const userData = await User.insertMany([user]);
        const userid= await User.findOne({email:req.body.email});
        if(userData){
            //console.log(userid._id);
            sendVerifyMail(req.body.name, req.body.email,userid._id);
            res.render('registration',{message:"Registration is successful, Please Verify email"})
        }else{
            res.render('registration',{message:"Registration is Failed"})
        }
    }catch(error){
        console.log(error.message);
    }
}
const verifyMail=async(req,res)=>{
    try {
        const updateInfo = await User.updateOne({_id:req.query.id},{$set:{is_verified:1} });
        console.log(updateInfo)
        res.render("email-verified");
    } catch (error) {
        console.log(error.message);
    }
}
// login use methods
const loginLoad = async(req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin =async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;

        const userData= await User.findOne({email:email});
        if(userData){
            const passwordMatch= await bcrypt.compare(password,userData.password);
            if(passwordMatch){
                if(userData.is_verified === 0){
                    res.render('login',{message:"Please Verify Your Email."})
                }else{
                    req.session.user_id=userData._id;
                    //increment();
                    //localStorage.setItem("activeuser",'1');
                    //ls.set("activeuser",'1');
                    res.redirect('/home');
                    
                }
            }else{
                res.render('login',{message:"Invalid Credentials"});
            }
        }else{
            res.render('login',{message:"Invalid Credentials"});
        }
    } catch (error) {
        console.log(error.message)
    }
}
const loadHome= async(req,res)=>{
    try {
        const userData = await User.findById(req.session.user_id);
        res.render('home',{user:userData});
    } catch (error) {
        console.log(error.message);
    }
}
const userLogout=async(req,res)=>{
    try {
       req.session.destroy();
       //decrement();
       //ls.clear();
       res.redirect('/login');
    } catch (error) {
        console.log(error.message);
    }
}

//user profile
const editLoad =async(req,res)=>{
    try {
        const id = req.query.id;
        const userData = await User.findById({_id:id});
        const userDataNew = await Updateuser.findOne({userid:id});
        
        
        if(userData){
            res.render('edit',{ user:userData , usernew:userDataNew });
        }else{
            res.redirect('/home');
        }
    } catch (error) {
        console.log(error.message);
    }
}

//vote
const voteLoad=async(req,res)=>{
    try {
        res.render('vote')
    } catch (error) {
        console.log(error.message);
    }
}
// const testLoad=async(req,res)=>{
//     try {
//         res.sendFile("vote.html");
//     } catch (error) {
//         console.log(error.message);
//     }
// }
const updateUser=async(req,res)=>{
    try {
        const id = req.query.id;
        const userDataOld = await User.findByIdAndUpdate({_id:req.body.id},{$set:{is_update:1}});
        const userdataold1 = await User.updateOne({_id:req.body.id},{$inc:{request_count: 1}});
        const usernew={
            userid:req.body.id,
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mno,
            sentrequest:1,
        }
        const userData = await Updateuser.insertMany([usernew]);
        if(userData){
            res.render('home',{user:userDataOld , usernew:userData});
            
        }
        else{
            res.redirect('/home');
        }
    } catch (error) {
        console.log(error.message);
    }
}
// const actuser = () =>{
//     activeuser=1;
// }
const aboutLoad=async(req,res)=>{
    try {
        res.render('about')
    } catch (error) {
        console.log(error.message);
    }
}
const aboutSave=async(req,res)=>{
    try {
        const user_review = {
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mno,
            rev:req.body.comment,
            
        }
        const userData = await Review.insertMany([user_review]);
        if(userData){
            res.render('about',{message:"Feedback is sent"})
        }else{
            res.render('about',{message:"Feedback was not sent"})
        }
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editLoad,
    voteLoad,
    updateUser,
    verifyMail,
    aboutLoad,
    aboutSave
    //actuser 
}