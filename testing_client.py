
import unittest
import requests
import json

class TestDemo(unittest.TestCase):
    def test_001(self):
        payload = { "shapeID": "Shape101", "sideDimension" : "7"}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/updateDB", json=payload, headers=header)
        data = json.loads(r.text)
        answer = data["status"]
        self.assertEqual(answer, "Success")

    def test_002(self):
        payload = { "shapeID": "Shape102", "sideDimension" : "24"}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/updateDB", json=payload, headers=header)
        data = r.json()
        answer = data["status"]
        self.assertEqual(answer, "Success")

    def test_003(self):
        payload = { "shapeID": "Shape103", "sideDimension" : "10"}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/updateDB", json=payload, headers=header)
        data = r.json()
        answer = data["status"]
        self.assertEqual(answer, "Success")

    def test_004(self):
        payload = {}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/updateDB", json=payload, headers=header)
        data = r.json()
        answer = data["status"]
        self.assertEqual(answer, "Failure")

    def test_005(self):
        payload = {"wantedVal": "ShapeVolume", "condition": "ShapeID", "conditionVal":"Shape103", "operator": "="}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/queryData", json=payload, headers=header)
        data = r.json()
        answer = data
        self.assertEqual(answer, '{"ShapeVolume":1000}')

    def test_006(self):
        payload = {"shapeID": "Shape102", "sideDimension" : "30"}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/updateShape", json=payload, headers=header)
        data = r.json()
        answer = data["Attributes"]["ShapeVolume"]
        ## this is new volume and proves the update
        self.assertEqual(answer, 13824)

    def test_007(self):
        payload = {"shapeID": "Shape102", "sideDimension" : "30"}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/updateShape", json=payload, headers=header)
        data = r.json()
        answer = data["status"]
        ## this is new volume and proves the update
        self.assertEqual(answer, "Update success")

    def test_008(self):
        payload = {"wantedVal": "Shape102", "sideDimension" : "30"}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/updateShape", json=payload, headers=header)
        data = r.json()
        answer = data["status"]
        ## this is new volume and proves the update
        self.assertEqual(answer, "Update failure")

    def test_009(self):
        payload = { "shapeID": "Shape244", "sideDimension" : "94"}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/addShape", json=payload, headers=header)
        data = json.loads(r.text)
        answer = data["status"]
        self.assertEqual(answer, "Success")

    def test_010(self):
        ## JSON key error
        payload = { "shaPeID": "Shape244", "sideDimension" : "94"}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/addShape", json=payload, headers=header)
        data = json.loads(r.text)
        answer = data["status"]
        self.assertEqual(answer, "Failure")

    def test_011(self):
        ## Bad data
        payload = { "shapeID": 23, "sideDimension" : "Shape2"}
        header = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        r = requests.post("http://localhost:4040/addShape", json=payload, headers=header)
        data = json.loads(r.text)
        answer = data["status"]
        self.assertEqual(answer, "Failure")


if __name__ == '__main__':
    unittest.main()