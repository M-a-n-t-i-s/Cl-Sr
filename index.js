import express from 'express';

import {getAll, getAllMark, getMark, getMarkAndModels} from "./controllers/RecordController.js";
import {MongoClient} from "mongodb";
import cors from 'cors';

export const MongoDBclient = new MongoClient('mongodb://hrTest:hTy785JbnQ5@mongo0.maximum.expert:27423/?authSource=hrTest&replicaSet=ReplicaSet&readPreference=primary')

const app =express();
app.use(cors())
app.use(express.json())


app.get(`/`, getAll)
app.get(`/:mark`, getAllMark)
app.get(`/:mark/:size/:page`, getMark)
app.get(`/:mark/:size/:page/:models`, getMarkAndModels)


app.listen(4444, (err)=>{
    if (err) {
        return console.log(err)
    }
    console.log('Server OK');
})
