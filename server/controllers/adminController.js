const User = require("../models/userModel");
const Updateuser =require('../models/updateuser');
const Review =require('../models/userReview');
const bcrypt = require('bcrypt')

const securePassword = async(password)=>{
    try {
        const passwordHash= await bcrypt.hash(password,10);
        return passwordHash;

    } catch (error) {
        console.log(error.message)
    }
}
const loadLogin =async(req,res)=>{
    try{
        res.render('login');
    }catch(error){
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
                if(userData.is_admin === 0){
                    res.render('login',{message:"Invalid Credentials"})
                }else{
                    req.session.user_id=userData._id;
                    res.redirect('/admin/home');
                }
            }else{
                res.render('login',{message:"Invalid Credentials"});
            }
        }else{
            res.render('login',{message:"Invalid Credentials"});
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loadDashboard=async(req,res)=>{
    try {
        const userData=await User.findById({_id:req.session.user_id})
        res.render('adminHome',{admin:userData});
    } catch (error) {
        console.log(error.message);
    }
}
const logout =async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/admin');
    } catch (error) {
        console.log(error.message);
    }
}

const adminDashboard =async(req,res)=>{
    try {
        const userData= await User.find({is_admin:0})
        res.render('dashboard',{users:userData});
    } catch (error) {
        console.log(error.message);
    }
}
const newUserLoad = async(req,res)=>{
    try {
        res.render('newuser');
    } catch (error) {
        console.log(error.message);
    }
}
const addUser = async(req,res)=>{
    try {
        const spassword = await securePassword(req.body.password);
        const user={
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mno,
            adhar:req.body.adhar,
            password:spassword,
            is_admin:0,
            is_verified:0,
            request_count:0
        }

        const userData = await User.insertMany([user]);
        if(userData){
            res.redirect('/admin/dashboard')
        }else{
            res.render('newuser',{message:"Something is wrong"})
        }
    } catch (error) {
        console.log(error.message);
    }
}
const editUserLoad = async(req,res)=>{
    try {
        const id=req.query.id;
        const userData= await User.findById({_id:id});
        if(userData){
            res.render('edit-user',{user:userData});
        }else{
            res.redirect('/admin/dashboard'); 
        }
        
    } catch (error) {
        console.log(error.message);
    }
}
const updateUsers = async(req,res)=>{
    try {
        const userData=await User.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mno,adhar:req.body.adhar,is_verified:req.body.verify}});
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async(req,res)=>{
    try {
        const id=req.query.id;
        await User.deleteOne({_id:id});
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error.message);
    }
}
const loadUpdate = async(req,res)=>{
    try {
        //const userDataOld=await User.findById({_id:req.session.user_id});
        const userDataNew = await Updateuser.find({sentrequest:1});
        res.render('updaterequest',{ users:userDataNew });

    } catch (error) {
        console.log(error.message);
    }
}
const updateYesLoad = async(req,res)=>{
    try {
        const id=req.query.id;
        const userDataOld= await User.findById({_id:id});
        const userDataNew= await Updateuser.findOne({userid:id});
        if(userDataNew){
            res.render('confirmupdate',{user:userDataNew,userold:userDataOld});
        }else{
            res.redirect('/admin/dashboard'); 
        }
        // const id=req.body.id;
        
        // // const newuser ={
        // //     name:req.body.name,
        // //     email:req.body.email,
        // //     mobile:req.body.mno,
        // //     adhar:req.body.adhar,
        // //     is_updat:0,
        // // }
        // const userData=await User.findByIdAndUpdate({_id:id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mno,adhar:req.body.adhar,is_updat:0}});
        // if(userData){
        //     await Updateuser.deleteOne({userid:id});
        //     res.redirect('/admin/dashboard');
        // }


    } catch (error) {
        console.log(error.message);
    }
}
const updateYes = async(req,res)=>{
    try {
        const userData=await User.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mno,adhar:req.body.adhar,is_update:0}});
        if(userData){
            await Updateuser.deleteOne({userid:req.body.id});
            res.redirect('/admin/dashboard');

        }
    } catch (error) {
        console.log(error.message);
    }
}

const updateNo = async(req,res)=>{
    try {
        const id=req.query.id;
        const userData = await User.findByIdAndUpdate({_id:id},{$set:{is_update:0}});
        await Updateuser.deleteOne({userid:id});
        res.redirect('/admin/dashboard');
        
    } catch (error) {
        console.log(error.message);
    }
}
const reviewLoad =async(req,res)=>{
    try {
        const userData= await Review.find()
        res.render('reviewpage',{users:userData});
    } catch (error) {
        console.log(error.message);
    }
}
module.exports={
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    adminDashboard,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUsers,
    deleteUser,
    loadUpdate,
    updateYesLoad,
    updateYes,
    updateNo,
    reviewLoad
}