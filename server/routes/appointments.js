import express from "express";

// connect to database
import db from "../db/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/api/v1/", async (req, res) => {
  let collection = await db.collection("appointments");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// sort by ID
router.get("/api/v1/:id", async (req, res) => {
  let collection = await db.collection("appointments");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/api/v1/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      time: req.body.time,
      confirmed: req.body.confirmed,
    };
    let collection = await db.collection("appointments");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding appointment");
  }
});

// update appointment information
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        time: req.body.time,
        confirmed: req.body.confirmed,
      },
    };

    let collection = await db.collection("appointments");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating appointment");
  }
});

// delete appointment
router.delete("/api/v1/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("appointments");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;