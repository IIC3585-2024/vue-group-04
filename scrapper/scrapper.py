import requests
from bs4 import BeautifulSoup
import json
import time
# Define the URL of the webpage to scrape
url = "https://es.wikiloc.com/rutas/senderismo/chile"  # Replace with the target URL


def url_generator(base_url, page_number):
    return f"{base_url}?page={page_number}"


headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
}


data = []

last_page = 100  # Replace with the number of pages you want to scrape
for page_number in range(1, last_page + 1):
    response = requests.get(url_generator(url, page_number), headers=headers)
    response.raise_for_status()  # Raise an error if the request was unsuccessful
    time.sleep(1)  # Wait for 1 second to avoid being blocked
    soup = BeautifulSoup(response.content, "html.parser")
    for trail_list_item in soup.find_all(class_="trail-card-with-description"):

        try:
            title = trail_list_item.find(class_="trail-card-with-description__title")
            activity = trail_list_item.find(class_="trail-card-with-description__activity")
            description = trail_list_item.find(class_="trail-card-with-description__description")

            images = trail_list_item.find(class_="trail__images")
            pictures = list(map(lambda x: x["src"], images.find_all("img")))

            detail = trail_list_item.find(class_="trail-card-with-description__detail")

            detail_author = detail.find(class_="trail-card-with-description__detail__author")
            detail_author_name = detail_author.find(class_="trail-card-with-description__detail__author__name")
            detail_author_avatar = detail_author.find(class_="trail-card-with-description__detail__author__img")["src"]

            detail_stats = detail.find(class_="trail-card-with-description__detail__stats").find_all("div")
            detail_stats_distance = detail_stats[0].find(class_="trail-card-with-description__detail__stats__value")
            detail_stats_elevation = detail_stats[1].find(class_="trail-card-with-description__detail__stats__value")
            detail_stats_rank = detail_stats[2].find(class_="trail-card-with-description__detail__stats__value")

            data.append({
                "title": title.text,
                "activity": activity.text,
                "description": description.text,
                "pictures": pictures,
                "author": {
                    "name": detail_author_name.text,
                    "avatar": detail_author_avatar
                },
                "stats": {
                    "distance": detail_stats_distance.text,
                    "elevation": detail_stats_elevation.text,
                    "rank": detail_stats_rank.text
                }
            })
        except Exception as e:
            print(f"An error occurred: {e}")




# Output the data as JSON
json_output = json.dumps(data, indent=4)

with open("output.json", "w") as file:
    file.write(json_output)
