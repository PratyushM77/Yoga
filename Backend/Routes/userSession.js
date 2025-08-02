const express = require("express");
const AuthenticateUser = require("../Auth/UserAuth");
const Session = require("../Models/SessionModel");
const DraftSession = require("../Models/Draftschema");
const router = express.Router();

router.post("/my-session/publish", AuthenticateUser, async (req, res) => {
  const { title, tags, json_file_url, benefit, status, description, creator } =
    req.body;
  if (!title || !json_file_url || !description || !benefit) {
    return res.status(404).json({ message: "All fields are required" });
  }
  try {
    if (status === "draft") {
      const draftSesssion = new DraftSession({
        user_id: req.user.id,
        title,
        tags,
        json_file_url,
        status,
        benefit,
        description,
        creator,
      });

      const savedDraft = await draftSesssion.save();
      return res
        .status(201)
        .json({ message: "Session saved as Draft", session: savedDraft });
    } else {
      const newSession = new Session({
        user_id: req.user.id,
        title,
        tags,
        json_file_url,
        status,
        benefit,
        description,
        creator,
      });
      const saved = await newSession.save();
      return res
        .status(201)
        .json({ message: "Session Published", session: saved });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-sessions/:id", AuthenticateUser, async (req, res) => {
  const id = req.params.id;
  try {
    const getSession = await Session.find({ user_id: id });

    if (!getSession)
      return res
        .status(404)
        .json({ message: "You should Create a session first!" });

    return res
      .status(200)
      .json({ message: "Your session data", session: getSession });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
router.get("/my-sessions", AuthenticateUser, async (req, res) => {
  try {
    const getSession = await Session.find();

    if (!getSession)
      return res
        .status(404)
        .json({ message: "You should Create a session first!" });

    return res
      .status(200)
      .json({ message: "Your session data", session: getSession });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-sessions/draft/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const getdraft = await DraftSession.find({ user_id: id });
    if (!getdraft) return res.status(404).json({ message: "No Drafts here!" });

    return res.status(200).json({ message: "Your Drafts", draft: getdraft });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/deletedraft/:id",async(req,res)=>{
  const id = req.params.id
  try {
    const deletedraft = await DraftSession.findOneAndDelete({_id:id})
    if(deletedraft) return res.status(200).json({message:"Your Draft deleted",deletedraft})
      else{
    return res.status(403).json({message:"Something went wrong"})
  }
} catch (error) {
  console.error(error);
  return res.status(500).json({message:"Something went wrong with the server"})
    
  }
})

module.exports = router;
