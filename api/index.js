const { v4: id } = require("uuid");

const express = require("express"),
  app = express(),
  fs = require("fs"),
  cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  fs.readFile("db/student.json", "utf8", (err, data) => {
    if (err) {
      res.status(500);
      res.message({ message: err.message });
      return;
    }
    res.json(JSON.parse(data));
  });
});
app.post("/", (req, res) => {
  fs.readFile("db/student.json", "utf8", (err, data) => {
    if (err) {
      res.status(500);
      res.message({ message: err.message });
      return;
    }
    const jsondata = JSON.parse(data);
    const insertdata = req.body;
    insertdata.createdon = Date.now();
    insertdata.id = id();
    jsondata.push(insertdata);

    fs.writeFile("db/student.json", JSON.stringify(jsondata), (err) => {
      if (err) {
        res.status(500);
        res.json({ message: err.message });
        return;
      }
      res.json({ message: "Student Data Added ", data: insertdata });
    });
  });
});
app.delete("/", (req, res) => {
  if (!req.body.id) {
    res.status(400);
    res.json({ message: "Id Field is missing" });
    return;
  }
  fs.readFile("db/student.json", "utf8", (err, data) => {
    if (err) {
      res.status(500);
      res.json({ message: err.message });
      return;
    }
    const jsondata = JSON.parse(data);
    const index = jsondata.findIndex((listdata) => listdata.id === req.body.id);
    if (index === -1) {
      res.status(404);
      res.json({ message: "Id not found" });
      return;
    }
    jsondata.splice(index, 1);
    fs.writeFile("db/student.json", JSON.stringify(jsondata), (err) => {
      if (err) {
        res.status(500);
        res.json({ message: err.message });
        return;
      }
      res.json({ message: "Student Data Deleted Successful" });
    });
  });
});


app.put('/', (req,res)=>{

  if (!req.body.id) {
    res.status(400);
    res.json({ message: "Id Field is missing" });
    return;
  }
  fs.readFile("db/student.json", "utf8", (err, data) => {
    if (err) {
      res.status(500);
      res.json({ message: err.message });
      return;
    }
    const jsondata = JSON.parse(data);
    const index = jsondata.findIndex((listdata) => listdata.id === req.body.id);
    if (index === -1) {
      res.status(404);
      res.json({ message: "Id not found" });
      return;
    }

    jsondata[index].name = req.body.name;
    jsondata[index].email = req.body.email;
    jsondata[index].qualification = req.body.qualification;

    
    fs.writeFile("db/student.json", JSON.stringify(jsondata), (err) => {
      if (err) {
        res.status(500);
        res.json({ message: err.message });
        return;
      }
      res.json({ message: "Student Data edited Successful" });
    });
  });
})
app.listen(process.env.PORT || 5000);
