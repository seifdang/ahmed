const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		console.log(error)
	}
});
router.get("/", async (req,res)=>{
    User.find()
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


module.exports = router;