const UserRepository = require('../repositories/userRepository');
const jwt  = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const User = require('../models/user');
const awaitTo=require('async-await-error-handling');
const mongoose = require('mongoose');



class UserController {

    async getUserCategories(req,res,next){
        const {city} = req.params;
        if(!city) return res.json({error:'no city provided'});
        const [error,data] =await UserRepository.getUsersPerLocation(city);
        return error?res.json({
            error:error.toString()
        }):res.json({
            data:data
        });
    }

     createUser=async(req,res,next)=>{
        const {phone} = req.body;
        const [error,data1] = await UserRepository.getUserByPhone(phone);
        if(error){
            return res.json({
                error:err.toString()
            });
        }
         if(data1.length>0){
             return res.json({
             data:{...data1[0]._doc,jwtToken:this.generateJwtToken(phone,data1[0]._id)}
         });
         }
        const user = new User({
            _id:new mongoose.Types.ObjectId(),
            phone
        });
        const [err,data] = await awaitTo(user.save());
        return err?res.json({
            error:err.toString()
        }):res.json({
            data:{...data._doc,jwtToken:this.generateJwtToken(phone,data._id)}
        });

    }


    async search(req,res,next){
        const {query} = req.params;
        const reEx = new RegExp(query);

        const qEx0={
            city: {$regex: reEx,  $options: "i"}
        }
        const qEx1={
            name: {$regex: reEx,  $options: "i"}
        }
        const qEx2={
            phone: {$regex: reEx,  $options: "i"}
        }
        const qEx3={
            workType: {$regex: reEx,  $options: "i"}
        }
        const qEx4={
            about: {$regex: reEx,  $options: "i"}
        }

       const [error,data] = await UserRepository.searchForRegExp([qEx0,qEx1,qEx2,qEx3,qEx4]);
        return error?res.json({
            error:error.toString()
        }):res.json({
            data:data
        });
    }

    async getLoggedInUserDetails(req,res,next){
        const {phone} = req.userData;
        const [error,data] =await UserRepository.getUserByPhone(phone);
        return error?res.json({
            error:error.toString()
        }):res.json({
            data:data
        });
    }

    getCategory=async(req,res,next)=>{
        const [error,data]=await UserRepository.getCategoryItems(req.params);
        return error?res.json({
            error:error.toString()
        }):res.json({
            data:{
                name:req.params.category,
                users:data
            }
        });
    }


    async updateUser(req,res,next){
        const [error,data] = await UserRepository.update(req.body,req.userData);
        return error?res.json({
            error:error.toString()
        }):res.json({
            data:data[0]
        });

    }


     generateJwtToken=(phone,id)=>{
        return jwt.sign({
            phone,
            id
        }, jwtConfig.secret);
    }

}

module.exports=new UserController();