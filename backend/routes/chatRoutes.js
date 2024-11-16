import express from "express";
import { initiateChat, getResponse, sessionsCollection } from "../app.js"; // Import necessary functions and collections

const router = express.Router();

// Route to start a new chat
router.get("/start_chat", (req, res) => {
  const { sessionId, chatHistory } = initiateChat();
  res.json({ sessionId });
});

// Route to handle user messages and get AI response
router.post("/send_message", async (req, res) => {
  const { sessionId, query } = req.body;

  const sessionData = await sessionsCollection.findOne({ sessionId });
  const chatHistory = sessionData ? sessionData.messages : initiateChat().chatHistory;

  const response = await getResponse(sessionId, query, chatHistory);

  res.json({
    response,
    chat_history: chatHistory,
  });
});

// Route to retrieve chat history by session ID
router.get("/get_chat_history", async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).send("Please provide a sessionId");
  }

  try {
    const sessionData = await sessionsCollection.findOne({ sessionId });
    const chatHistory = sessionData ? sessionData.messages : [];
    res.status(200).json({ chat_history: chatHistory });
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat history", error });
  }
});

export default router;
