const router = require("express").Router();

const { Visits,validate } = require("../models/visits");
const bcrypt = require("bcrypt");


router.get("/", async (req,res)=>{
    Visits.find()
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

router.post("/visits", async (req, res) => {
	try {
		console.log("helloo")
		
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await Visits.findOne({ firstName: req.body.firstName });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		

		await new Visits({ ...req.body}).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		console.log(error)
	}
});

module.exports = router;