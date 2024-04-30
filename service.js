import {
    DynamoDBClient
  } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  UpdateCommand,
  ExecuteStatementCommand,
} from "@aws-sdk/lib-dynamodb";

import clientDynamoLib from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import express from "express" // ALWAYS - npm install express needed
import bodyParser from "body-parser";


const app = express() // ALWAYS
app.use(bodyParser.json());

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const log = (msg) => console.log(`[SCENARIO] ${msg}`);
const tableName = "allyR_midTerm"; // Table in DynamoDB

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);



// populating table with ShapeID, ShapeVolume, SideDimension
async function updateDB(theData) {
    if (theData == null) {
        const result = {
        status: "Failure - empty body"
        };

        return result;  
    }

    const theID = uuidv4();

    let sideDimension = theData.sideDimension;
    let volume = sideDimension ** 3;
    let shapeID = theData.shapeID;
    console.log("Shape ID: " + theData.shapeID);

    const putCommand = new PutCommand({
            TableName: "allyR_midTerm",
            Item: {
                "allyR_midTerm": theID,
                ShapeID: shapeID,
                SideDimension: sideDimension,
                ShapeVolume: volume
            },
        });

    try {
            await docClient.send(putCommand);
            console.log("Item added");

            const result = {
            status: "Success"
            };
    
            return result;  
    } catch (err) {
            const result = {
            status: "Failure",
            };
    
            return result;  
    }
};


  // queries the data for the desired value (retrieve from JSON param)
  async function queryData (theJSON){
    try {
        log("Selecting an item.");
        let wantedVal = theJSON.wantedVal;
        let condition = theJSON.condition;
        let conditionVal = theJSON.conditionVal;
        let operator = theJSON.operator;
        console.log("SELECTING " + wantedVal + " FROM allyR_midTerm WHERE " + condition + " " + operator + " " + conditionVal);
        if ((theJSON.hasOwnProperty("condition")) && (theJSON.hasOwnProperty("conditionVal"))) {
            const selectItemStatementCommand = new ExecuteStatementCommand({
                // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.select.html
                Statement: `SELECT ${wantedVal} FROM \"allyR_midTerm\" WHERE ${condition} ${operator} '${conditionVal}'`,
                });
                
                const selectItemResponse = await docClient.send(selectItemStatementCommand);
                
                let items = "";
                for (let i = 0; i < selectItemResponse.Items.length; i++) {
                    log(`Got results: ${JSON.stringify(selectItemResponse.Items[i])}`); 
                    items = items + JSON.stringify(selectItemResponse.Items[i]);
                }
        
                //console.log(result);
                let returnVal = items;
                return returnVal;
        }
        else {
            const selectItemStatementCommand = new ExecuteStatementCommand({
                // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.select.html
                Statement: `SELECT ${wantedVal} FROM \"allyR_midTerm\"`,
                });
        
                const selectItemResponse = await docClient.send(selectItemStatementCommand);
                let items;
                for (let i = 0; i < selectItemResponse.Items.length; i++) {
                  log(`Got results: ${JSON.stringify(selectItemResponse.Items[i])}`); 
                  items = items + JSON.stringify(selectItemResponse.Items[i]);
              }
      
              //console.log(result);
                //console.log(selectItemResponse)
                return selectItemResponse;
        }

} catch (err) {
        console.log(err);
        const result = {
        status: "Query failure"
        };

        return result;  
}
};

// uses updateCommand to update the item in the table
async function updateShape (theJSON){
    try{
        const command = new UpdateCommand({
          TableName: tableName,
          Key: {
            ShapeID: theJSON.shapeID,
          },
          UpdateExpression: "set SideDimension = :SideDimension",
          ExpressionAttributeValues: {
            ":SideDimension": theJSON.sideDimension,
          },
          ReturnValues: "ALL_NEW",
        });
      
        const response = await docClient.send(command);
        console.log(response);
        response["status"] = "Update success"
        return response;

} catch (err) {
    console.log(err);
    const result = {
    status: "Update failure"
    };

    return result;  
}};

// post route for query data
app.post("/getQueryData", function (req,res){
    console.log("/queryData with " + req.body)
    queryData(req.body).then(function(returnVal) {
        console.log("Returned " + returnVal);
        res.json(returnVal);
      });
});


// get route for getting json query data
app.get("/getQueryData", async function (req,res){
    console.log(req.headers)
    console.log("Processing " + req.url)
    const selectItemStatementCommand = new clientDynamoLib.ExecuteStatementCommand({
        Statement: `SELECT * FROM allyR_midTerm`
    });
    console.log("Selected all values from allyR_midTerm");
    const selectItemResponse = await docClient.send(selectItemStatementCommand);
    for (let i = 0; i < selectItemResponse.Items.length; i++) {
        console.log(`Got results: ${JSON.stringify(selectItemResponse.Items[i])}`);
    }
    console.log("Got all values from Experiment successfully!");
    res.json(selectItemResponse);
});

// get route for table data (html)
app.get("/queryData", function (req,res){
  res.sendFile(__dirname + "/html/shape-table.html");
});

// post for query data
app.post("/queryData", function (req,res){
  console.log("/queryData with " + req.body)
  queryData(req.body).then(function(returnVal) {
      console.log("Returned " + returnVal);
      // send() method returns HTML to the caller / client 
      res.json(returnVal);
    });
});

// post route for populating DynamoDB
app.post("/updateDB", function(req, res) {
  console.log("/updateDB with " + req.body)
  updateDB(req.body).then(function(returnVal) {
    console.log("Returned " + returnVal);
    res.json(returnVal);
  });
});

// get route for adding shape 
app.get('/addShape', function(req,res){
    res.sendFile(__dirname + "/html/add-shape.html")
  });

// post route for adding shape
app.post('/addShape', function(req,res){
    console.log("Saving shape")
    updateDB(req.body).then(function(returnVal) {
      console.log("Returned " + returnVal);
      res.json(returnVal);
    });
})

// get route for update shape
app.get("/updateShape", function (req,res){
    res.sendFile(__dirname + "/html/update-shape.html")
})

// post route for update shape
app.post('/updateShape', function(req,res){
    updateShape(req.body).then(function(returnVal) {
      console.log("Returned " + returnVal);
      res.json(returnVal);
    });
    console.log("Shape updated")
})


// START A SERVER 
app.listen(4040, function() {
    console.log("Listening on port 4040..."); // RECOMMENDED
 });
