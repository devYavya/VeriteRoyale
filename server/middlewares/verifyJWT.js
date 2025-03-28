const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    if(!authHeader) return res.status(401).json({msg:"auth header not found"});
    if(authHeader.startsWith("Bearer")){
        authHeader = authHeader.split(" ")[1];
    }
    const token = authHeader;
    jwt.verify(
        token,
        process.env.JWTPRIVATEKEY,
        (err, decoded) => {
            if (err) console.log("JWT Error");
            if (err) return res.sendStatus(403); 
            // console.log(decoded)// forbidden
            req.user = decoded;
            next();
        }
    )
}

module.exports = {verifyJWT};