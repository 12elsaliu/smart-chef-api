const handleEntries = (req, res, database) => {
  //It's PUT request because you need to change something
  //But it will get the same response if you use POST
  const { id } = req.body; //In req.body, you need to have data for id
  database("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(([entries]) => {
      if (entries) {
        res.json(entries);
      } else {
        res.json("No entries for this id");
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({
        error: {
          message: "Unable to get entries",
        },
      });
    });
};

module.exports = {
  handleEntries,
};
