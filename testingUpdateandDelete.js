import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";


import { v4 as uuidv4 } from 'uuid';

import express from "express" // ALWAYS - npm install express needed
import bodyParser from "body-parser";

const app = express() // ALWAYS
app.use(bodyParser.json());

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);



async function update (){
    const command = new UpdateCommand({
      TableName: "aRyan-exam1",
      Key: {
        ShapeID: "Shape123",
      },
      UpdateExpression: "set shapeVolume = :newVol",
      ExpressionAttributeValues: {
        ":newVol": "500",
      },
      ReturnValues: "ALL_NEW",
    });
  
    const response = await docClient.send(command);
    console.log(response);
    return response;
  };
  
// update();



async function deleteVal () {
  const command = new DeleteCommand({
    TableName: "aRyan-exam1",
    Key: {
      ShapeID: "Shape123",
    },
  });

  await docClient.send(command);
  console.log(response);
  return response;
};

deleteVal();


app.listen(3030, function() {
    console.log("Listening on port 3030..."); // RECOMMENDED
 });

