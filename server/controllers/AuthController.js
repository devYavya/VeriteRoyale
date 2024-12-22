const bcrypt = require('bcrypt');
const UserModel = require('../modles/User');
const jwt = require('jsonwebtoken');
const AdminModel = require('../modles/Admin');
const { sendMail } = require('../Mail/Mail');


const signup = async(req,res)=>
{
    try {
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user)
        {
            return res.status(409)
            .json({message: "You are already connected with us!!", sucess: false});
        }
        const userModel = new UserModel({name, email, password});
        userModel.password =  await bcrypt.hash(password,10);
        await userModel.save();
        const emailContent = `
            Dear ${name},

            We are absolutely delighted to welcome you to the Royale Verite community!
            Thank you for choosing us to accompany you on your journey into the world of luxury fragrances.

            What to Expect:

                Exclusive Offers: As a valued member, you will receive special promotions and discounts tailored just for you.

                Insider Tips: Stay tuned for expert advice on how to choose and wear our exquisite perfumes to enhance your personal style.

                New Arrivals: Be the first to know about our latest fragrance launches and collections.

            Getting Started:

                To help you dive into our luxurious offerings, we recommend checking out:

                    Our Bestsellers: Discover the fragrances that our customers adore. https://veriteroyale.netlify.app/Fragrances
                    Fragrance Guide: Learn about different scent families and find your perfect match. [Link to guide]
                    Join Our Community: Connect with fellow fragrance enthusiasts on our social media platforms. [Links to social media]

            If you have any questions or need assistance, please don’t hesitate to reach out. Our dedicated team is here to ensure you have an exceptional experience with Royale Verite.

            Once again, welcome! We can’t wait for you to explore our luxurious scents and find the perfect fragrance that resonates with you.



            Warm regards,
            Royale Verite Team
        `;
        sendMail(email,"Welcome to the Royale Verite Family!", emailContent)
        
        const jwttoken = jwt.sign({email: userModel.email, _id: userModel._id},
            process.env.JWTPRIVATEKEY,
            {expiresIn:'24h'}
        )

    res.status(201)
    .json({
        message: "Welcome to Verite Royale..", 
        sucess: true,
        jwttoken,
        email,
        name:userModel.name,
        userId:userModel._id
        })
        
    } catch (error) {
        console.log(error);
        res.status(500)
        .json({message: "OOPS! something went Wrong", 
            sucess: false})
        
    }
}


const login = async(req,res)=>
    {
        
        try {
            
            const { email, password} = req.body;
            const user = await UserModel.findOne({email});
            const errormsg='OOPS! credentials are wrong ';
            // console.log("login")
            if(!user)
            {
                return res.status(403)
                .json({message: errormsg, sucess: false});
            }
            const isPassEqual = await bcrypt.compare(password, user.password);
                if(!user || !isPassEqual)
                {
                    return res.status(403)
                    .json({message: errormsg, sucess: false});
                }
                const jwttoken = jwt.sign({email: user.email, _id: user._id},
                    process.env.JWTPRIVATEKEY,
                    {expiresIn:'24h'}
                )

            res.status(201)
            .json({
                message: "Welcome to Verite Royale..", 
                sucess: true,
                jwttoken,
                email,
                name:user.name,
                userId:user._id
                })
            
        } catch (error) {
            res.status(500)
            .json({message: "OOPS! something went Wrong", 
                sucess: false})
            
        }
    }

    const resetPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    message: "User with this email does not exist",
                    success: false
                });
            }
            const resetToken = jwt.sign(
                { userId: user._id },
                process.env.JWTPRIVATEKEY,
                { expiresIn: '1h' }
            );

            
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            await user.save();

            const resetUrl = `https://verite-royale.netlify.app/reset-password/confirm${resetToken}`;

            

           const emailContent = `
                    Password Reset Request
                    Please click on the following link to reset your password:
                    ${resetUrl}
                    This link will expire in 1 hour.
                    If you did not request this, please ignore this email.

                    Regards,
                    Team Verite Royale.
                `;
            

            sendMail(email,"Password Reset Link!", emailContent)

            res.status(200).json({
                message: "Password reset link sent to email",
                success: true
            });

        } catch (error) {
            res.status(500).json({
                message: "Error sending password reset email",
                success: false
            });
        }
    }

    const resetPasswordConfirm = async (req, res) => {
        try {
            const { token, newPassword } = req.body;

            const user = await UserModel.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });

            if (!user) {
                return res.status(400).json({
                    message: "Password reset token is invalid or has expired",
                    success: false
                });
            }

            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            res.status(200).json({
                message: "Password has been reset successfully",
                success: true
            });

        } catch (error) {
            res.status(500).json({
                message: "Error resetting password",
                success: false
            });
        }
    }

    const getUsers = async (req, res) => {
        try {
          const users = await UserModel.find().select('-password');
          res.status(200).json({ message: "Users retrieved successfully", success: true, users });
        } catch (error) {
          res.status(500).json({ message: "Error retrieving users", success: false });
        }
      }
      const deleteuser = async (req, res) => {
        try {
            const userId = req.params.id;
            const deleteusers = await user.findByIdAndDelete(userId);
    
            if (!deleteusers) {
                return res.status(404).json({ msg: "User not found" });
            }
    
            res.status(200).json({ msg: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

      
      const usersCount = async(req, res) =>
        {
            try{
                const count = await UserModel.countDocuments();
                res.status(200).json({ count: count });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

        // const secretKey = process.env.SECRET_KEY || 'secretkey';

        const adminLogin = async(req,res)=>
            {
                try {
                    const { email, password} = req.body;
                    const admin = await AdminModel.findOne({email});
                    const errormsg='OOPS! credentials are wrong ';
                    if(!admin)
                    {
                        return res.status(403)
                        .json({message: errormsg, sucess: false});
                    }
                    const isPassEqual = (password === admin.password);
                        if(!admin || !isPassEqual)
                        {
                            return res.status(403)
                            .json({message: errormsg, sucess: false});
                        }
                        const jwttoken = jwt.sign({email: admin.email, _id: admin._id},
                            process.env.JWTPRIVATEKEY,
                            {expiresIn:'24h'}
                        )
        
                    res.status(201)
                    .json({
                        message: "Welcome to Verite Royale..", 
                        sucess: true,
                        jwttoken,
                        email
                        })
                    
                } catch (error) {
                    res.status(500)
                    .json({message: "OOPS! something went Wrong", 
                        sucess: false})
                    
                }
            }



module.exports={
    signup,
    login,
    getUsers,
    usersCount,
    adminLogin,
    deleteuser,
    resetPassword,
    resetPasswordConfirm
}