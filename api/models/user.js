const mongoose =require('mongoose');


const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String},
    phone:{type:String,required:true},
    profilePicUrl:{type:String},
    city:{type:String},
    available:{type:Boolean,default:true},
    experience:{type:Number},
    workType:[String],
    about:{type:String}
});

module.exports=mongoose.model('User',userSchema);

