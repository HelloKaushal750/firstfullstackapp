const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NoteModel } = require("../models/Notes.model");
require("dotenv").config();

const notesController = Router();

notesController.get("/", async (req, res) => {
  const notes = await NoteModel.find({ userId: req.body.userId });
  res.json(notes);
});

notesController.post("/create", async (req, res) => {
  const { Heading, Note, Tag, userId } = req.body;
  const notes = new NoteModel({
    Heading,
    Note,
    Tag,
    userId,
  });
  try {
    await notes.save();
    res.json({ message: "Note Created" });
  } catch (error) {
    console.log(error);
  }
});

notesController.delete("/delete/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const deletedNote = await NoteModel.findOneAndDelete({
    _id: noteId,
    userId: req.body.userId,
  });
  if (deletedNote) {
    res.json({ message: "Deleted Successfully" });
  } else {
    res.json({
      message:
        "You are not allow to delete this notes because its somebody else notes",
    });
  }
});

notesController.patch("/edit/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const updatedNote = await NoteModel.findOneAndUpdate(
    {
      _id: noteId,
      userId: req.body.userId,
    },
    { ...req.body }
  );
  if (updatedNote) {
    res.json({ message: "Updated Successfully" });
  } else {
    res.json({
      message:
        "You are not allow to update this notes because its somebody else notes",
    });
  }
});

module.exports = { notesController };
