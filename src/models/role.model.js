const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
  name: String,
  priority: Number,
});

module.exports = mongoose.model("Role", RoleSchema);
