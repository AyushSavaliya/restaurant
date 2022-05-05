const mongoose =  require("mongoose");
mongoose.connect("mongodb://localhost:27017/Restaurant").then(() => {
    console.log("connection is sucsseful");
}).catch(() =>{
    console.log("connection is not sucsseful");
});
