var path = require("path");

module.exports = function(app) {
//route for survey page
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });
  //route for home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
// If no matching route is found default to home
app.use(function (req, res) {
  res.sendFile(path.join(__dirname + '/../public/home.html'));
});
};