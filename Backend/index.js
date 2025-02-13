import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    mongoose
      .connect(
        "mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/SmartSha?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("Connected to Database");
      });
  });

