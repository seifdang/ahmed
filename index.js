require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer")
const cors = require("cors");
const connection = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const membRoutes = require('./routes/members');
const visitRoutes = require('./routes/visits');
const ReunionRoutes = require('./routes/reunion');




// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

//upload

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'public')
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now() +'-' + file.originalname)
    }
});

const upload = multer({storage}).single('file');
app.post('/upload', (req,res)=>  {
    upload(req,res, (err)  => {
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
        
})
})

// routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/members",membRoutes);
app.use("/api/visits",visitRoutes);
app.use("/api/reunions",ReunionRoutes);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));