const testing = (req, res) => {
  res.status(200).send("<p>Test successfull</p>");
  console.log("Test call received");
}

module.exports = { testing };