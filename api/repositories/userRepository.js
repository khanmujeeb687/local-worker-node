const User = require('../models/user');
const awaitTo = require('async-await-error-handling');
const types = require('../values/constants');

class userRepository {


     getUsersPerLocation=async(city)=>{
        const [data,error] = this.getStoreDataForCity(city) ||  await awaitTo(User.find({city}).exec());
        types.store[city]=data || types.store[city];
        return [data,error];
    }

     getStoreDataForCity=async(city)=>{
        return [types.store[city],''];
    }


    getUserByPhone = async(phone)=>{
         return awaitTo(User.find({phone}).exec());
    }


    getCategoryItems=async(workType)=>{
         return awaitTo(User.find({workType}).exec());
    }

    update=async(data,{id,phone})=>{
         await User.findByIdAndUpdate(id,{...data}).exec();
         return this.getUserByPhone(phone);
    }

}

module.exports = new userRepository();