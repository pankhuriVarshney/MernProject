import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";  
import { DateTime } from "luxon";  
import { spawn } from "child_process";

 

const app = express();
const port = 8000;


app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));


const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let sessionsCollection;


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


function initiateChat() {
  const sessionId = uuidv4();
  const chatHistory = [{
    sender: "AI",
    message: "You are a helpful AI assistant.",
    timestamp: DateTime.utc().toISO(),
  }];
  
  return { sessionId, chatHistory };
}




async function getOllamaResponse(messages) {
    const prompt = messages.map(msg => '${msg.sender}: ${msg.message}').join("\n");
    return new Promise((resolve, reject) => {
        const process = spawn("ollama", ["run", "qwen2:0.5b"]);

        let response = "";
        let error = "";

  
        process.stdout.on("data", (data) => {
            const output = data.toString();
           
            if (output.includes(">")) {
               
                process.stdin.write('${prompt}\n');
            } else {
                response += output;
            }
        });

        process.stderr.on("data", (data) => {
            error += data.toString();
        });

        
        process.on("close", (code) => {
            if (code === 0) {
                resolve(response.trim());
            } else {
                reject('Error: ${error || "Unknown error occurred"}');
            }
        });
    });
}



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


  await sessionsCollection.updateOne(
    { sessionId: sessionId },
    { $set: { sessionId, messages: chatHistory } },
    { upsert: true }
  );

  return aiResponse;
}

export { initiateChat, getResponse, sessionsCollection };
