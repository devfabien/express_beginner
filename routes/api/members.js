const express = require("express");
const uuid = require("uuid");
const members = require("../../members");
const route = express.Router();

route.get("/", (req, res) => {
  res.json(members);
});

route.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const found = members.some((member) => member.id === id);
  if (found) {
    res.json(members.filter((member) => member.id === id));
  } else {
    res.status(400).json({ message: "Member not found" });
  }
});

route.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ message: "please include a name and email" });
  }
  members.push(newMember);
  res.json(newMember);
});

route.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const found = members.find((member) => member.id === id);
  if (found) {
    const updatedMember = req.body;
    found.name = updatedMember.name ? updatedMember.name : found.name;
    found.email = updatedMember.email ? updatedMember.email : found.email;
    found.status = updatedMember.status ? updatedMember.status : found.status;
    res.json({ message: "member updated", member: found });
  } else {
    res.status(400).json({ message: "Member not found" });
  }
});

route.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const found = members.some((member) => member.id === id);
  if (found) {
    res.json({
      message: "member deleted",
      member: members.filter((member) => member.id !== id),
    });
  } else {
    res.status(400).json({ message: "Member not found" });
  }
});

module.exports = route;
