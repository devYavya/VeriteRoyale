const router = require("express").Router();
const {User,validate} = require("../modles/User");
const bcrypt = require("bcrypt");


router.post("/",async(req,res)=>
{
    try {
        const{error}=validate(req.body);
        if(error)
             return res.status(400).send({message:error.details[0].message});
            const user = await User.findOne({email:req.body.email});
            if(user)
                return res.status(409).send({message:"User with given email already exist"});


            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hashSync(req.body.password.salt);


            await new User({...req.body, password:hashPassword}).save();
            res.status(201).send({message:"Welcome to Verite Royale"})


    } catch (error) {

        res.status(500).send({message:"OOPS! looks like Something is wrong!!"});
        
    }
} )