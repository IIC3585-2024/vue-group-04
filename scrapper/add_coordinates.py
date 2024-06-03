import json
import random

# Leer el archivo JSON
with open('./db.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Función para generar coordenadas aleatorias dentro de Chile
def get_random_coords():
    lat = -60 + random.random() * (56.5 - 17.5)  # Latitud aproximada de Chile (17.5°S a 56.5°S)
    lon = -70 + random.random() * (71 - 74)  # Longitud aproximada de Chile (66°W a 75°W)
    return lat, lon

# Agregar coordenadas a cada "walk"
for walk in data['walks']:
    lat, lon = get_random_coords()
    walk['latitude'] = lat
    walk['longitude'] = lon

# Guardar el archivo JSON actualizado
with open('./db.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

print('Archivo db.json actualizado con coordenadas aleatorias.')
