const handleSignin = (req, res, database, bcrypt) => {
  console.log(req.body);
  const { email, password } = req.body;
  database
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(([user]) => {
      const isCorrect = bcrypt.compareSync(password, user.hash); // true
      if (isCorrect) {
        return database
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(([user]) => {
            res.json(user);
          });
      }
      res.status(404).json({
        message: "Credential incorrect",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: "Unable to log in",
      });
    });
};

module.exports = {
  handleSignin,
};
