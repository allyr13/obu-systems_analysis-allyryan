import {
    DynamoDBClient,
    ListTablesCommand,
    UpdateItemCommand,
    DeleteItemCommand,
  } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  UpdateCommand,
  ExecuteStatementCommand,
} from "@aws-sdk/lib-dynamodb";

import { v4 as uuidv4 } from 'uuid';
import express from "express" // ALWAYS - npm install express needed
import bodyParser from "body-parser";


const app = express() // ALWAYS
app.use(bodyParser.json());
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
            console.log(err);
            const result = {
            status: "Failure"
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
                let items = "";
                for (let i = 0; i < selectItemResponse.Items.length; i++) {
                    log(`Got results: ${JSON.stringify(selectItemResponse.Items[i])}`); 
                    items = items + JSON.stringify(selectItemResponse.Items[i]);
                }
        
                //console.log(result);
                let returnVal = items;
                return returnVal;
        }

} catch (err) {
        console.log(err);
        const result = {
        status: "Query failure"
        };

        return result;  
}
};

// deletes and re-populates desired val
async function updateShape (theJSON){
    try {
            let updateID = theJSON.updateVal;
            // deleting val
            const command = new DeleteItemCommand({
              TableName: "allyR_midTerm",
              Key: {
                ShapeID: { S: updateID },
              },
            });
            const response = await client.send(command);
            console.log(response);

            // re-populating this ID with new side dimension/volume
            var sideDimension = theJSON.sideDimension
            updateDB({"shapeID": updateID, "sideDimension": sideDimension});

            let returnVal = {status: "Update successful"};
            return returnVal;

} catch (err) {
        console.log(err);
        const result = {
        status: "Update failure"
        };

        return result;  
}
};

// route for query
app.post("/queryData", function (req,res){
    console.log("/queryData with " + req.body)
    queryData(req.body).then(function(returnVal) {
        console.log("Returned " + returnVal);
        // send() method returns HTML to the caller / client 
        res.json(returnVal);
      });
});

// route for populating DynamoDB
app.post("/updateDB", function(req, res) {
  console.log("/updateDB with " + req.body)
  updateDB(req.body).then(function(returnVal) {
    console.log("Returned " + returnVal);
    // send() method returns HTML to the caller / client 
    res.json(returnVal);
  });
});

// route for updating shape 
app.post('/updateShape', function(req,res){
    console.log("/updateDB with " + req.body)
    updateShape(req.body).then(function(returnVal) {
        console.log("Returned " + returnVal);
        // send() method returns HTML to the caller / client 
        res.json(returnVal);
    });
});



app.get("/", function(req, res) {
  let html = "<h1>get /</h1>"
  console.log("get /");
  res.send(html)
});

app.put("/", function(req, res) {
  let html = "<h1>put /</h1>"
  console.log("put /");
  res.send(html)
});

app.post("/", function(req, res) {
  let html = "<h1>post /</h1>"
  console.log("post /");
  res.send(html)
});

// START A SERVER 
app.listen(3000, function() {
    console.log("Listening on port 3000..."); // RECOMMENDED
 });
