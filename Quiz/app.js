import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import { getQuestions } from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(express.json());
app.use(express.static("frontend"))

app.get('/quiz',(req,res)=>{
    res.sendFile(__dirname + "/frontend/index.html");
})
app.get('/quizQ', async(req,res)=>{
    const question = await getQuestions();
    if(question){
        res.json({success: true, quiz: question});
    }else{
        res.status(500).json({error: "fetch error"})
    }
})

app.listen(5000, ()=>{
    console.log('server running on port 5000');
})