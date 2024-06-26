const mongoose = require("mongoose");

// question uid (_id), object id, autofill, mandatory
// directions, string, default ""
// statement, string, mandatory
// media, string, default ""
// type, enum ['SINGLE', 'NUMERICAL', 'SUBJECTIVE'], mandatory
// options [{_id (object id, autofill), value (string)}...], default []
// meta {difficulty:string, mandatory, topic:string, mandatory, subtopic:string, mandatory}
// testOnly, boolean, mandatory

// question uid (_id)
// answer (string)

const questionSchema = new mongoose.Schema({
  directions: {
    type: String,
    default: "",
  },
  statement: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["SINGLE", "NUMERICAL", "SUBJECTIVE"],
    required: true,
  },
  options: {
    type: [
      {
        value: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
    validate: {
      validator: function (options) {
        return !(this.type === "SINGLE" && this.options.length === 0);
      },
      message: "Options array cannot be blank for SINGLE type questions.",
    },
  },
  meta: {
    tag: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD", "TRAP"],
      required: true,
    },
    topic: {
      type: String,
      default: "",
    },
    subtopic: {
      type: String,
      default: "",
    },
  },
  testOnly: {
    type: Boolean,
    default: false,
  },
});

const Question = mongoose.model("Question", questionSchema);

// questionSchema.virtual("answer", {
//   ref: "Answer",
//   localField: "_id",
//   foreignField: "_id",
// });

const answerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  solution: {
    type: String,
    default: "",
  },
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = { Question, Answer };
