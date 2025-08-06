import requests

url = "http://127.0.0.1:5001/check_out"
payload = {
    "projectId": "minuk",
    "hwSetName": "HWSet1",
    "qty": 5,
    "userId": "xs12"
}
headers = {'Content-Type': 'application/json'}
response = requests.post(url, json=payload, headers=headers)

print("Status Code:", response.status_code)
try:
    print("RESPONSE JSON:", response.json())
except requests.exceptions.JSONDecodeError:
    print("❌ Server returned non-JSON response")
    print("Raw response:", response.text)