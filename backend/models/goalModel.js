const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // _id of user
      required: true,
      ref: "User", // Name of associated Model
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { timestamps: true } // Create 'Updated at' and 'Created at' fields.
);

module.exports = mongoose.model("Goal", goalSchema);
