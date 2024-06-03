import json
import requests
import time
import random


with open('./db.json', 'r', encoding='utf-8') as file:
    data = json.load(file)


def get_coords_from_nominatim(query):
    url = f'https://nominatim.openstreetmap.org/search?q={query}&format=json&countrycodes=CL'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        results = response.json()
        if results:
            location = results[0]
            return float(location['lat']), float(location['lon'])
    except requests.exceptions.RequestException as e:
        print(f'Error fetching data for {query}: {e}')
    return None, None


progress = 0
for walk in data['walks']:
    query = walk['title']
    lat, lon = get_coords_from_nominatim(query)
    if lat is None or lon is None:
        lat, lon = -60 + random.random() * (56.5 - 17.5), -70 + random.random() * (71 - 74)
    walk['latitude'] = lat
    walk['longitude'] = lon
    time.sleep(1)
    progress += 1
    if progress % 10 == 0:
        print(f'Procesando... {progress}/{len(data["walks"])}')


with open('./db.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

print('Archivo db.json actualizado con coordenadas reales o aleatorias.')
