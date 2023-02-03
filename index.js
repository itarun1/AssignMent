const express=require("express")
const app=express();
const inventoryRoute=require("./controller/Inventory.controller.js");
const connect=require("./connect/connect.js")
// Middleware
app.use(express.json());

// Route
app.use('/inventory', inventoryRoute);

app.listen("1234",async()=>{
    try {
        await connect()
        console.log("Listening to the port 1234")
    } catch (error) {
        console.log(error)
    }
})