import requests

url = "http://127.0.0.1:5001/login"

payload = {
    "userId": "xs12",
    "password": "password"
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print("STATUS:", response.status_code)

try:
    print("RESPONSE JSON:", response.json())
except requests.exceptions.JSONDecodeError:
    print("❌ Server returned non-JSON response")
    print("Raw response:", response.text)
