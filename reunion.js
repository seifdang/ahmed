const router = require("express").Router();
const multer = require('multer')
const { Reunion,validate } = require("../models/reunions");
const bcrypt = require("bcrypt");


router.get("/", async (req,res)=>{
    Reunion.find()
.then(data => {

if (data==0) {
  res.status(500).send({
      message:"There are no user"
  });
}else{
	
  res.status(200).send( data );
}
  
})
  .catch(err => {
res.status(500).send({
  message:
    err.message || "Some error occurred."
});
});
})
const upload = multer({ dest: '../public' })
router.post("/reunion",upload.array('lastName', 12) , async (req, res) => {
	
	
	console.log(req.file)
	
	try {
		console.log("reunions")
		
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await Reunion.findOne({ firstName: req.body.firstName });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		

		await new Reunion({ ...req.body}).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		console.log(error)
	}
	
});

module.exports = router;