import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {SayHicontroller} from './Controllers/NormalController.js';
import {Saymynamecontroller} from './Controllers/NormalController.js';


const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get("/", SayHicontroller);
app.post("/saymyname", Saymynamecontroller);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


