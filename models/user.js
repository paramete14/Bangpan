const mongoose =require('mongoose');
const crypto =require("crypto");
const uuidv1 =require("uuid/v1");
const userShema =new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        minlength:2,
        maxlength:32
    },
    
    email:{
        type:String,
        trim:true,
        required:true,
        unique:32
    },
    hashed_password:{
        type:String,
        required:true,

    },firstname:{
        type:String,
        trim:true,
        required:true,
        minlength:2,
        maxlength:32
    },
    middlename:{
        type:String,
        trim:true,
        required:false,
        minlength:2,
        maxlength:32,
        default:''
    },
    lastname:{
        type:String,
        trim:true,
        required:true,
        minlength:2,
        maxlength:32
    },
    about:{
        type:String,
        trim:true,
    },
    salt:String,
    role:{
        type:Number,
        trim:true,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }

},{timestamps:true})