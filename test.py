import requests

url = 'http://localhost:8080/stops-for-route/1_100224'

response = requests.get(url)
print(response.json())

