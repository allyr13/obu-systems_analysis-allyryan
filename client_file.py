import requests
import json

payload = { "shapeID": "Shape101", "sideDimension" : "7"}
header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post("http://localhost:3000/updateDB", json=payload, headers=header)
data = r.json()
print("Insert data for Shape101: ")
print(data["status"])

payload = { "shapeID": "Shape102", "sideDimension" : "24"}
header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post("http://localhost:3000/updateDB", json=payload, headers=header)
data = r.json()
print("Insert data for Shape102: ")
print(data["status"])

payload = { "shapeID": "Shape103", "sideDimension" : "10"}
header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post("http://localhost:3000/updateDB", json=payload, headers=header)
data = r.json()
print("Insert data for Shape103: ")
print(data["status"])

payload = { "shapeID": "Shape104", "sideDimension" : "90"}
header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post("http://localhost:3000/updateDB", json=payload, headers=header)
data = r.json()
print("Insert data for Shape104: ")
print(data["status"])

payload = { "shapeID": "Shape105", "sideDimension" : "15"}
header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post("http://localhost:3000/updateDB", json=payload, headers=header)
data = r.json()
print("Insert data for Shape105: ")
print(data["status"])

payload = {}
header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post("http://localhost:3000/updateDB", json=payload, headers=header)
data = r.json()
print("Insert empty data attempt: ")
print(data["status"])

payload1 = {"wantedVal": "ShapeVolume"}
header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r1 = requests.post("http://localhost:3000/queryData", json=payload1, headers=header)
data = r1.json()
print("Query for shapeVolume: ")
print(data)

payload = {"updateVal": "Shape102", "sideDimension" : "30"}
header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post("http://localhost:3000/updateShape", json=payload, headers=header)
data = r.json()
print("Update volume for Shape102: ")
print(data["status"])


