# obu-systems_analysis-allyryan
## Midterm Exam

### AWS Info
DynamoDB Table Name: allyR_midTerm
Primary Key (Partition key): ShapeID
Container Image Name: allyryan_finalexam
Service Name: allyryan_finalexam
Default Domain: https://2xfhk9btb9.us-east-2.awsapprunner.com 


### My 3 Endpoints
- "http://localhost:4040/updateDB" : POST method populates DynamoDB with ShapeID, Shape Side Dimension, and Shape Volume. 
    - It requires the following JSON body:
        - { "shapeID": value1, "sideDimension" : value2}
    - It returns the following JSON body to the client:
        - {"status": success/failure}
- "http://localhost:4040/queryData" 
    1. POST method queries the desired value based on the given paramaters.
    2. GET method generates a table visual with the data from DynamoDB 
        - It accepts two JSON bodies:
            1. {"wantedVal": value1}
                - wantedVal is the column value desired: in this example (ShapeVolume, ShapeID, SideDimension)
            2. {"wantedVal": value2, "condition": value3, "conditionVal":value4, "operator": value5}
        - It returns the following JSON body to the client:
            - {"wantedVal": outputVal}
- "http://localhost:4040/updateShape" 
    1. POST method updates an item already existing in the table
    2. GET method generates a form and takes user input to update a shape item using the Shape ID. 
        - It requires the following JSON body:
            - {"updateVal": idVal, "sideDimension" : sideVal}
        - It returns the following JSON body:
            - {"status": Update successful/update failure}

- "http://localhost:4040/addShape" 
    1. POST method adds shape to the Dyanmo DB table
    2. GET method generates a UI and takes a side dimension and shape ID in a specific format and then adds to the table
         - It requires the following JSON body:
            - { "shapeID": value1, "sideDimension" : value2}
        - It returns the following JSON body to the client:
            - {"status": success/failure}

### Instructions for running client code locally
- Open Repository in VSCode Named: `obu-systems_analysis-allyryan`
- Open first terminal
#### Run Service 
- Run `service.js` in the command line with `node service.js`
#### Run Client File
- Open a second terminal 
- Run `client_file.py` in the command line with `python client_file.py`
#### Run unit tests
- Open a third terminal 
- Run `testing_client.py` in the command line with `python testing_client.py` 
- Code will run 

### Instructions for running code through container & AWS
- Go to AppRunner and find `allyryan_finalexam`. 
- Select `allyryan_finalexam` and press 'Actions' and 'Resume' the service
- Default domain: 'https://2xfhk9btb9.us-east-2.awsapprunner.com'
- To run each route, add the route to the end of the default domain. 
    - Ex. 'https://2xfhk9btb9.us-east-2.awsapprunner.com/addShape'
- **NOTE:** Each client interaction is defined in the console and its response is below it. Ex. "Insert data for Shape101: Success" 
Ex2. "Query results for: ShapeVolume WHERE ShapeID = Shape103 
{"ShapeVolume":1000}"

## To test through UI routes
- "http://localhost:4040/addShape"
    - This will ask you for a side dimension and a shape id. 
    - Enter any dimension
    - Enter a shape id in the format "Shapexyz" where {x,y,z} are all integers
    - Click the 'Create Shape' button to add the shape to DynamoDB table 
    - It will update the /queryData route table as well
- "http://localhost:4040/updateShape"
    - This will generate a drop down menu with a list of the already exsiting shape ID's. 
    - Select the shape ID you want to update
    - Enter a new side dimension 
    - Click the 'Update Shape' button to update the shape in the Dyanmo DB table
- "http://localhost:4040/queryData"
    - This will generate a table showing all the data in the Dynamo DB table
    - When "/addShape" and "/updateShape" are called and submitted, the table will automatically update
    - Just refresh page to see the changes in the table



