# obu-systems_analysis-allyryan
## Midterm Exam

### Dynamo DB Table Name
Table Name: allyR_midTerm
Primary Key (Partition key): ShapeID

### My 3 Endpoints
- "http://localhost:3000/updateDB" populates DynamoDB with ShapeID, Shape Side Dimension, and Shape Volume.
    - It requires the following JSON body:
        - { "shapeID": value1, "sideDimension" : value2}
    - It returns the following JSON body to the client:
        - {"status": success/failure}
- "http://localhost:3000/queryData" queries the desired value based on the given paramaters.
    - It accepts two JSON bodies:
        1. {"wantedVal": value1}
            - wantedVal is the column value desired: in this example (ShapeVolume, ShapeID, SideDimension)
        2. {"wantedVal": value2, "condition": value3, "conditionVal":value4, "operator": value5}
    - It returns the following JSON body to the client:
        - {"wantedVal": outputVal}
- "http://localhost:3000/updateShape" updates an item already existing in the table
    - It requires the following JSON body:
        - {"updateVal": idVal, "sideDimension" : sideVal}
    - It returns the following JSON body:
        - {"status": Update successful/update failure}

### Instructions for running client code
- Open Repository in VSCode Named: `obu-systems_analysis-allyryan`
- Open first terminal
- Run `service.js` in the command line with `node service.js`
- Open a second terminal 
- Run `client_file.py` in the command line with `python client_file.py`
- Code will run 
- **NOTE:** Each client interaction is defined in the console and its response is below it. Ex. "Insert data for Shape101: Success" 
Ex2. "Query results for: ShapeVolume WHERE ShapeID = Shape103 
{"ShapeVolume":1000}"






