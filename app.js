"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");

const app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(express.static(path.join(__dirname, "/public")));
// app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/keyword/:kw", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let keyword = req.params.kw.split('+');
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) return res.status(500).send([]);
      var dbo = db.db("main_data");
      dbo.collection("keywords").find({"_id": {"$in": keyword}}).toArray(function(err, result) {
          if (err) return res.status(500).send([]);
          db.close();
          return res.status(200).send(result);
        }
      );
    });
  } catch (e) {
    return res.status(500).send([]);
  }
});

app.get("/all_doc", (req, res) => {
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) return res.status(500).send([]);
      var dbo = db.db("main_data");
      dbo.collection("page_info").find({},{"_id": 1, "keywords": 1}).toArray(function(err, result) {
          if (err) return res.status(500).send([]);
          db.close();
          return res.status(200).send(result);
        }
      );
    });
  } catch (e) {
    return res.status(500).send([]);
  }
})

app.get("/doc/:id", (req, res) => {
  let docId = req.params.id.split('+');
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) return res.status(500).send([]);
      var dbo = db.db("main_data");
      dbo.collection("page_info").find({"_id": {"$in": docId}}).toArray(function(err, result) {
          if (err) return res.status(500).send([]);
          db.close();
          return res.status(200).send(result);
        }
      );
    });
  } catch (e) {
    return res.status(500).send([]);
  }
})

app.get("/doc/:id/term/:term", (req, res) => {
  let docId = req.params.id;
  let terms = req.params.term.split('+');
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) return res.status(500).send({"error": "error1"});
      var dbo = db.db("main_data");
      dbo.collection("page_info").aggregate([
        {"$match": {"_id": docId}},
        {"$project": {"keywords": 1}},
        {"$unwind": "$keywords"},
        {"$match": {"keywords.keyword": {"$in": terms}}},
        {"$group": {"_id": "$_id", "keywords": {"$push": "$keywords"}}}
      ]).toArray(function(err, result) {
          if (err) return res.status(500).send({"error": "error2"});
          db.close();
          return res.status(200).send(result);
        }
      );
    });
  } catch (e) {
    return res.status(500).send({"error": "error3"});
  }
});

app.get("/all_doc_id", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) return res.status(500).send([]);
      var dbo = db.db("main_data");
      dbo.collection("page_info").find({},{"_id":1}).map(id => id._id).toArray(function(err, result) {
          if (err) return res.status(500).send([]);
          db.close();
          return res.status(200).send({"all_doc_id": result});
        }
      );
    });
  } catch (e) {
    return res.status(500).send([]);
  }
})

app.get("/all_keywords", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) return res.status(500).send([]);
      var dbo = db.db("main_data");
      dbo.collection("page_info").aggregate([
        {"$project": {"keywords": 1}},
        {"$unwind": "$keywords"},
        {"$project": {"kw": "$keywords.keyword"}},
        {"$group": {"_id": "$kw"}}
      ]).map(id => id._id).toArray(function(err, result) {
          if (err) return res.status(500).send([]);
          db.close();
          return res.status(200).send({"all_keywords": result});
        }
      );
    });
  } catch (e) {
    return res.status(500).send([]);
  }
})

// // query => documentID => documents
// // TODO handle multiple words(phrase)
// app.post("/v1/documents_query", async (req, res) => {
//   // console.log(req.body);
//   if (!("message" in req.body)) {
//     return res.status(400).send({ error: "bad request" });
//   }

//   // TODO check req.body.message multiple->phrase
//   try {
//     let query_array = re.body.message.split(" ");
//     console.log(query_array);
//     let result_array = [];
//     for (let query in query_array){
//       let result = keywordsDB.get(query, function (err, value) {
//         if (err) {
//           if (err.notFound) {
//             return "";
//           }
//         }
//         return value;
//       })
//       if (result !== ""){
//         result_array.push(result);
//         console.log(result);
//       }
//     };
//     let response = await keywordsDB.get(req.body.message);
//     let resJSON = await dictToJson(response);
//     let docs = [];
//     for (let documentID in resJSON.pos) {
//       let pyDoc = maindataDB.get(documentID).then(str => dictToJson(str));
//       docs.push(pyDoc);
//     }
//     let docsData = await Promise.all(docs);
//     // console.log(response);
//     return res.status(200).send({ response: docsData });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).send({ error: "db error" });
//   }
// });

// console.log("Listening on port 8000");
app.listen(8001);
