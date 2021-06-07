const handleRegister = (res, req, database, bcrypt) => {
  const { email, name, password } = req.body; //destructure req.body, to fit in the format of database
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  // Using trx as a query builder:

  database
    .transaction((trx) =>
      trx
        .insert({
          hash,
          email,
        })
        .into("login")
        .then(() =>
          trx
            .insert({
              name,
              email,
              joined: new Date(),
            })
            .into("users")
            .returning("*")
        )
        .then(([user]) => {
          console.log(user);
          res.json(user);
        })
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: {
          message: "Unable to register",
        },
      });
    });
};

module.exports = {
  handleRegister,
};
