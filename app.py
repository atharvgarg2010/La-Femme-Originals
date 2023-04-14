import requests

url = "https://v1.nocodeapi.com/atharv_garg/google_sheets/kJyvoEgffNqLfEqE"
params = {"tabId": "Orders"}
data = [["Atharv Garg", "gargatharv2010@gmail.com", "9599835998", "45x madan bagh, North Gujrati Park, Old Hastinapur"]]
r = requests.post(url = url, params = params, json = data)
result = r.json()
print(result)