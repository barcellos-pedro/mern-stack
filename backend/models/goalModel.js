const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { timestamps: true } // Create 'Updated at' and 'Created at' fields.
);

module.exports = mongoose.model("Goal", goalSchema);
