const { signup, login, getUsers, usersCount, adminLogin, deleteuser } = require("../controllers/AuthController");
const { signupValidation, loginValidation } = require("../middlewares/Authvalidation");

const router = require("express").Router();

router.post("/Login",loginValidation,login)
router.post("/Regster",signupValidation,signup)
router.get("/getUsers", getUsers);
router.get("/usersCount",usersCount);
router.post("/adminLogin",loginValidation,adminLogin)
router.delete("/deleteuser/:id",deleteuser);



module.exports=router;