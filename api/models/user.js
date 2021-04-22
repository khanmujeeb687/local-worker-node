const mongoose =require('mongoose');


const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String},
    phone:{type:String,required:true},
    profilePicUrl:{type:String},
    city:{type:String},
    available:{type:Boolean,default:true},
    experience:{type:Number,default:0},
    workType:{type:[String]},
    about:{type:String,default:'Hey there! I am willing to work!'}
});

module.exports=mongoose.model('User',userSchema);

