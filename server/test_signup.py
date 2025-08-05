import requests

url = "http://127.0.0.1:5001/add_user"

payload = {
    "userId": "xs12",
    "password": "password1"
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
