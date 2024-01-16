require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  description: String,
  active: Boolean,
  dateCreated: Date,
});

const Agent = mongoose.model("Agent", agentSchema);

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  Agent.find({})
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log("Error occured, " + err));
});

app.post("/api/support-agents", (req, res) => {
  let agent = new Agent({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    description: req.body.description,
    active: true,
    dateCreated: new Date(),
  });

  agent.save().then(
    (savedAgentData) => {
      res.send(savedAgentData);
    },
    (err) => res.send(err)
  );
});

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running");
  else console.log("Error occurred, server can't start", error);
});
