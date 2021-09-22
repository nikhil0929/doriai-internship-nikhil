import requests

url = "http://localhost:5000/sendFile"

payload = {}
files = [
    ('file', ('monaDog.jpeg', open('/Users/nikhilaggarwal/Downloads/monaDog.jpeg', 'rb'), 'image/jpeg'))
]
headers = {}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)
