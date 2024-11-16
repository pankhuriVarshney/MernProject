import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";  // Used to run the Ollama model locally
import { DateTime } from "luxon";  // For timestamping
import { spawn } from "child_process";

dotenv.config();

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// MongoDB Configuration
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let sessionsCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('chatHistoryDB');
    sessionsCollection = db.collection('sessions');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}
connectDB();

// Initialize chat : system message
function initiateChat() {
  const sessionId = uuidv4();
  const chatHistory = [{
    sender: "AI",
    message: "You are a helpful AI assistant.",
    timestamp: DateTime.utc().toISO(),
  }];
  
  return { sessionId, chatHistory };
}

// Function to generate a response using Ollama model (qwen2.5-coder)


async function getOllamaResponse(messages) {
    const prompt = messages.map(msg => '${msg.sender}: ${msg.message}').join("\n");
    return new Promise((resolve, reject) => {
        const process = spawn("ollama", ["run", "qwen2:0.5b"]);

        let response = "";
        let error = "";

        // Listen to stdout for the model's response
        process.stdout.on("data", (data) => {
            const output = data.toString();
            // Collect responses or detect the end of the message
            if (output.includes(">")) {
                // If > prompt appears, send the prompt
                process.stdin.write('${prompt}\n');
            } else {
                response += output;
            }
        });

        // Listen for errors
        process.stderr.on("data", (data) => {
            error += data.toString();
        });

        // Handle process exit
        process.on("close", (code) => {
            if (code === 0) {
                resolve(response.trim());
            } else {
                reject('Error: ${error || "Unknown error occurred"}');
            }
        });
    });
}


// Function to handle messages, get Ollama model response, and save chat history
async function getResponse(sessionId, query, chatHistory) {
  const userMessage = {
    sender: "User",
    message: query,
    timestamp: DateTime.utc().toISO(),
  };
  chatHistory.push(userMessage);

  const aiResponse = await getOllamaResponse(chatHistory);

  const aiMessage = {
    sender: "AI",
    message: aiResponse,
    timestamp: DateTime.utc().toISO(),
  };
  chatHistory.push(aiMessage);

  // Save or update conversation in MongoDB
  await sessionsCollection.updateOne(
    { sessionId: sessionId },
    { $set: { sessionId, messages: chatHistory } },
    { upsert: true }
  );

  return aiResponse;
}

// Route to start a new chat session
app.get("/start_chat", (req, res) => {
  const { sessionId, chatHistory } = initiateChat();
  res.json({ sessionId });
});

// Route to handle user messages and get Ollama model's response
app.post("/send_message", async (req, res) => {
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
app.get("/get_chat_history", async (req, res) => {
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



// Expose necessary variables and functions
export { initiateChat, getResponse, sessionsCollection };
