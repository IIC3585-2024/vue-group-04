import json
import random


with open('./db.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Función para generar coordenadas aleatorias dentro de Chile
def get_random_coords():
    lat = -35 + random.random() * 10
    lon = -71 + random.random() * 10
    return lat, lon

for walk in data['walks']:
    lat, lon = get_random_coords()
    walk['latitude'] = lat
    walk['longitude'] = lon


with open('./db.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

print('Archivo db.json actualizado con coordenadas aleatorias.')
