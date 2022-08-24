var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var Store = require("jfs");
var db = new Store("db", { pretty: true });

app.set("port", process.env.PORT || 5000);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Templates will go in the following directory
app.set("views", __dirname + "/public");
app.set("view engine", "html");

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});

const postgressDb = require("./public/js/queries");
app.post("/userLogin", postgressDb.getUserById);
app.get("/paint/:pmsIden/:series", postgressDb.getPmsColor);
app.get("/paintcolor/:series", postgressDb.getComponentDetails);
app.post("/paintcolor", postgressDb.addPmsColor);
app.get("/getallcomponents", postgressDb.getAllColorComponents);
app.get("/getAllPmsEntries", postgressDb.getAllPmsEntries);
app.post("/paintColorUpdate", postgressDb.updatePmsColor);
app.get("/paintColorDelete/:pmsIden/:series", postgressDb.deletePmsNumber);
//app.post('/users', postgressDb.createUser)
//app.put('/users/:id', postgressDb.updateUser)
//app.delete('/users/:id', postgressDb.deleteUser)
// app.post('/addpaintpms', function(request, response) {
// 	console.log("the request is " + JSON.stringify(request.body));
// });

app.get("/", function (request, response) {
  response.render("main_page");
});
app.get("/contact", function (request, response) {
  response.render("contact");
});
app.get("/sds", function (request, response) {
  response.render("sds");
});
app.get("/cms", function (request, response) {
  response.render("cms");
});
app.get("/cmslookup", function (request, response) {
  response.render("cms_lookup");
});
app.get("/testing", function (request, response) {
  response.render("testing");
});
app.get("/testing_canada", function (request, response) {
  response.render("testing_canada");
});
app.get("/testing_usa", function (request, response) {
  response.render("testing_usa");
});
app.get("/addColorComponent", function (request, response) {
  response.render("addPms");
});
app.get("/editPmsEntry/:pmsIden/:series", function (request, response) {
  response.render("editPms");
});

app.get("/userLogin", function (req, res) {
  db.get("users", function (err, obj) {
    res.status(200).json(obj);
  });
});
app.get("/viewPmsEntries", function (request, response) {
  response.render("viewAllPms");
});

app.post("/userSignup", function (req, res) {
  var newUser = req.body;
  var obj = db.getSync("users");
  newUser._id = obj.users.length + 1;
  obj.users.push(newUser);
  db.save("users", obj, function (err) {
    res.end();
  });
});

app.get("/parkingSpots", function (req, res) {
  var obj = db.getSync("spots");
  res.status(200).json(obj);
});

app.post("/postParkingSpot", function (req, res) {
  var newSpot = req.body;
  var obj = db.getSync("spots");
  newSpot._id = obj.location.length + 1;
  obj.location.push(newSpot);

  var usersObj = db.getSync("users");
  usersObj.users[newSpot.landlord - 1].spots.push(newSpot._id);
  db.saveSync("users", usersObj);

  db.save("spots", obj, function (err) {
    res.status(200).json(obj.location[obj.location.length - 1]);
  });
});

app.get("/accountInfo", function (req, res) {
  db.get("users", function (err, obj) {
    res.status(200).json(obj);
  });
});

app.post("/changeInfo", function (req, res) {
  var replaceUser = req.body;
  var obj = db.getSync("users");
  obj.users[replaceUser._id - 1] = replaceUser;
  db.save("users", obj, function (err) {
    res.end();
  });
});

app.post("/updateSpot", function (req, res) {
  var replaceSpot = req.body;
  var obj = db.getSync("spots");
  obj.location[replaceSpot._id - 1] = replaceSpot;
  db.save("spots", obj, function (err) {
    res.end();
  });
});

// node version 3.3.12
