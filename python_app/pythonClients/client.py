import http.client
import json

''' ----> Hello world API <---- '''
conn = http.client.HTTPConnection("localhost", 5000)
conn.request("GET", "/")
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))


''' ----> Send/get JSON API <----'''
conn = http.client.HTTPConnection("localhost", 5000)
payload = json.dumps({
    "name": "Nikhil Aggarwal",
    "age": 20,
    "id": 1
})
headers = {
    'Content-Type': 'application/json'
}
conn.request("POST", "/getJSON", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))