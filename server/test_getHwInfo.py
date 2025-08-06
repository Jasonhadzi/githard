import requests

url = "http://127.0.0.1:5001/get_hw_info"
params = {"hwName": "HWSet1"}
response = requests.get(url, params=params)

print("STATUS:", response.status_code)

try:
    json_response = response.json()
    print("RESPONSE JSON", json_response)

    if response.status_code == 200:
        print("✅ Hardware retrieved successfully.")
    elif response.status_code == 404:
        print("ℹ️ Hardware not found (as expected for invalid test ID).")
    else:
        print("❌ Unexpected status code:", response.status_code)
    
except requests.exceptions.JSONDecodeError:
    print("❌ Response is not valid JSON")
    print("RAW RESPONSE:", response.text)