const express= require('express');
const mongoose = require ('mongoose');
const devuser = require('./devusermodel')
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const review = require('./reviewmodel');
const CompanySchema = require('./companymodel')
const cors = require('cors');

const app = express();


mongoose.connect("mongodb+srv://Gouthami:mongodbatlas@cluster0.sqau5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    }).then(
        ()=>console.log("Db Connected")
    
    )
app.use(express.json())
app.use(cors({origin: "*"}));

app.get('/',(req,res)=>{
    return res.send("Mern Stack")
})

app.post('/register',async(req,res)=>{
    
        const {fullname,email,mobile,skill,password,confirmpassword} = req.body;
        try{
        const exist = await(devuser.findOne({email}));
        if(exist){
            return res.status(400).send("User Already Exist")
        }
        if(password != confirmpassword){
            return res.status(403).send("password Invalid")
        }
        let newUser = new devuser({
            fullname,email,mobile,skill,password,confirmpassword    
        })
        newUser.save();
        return res.status(200).send("User Registered");

    }catch(err)
    {
        console.log(err);
        return res.status(500).send("Server Error")
    }
})

app.post('/login', async(req,res) =>{
    
        const{email,password} = req.body;
        try{
        const exist = await devuser.findOne({email});
        if(!exist){
            return res.status(400).send("User Not Exist")
        }
        if(exist.password != password){
            return res.status(400).send("password Invalid")
        }
        let payload={
            user:{
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token) => {
            if(err) throw err
            return res.json({token})
        })
    }
    catch(err){
    console.log(err);
    return res.status(500).send("Server Error");
}
})
app.get('/allprofiles',middleware, async(req,res)=>{
    try{
        let allprofiles =await devuser.find();
        return res.json(allprofiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error")
    }
})
app.get('/myprofile',middleware, async(req,res)=>{
    try{
        let user = await devuser.findById(req.user.id);
        return res.json(user);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error")
    }
})

app.post('/addreview',middleware,async(req,res)=>{
    try{
        const {taskworker,rating} = req.body;
        const exist = await devuser.findById(req.user.id)
        const newReview = new review({
            taskprovider:exist.fullname,
            taskworker,rating
        })
        newReview.save();
        return res.status(200).send("Review Updated Successfully")

    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error")
    }
})
app.get('/myreview', middleware,async(req,res)=>{
    try{
        let allreviews = await review.find();
        let myreviews = allreviews.filter(review=>review.taskworker.toString() === req.user.id.toString());
        return res.status(200).json(myreviews);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error")
    }
})
app.post('/addcompany',async(req,res)=>{
    const {companyname,streetaddress,city,state,zipcode,website,phone, sectorofexpertise,companysummary,
        companylogo,linkedin,facebook,branch,accountmanager, recruiter,competitor} = req.body;

    try{
        const newCompany = new CompanySchema({
            companyname,
            streetaddress,
            city,
            state,
            zipcode,
            website,
            phone,
            sectorofexpertise,
            companysummary,
            linkedin,
            facebook,
            branch,
            accountmanager,
            recruiter,
            competitor

        })

         await newCompany.save();
        return res.json  (await CompanySchema.find())
}
    catch(err){
        console.log(err);
        return res.status(500).send("server error")
    }
})

app.get('/getcompany',async(req,res)=>{
    try{
        return res.json(await CompanySchema.find())
    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error")
    }
})

app.get('/getcompany/:id',async(req,res)=>{

    try{

       const Data= await  CompanySchema.findById(req.params.id);

        return res.json(Data)

    }

    catch(err){

        console.log(err.message);

    }

})

app.delete('/deletecompany/:id',async(req,res)=>{
    try{
        await CompanySchema.findByIdAndDelete(req.params.id);
        return res.json(await CompanySchema.find())
    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error")
    }
})

app.put('/editcompany/:id',async(req,res,next)=>{

    try{

        await CompanySchema.findByIdAndUpdate(req.params.id, {...req.body})

        const resp =await CompanySchema.findOne({ _id: req.params.id})
  
       res.json(resp);

   

   }

    catch(err){

        console.log(err.message);

    }

})

// app.put("/updatecompany",async(req,res)=>{
// try{
//     await CompanySchema.findByIdAndUpdate(req.body.id, 
//         { companyname: req.body.companyname, streetaddress: req.body.streetaddress, city: req.body.city, state:req.body.state, zipcode:req.body.zipcode,website:req.body.website,
//             phone:req.body.phone,sectorofexpertise:req.body.sectorofexpertise,companysummary:req.body.companysummary,linkedin:req.body.linkedin,facebook:req.body.facebook,branch:req.body.branch,accountmanager:req.body.accountmanager,
//             recruiter:req.body.recruiter, competitor:req.body.competitor},      
//    function(err) {  
//     if (err) {  
//     res.send(err);  
//     return;  
//     }  
//     res.send({data:"Record has been Updated..!!"});  
//     });  
//    })    

// app.put('/update',async(req,res)=>{
//     const newCompanyName= req.body.newCompanyName
//     const id = req.body.id
//     try{
//         await CompanySchema.findById(id, (error,newData)=>{
//             newData.companyname=newCompanyName;
//             newData.save();
//         })
//     }
//     catch(err){
//         console.log(err)
//     }
//     res.send("Updated")
// })



app.listen(4040, ()=>console.log("server running"));
