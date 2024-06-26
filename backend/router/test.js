const Test = require("../model/test");
const Report = require("../model/report");
const User = require("../model/user");
const mongoose = require("mongoose");
const { firebaseTokenVerifier, userAuthLookup, authorizationProvider } = require("../utils/middleware")
const express = require("express");
const router = express.Router();

router.get("/:testid", firebaseTokenVerifier, userAuthLookup, async (req, res) => {
  try {
    let meta = await getTestMeta(req.params.testid);
    res.status(200).json(meta);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", firebaseTokenVerifier, userAuthLookup, authorizationProvider('TEST'), async (req, res) => {
  try {
    const { test } = req.body;
    const init_test = await startTest(test, req.decodedToken.uid);
    res.status(200).json(init_test);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

async function getTestMeta(testID) {
  try {
    let testObj = (await Test.find({ _id: testID }).exec())[0].toObject();
    testObj.size = 0;
    testObj.maximum = 0;
    testObj.sections.map((section) => {
      let temp = 0;
      section.maximum = 0;
      section.questions.forEach((question) => {
        temp++;
        section.maximum += question.positives;
      });
      testObj.maximum += section.maximum;
      section.size = temp;
      testObj.size += section.size;
      delete section.questions;
      delete section._id;
      return section;
    });

    delete testObj.__v;
    return testObj;
  } catch (error) {
    throw error;
  }
}

async function startTest(testID, userID) {
  try {
    let isAlreadyAttempted = false;
    let attemptedTests = (await User.find({uid: userID }).exec())[0]
      .attemptedTest;
    attemptedTests.forEach((test) => {
      if (test._id == testID) {
        isAlreadyAttempted = true;
      }
    });

    if (isAlreadyAttempted) {
      return {
        message: "Test Already Attempted",
      };
    }

    let test_fetched = (await Test.find({ _id: testID }).exec())[0];

    let init_report = new Report({
      test: test_fetched._id,
      user: userID,
      maximum: test_fetched.maximum,
      size: test_fetched.size,
      sections: test_fetched.sections,
      duration: test_fetched.duration,
    });

    let newTest = {
      _id: new mongoose.Types.ObjectId(testID)
    }

    await User.updateOne(
      {
        uid: userID,
      },
      {
        $push: { attemptedTest: newTest },
      }
    );

    return await (
      await init_report.save()
    ).populate({
      path: "sections.questions._id",
      model: "Question",
    });
  } catch (error) {
    throw error;
  }
}
