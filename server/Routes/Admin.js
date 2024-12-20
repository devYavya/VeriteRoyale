const router = require("express").Router();
const {Admin,validate} = require("../modles/Admin");
const bcrypt = require("bcrypt");


router.post("/",async(req,res)=>
{
    try {
        const{error}=validate(req.body);
        if(error)
             return res.status(400).send({message:error.details[0].message});
            const admin = await Admin.findOne({email:req.body.email});
            if(admin)
                return res.status(409).send({message:"Admin with given email already exist"});


            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hashSync(req.body.password.salt);


            await new Admin({...req.body, password:hashPassword}).save();
            res.status(201).send({message:"Welcome to Verite Royale"})


    } catch (error) {

        res.status(500).send({message:"OOPS! looks like Something is wrong!!"});
        
    }
} )