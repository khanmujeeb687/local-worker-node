const User = require('../models/user');
const awaitTo = require('async-await-error-handling');
const types = require('../values/constants');

class userRepository {


     getUsersPerLocation=async(city)=>{
        const [error,data] = types.store[city]?['',types.store[city]]:await awaitTo(User.find({city}).exec());
        types.store[city]=data || types.store[city];
        return [error,data];
    }


    getUserByPhone = async(phone)=>{
         return awaitTo(User.find({phone}).exec());
    }


    getCategoryItems=async({category,city})=>{
         return awaitTo(User.find({workType:category,city}).exec());
    }

    update=async(data,{id,phone})=>{
         console.log(data,id);
         await User.findByIdAndUpdate(id,{...data}).exec();
         return this.getUserByPhone(phone);
    }

    searchForRegExp=async(reg)=>{
         const promises=[];
         for(let i =0;i<reg.length;i++){
             const data = awaitTo(User.find(reg[i]).exec());
             promises.push(data);
         }
         const resData = await Promise.all(promises);
         let rep=[];
         for(let j=0;j<resData.length;j++){
             if(resData[j].length>0)
                rep = rep.concat(resData[j][1]);
         }
         return ['',rep];
    }

}

module.exports = new userRepository();