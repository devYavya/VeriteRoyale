const mongoose = require("mongoose");

const mongo_url = process.env.DB;

mongoose.connect(mongo_url)
 .then(()=>
{
  console.log("Connected to database successfully")
})
.catch ((error) =>{
      console.log(error);
      console.log("could not connect to database");
      
    })

// module.exports = ()=>
// {
//     const connectionParamns = {
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//     };

//   try {
//     mongoose.connect(process.env.DB, connectionParamns)
//     
//   } catch (error) {
//     console.log(error);
//     console.log("could not connect to database");
    
//   }
   
// };