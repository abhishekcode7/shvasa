require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

const cors = require("cors");
const exp = require("constants");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

mongoose.connect(process.env.MONGODB_URL);

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  description: String,
  active: Boolean,
  dateCreated: Date,
});

const Agent = mongoose.model("Agent", agentSchema);

const ticketSchema = new mongoose.Schema({
  topic: String,
  description: String,
  dateCreated: Date,
  severity: String,
  type: String,
  assignedTo: String,
  assignedToId: String,
  status: String,
  resolvedOn: Date,
});

const TicketModel = mongoose.model("TicketModel", ticketSchema);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/findAgents', (req, res) => {
  console.log("data")
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

const ticketStatus = {
  New: "new",
  Assigned: "assigned",
  Resolved: "resolved",
};

var currentAgentIndex = 0;
app.post("/api/support-tickets", (req, res) => {
  Agent.find().then((agents) => {
    let totalAgents = agents.length;

    while (1) {
      if (agents[currentAgentIndex].active == false) {
        currentAgentIndex = (currentAgentIndex + 1) % totalAgents;
      } else break;
    }

    let ticket = new TicketModel({
      topic: req.body.topic,
      description: req.body.description,
      dateCreated: req.body.dateCreated,
      severity: req.body.severity,
      type: req.body.type,
      assignedTo: agents[currentAgentIndex].name,
      assignedToId: agents[currentAgentIndex]._id,
      status: ticketStatus.Assigned,
      resolvedOn: null,
    });

    currentAgentIndex = (currentAgentIndex + 1) % totalAgents;

    ticket.save().then(
      (savedTicketData) => {
        res.send(savedTicketData);
      },
      (err) => res.send(err)
    );
  });
});

app.get("/api/support-tickets", (req, res) => {
  TicketModel.find()
    .then((tickets) => {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.page_size) || 10;
      const status = req.query.status || null;
      const assignedTo = req.query.assigned_to || null;
      const severity = req.query.severity || null;
      const type = req.query.type || null;
      const sortResolvedOn = req.query.sort_resolved_on || false;
      const sortDateCreated = req.query.sort_date_created || false;

      let result = tickets.filter((item) => {
        var ans = true;
        if (status != null && item.status != status) ans = false;
        if (assignedTo != null && item.assignedTo != assignedTo) ans = false;
        if (severity != null && item.severity != severity) ans = false;
        if (type != null && item.type != type) ans = false;
        return ans;
      });

      if (sortResolvedOn == true) {
        result.sort((a, b) => {
          return new Date(b.resolvedOn) - new Date(a.resolvedOn);
        });
      } else if (sortDateCreated == true) {
        result.sort((a, b) => {
          return new Date(b.dateCreated) - new Date(a.dateCreated);
        });
      }

      var startIndex = (page - 1) * pageSize;
      var endIndex = startIndex + pageSize;

      startIndex = Math.min(startIndex, result.length);
      endIndex = Math.min(endIndex, result.length);

      res.send(result.slice(startIndex, endIndex));
    })
    .catch((err) => res.send(err));
});

app.get("/api/clearTickets", (req, res) => {
  TicketModel.deleteMany({})
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/api/clearAgents", (req, res) => {
  Agent.deleteMany({})
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/api/getAgents", (req, res) => {
  Agent.find({})
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.use(express.static(path.join(__dirname, "../frontend", "dist")));
app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running");
  else console.log("Error occurred, server can't start", error);
});
