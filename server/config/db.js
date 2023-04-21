const mongoose=require('mongoose');
const connectdb= async ()=>{
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database Connected: ${conn.connection.host}`);
      } catch (error) {
        console.log(error);
      }
    }

module.exports=connectdb;