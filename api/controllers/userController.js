const UserRepository = require('../repositories/userRepository');
const jwt  = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

class UserController {

    async getUserCategories(req,res,next){
        const {city} = req.params;
        if(!city) return res.json({error:'no city provided'});
        const [data,error] =await UserRepository.getUsersPerLocation(city);
        return error?res.json({
            error:error.toString()
        }):res.json({
            data:data
        });
    }

     createUser=async(req,res,next)=>{
        const {phone} = req.body;
        const user = new User({
            phone
        });
        const [data,error ] = await awaitTo(user.save());
        return error?res.json({
            error:error.toString()
        }):res.json({
            data:{...data,jwtToken:this.generateJwtToken(phone,data._id)}
        });

    }


    async search(){

    }

    async getLoggedInUserDetails(req,res,next){
        const {phone} = req.userData;
        const [data,error] =await UserRepository.getUserByPhone(phone);
        return error?res.json({
            error:error.toString()
        }):res.json({
            data:data
        });
    }

    getCategory=async(req,res,next)=>{
        const {category} = req.params;
        const [data,error]=await UserRepository.getCategoryItems(category);
        return error?res.json({
            error:error.toString()
        }):res.json({
            data:data
        });
    }


    async updateUser(req,res,next){
        const [data,error] = await UserRepository.update(res.body,req.userData);
        return error?res.json({
            error:error.toString()
        }):res.json({
            data:data
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