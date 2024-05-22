import os
import requests
from pymongo import MongoClient
import stem.process
import time

# CONNECTION STRING: This string is used to connect to MongoDB
URI = "mongodb+srv://huyngovoquang:8LqONnokekwDmr9D@grabfood.agpqcez.mongodb.net/?retryWrites=true&w=majority&appName=GrabFood"
TOR_PROCESS = None

# This function is used to get or create a database
def get_database(database_name):
    client = MongoClient(URI)
    try:
        client.admin.command('ping')
        print("Successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    return client[database_name]

def get_collection(database_name, collection_name):
    client = MongoClient(URI)
    db = client[database_name]
    try:
        client.admin.command('ping')
        print("Successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    return db[collection_name]

# This function is used to get all restaurant IDs stored in a specified txt file.
def get_restaurants(filename):
    with open(filename, 'r') as file:
        return [line.strip() for line in file]

# This function is used to get specified restaurant's information
def get_restaurant_info(restaurant_id, collection, session):
    url = f'https://portal.grab.com/foodweb/v2/merchants/{restaurant_id}'
    global TOR_PROCESS
    
    while True:
        response = session.get(url)
        if response.status_code != 429:
            break
        else:
            restart_tor()
    
    json_data = response.json()
    merchant = json_data['merchant']
    
    restaurant_info = {
        'id': merchant['ID'],
        'name': merchant['name'],
        'cuisine': merchant['cuisine'],
        'location': [merchant['latlng']['latitude'], merchant['latlng']['longitude']],
        'imgLink': merchant.get('photoHref', ""),
        'openingHours': {day: merchant['openingHours'][day] for day in ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] if day in merchant['openingHours']},
        'status': merchant['status']
    }
    
    try:
        collection.update_one({'id': restaurant_info['id']}, {'$set': restaurant_info}, upsert=True)
        print(f"Successfully pushed restaurant {restaurant_info['id']}")
    except Exception as e:
        print(e)
        print(f"Restaurant {restaurant_info['id']} was not pushed to MongoDB")

# This function is used to get restaurant's menu
def get_dish_info(restaurant_id, collection, session):
    url = f'https://portal.grab.com/foodweb/v2/merchants/{restaurant_id}'
    global TOR_PROCESS

    while True:
        response = session.get(url)
        if response.status_code != 429:
            break
        else:
            restart_tor()
    
    json_data = response.json()
    merchant = json_data['merchant']
    
    dishes = []
    if 'categories' in merchant['menu']:
        for category in merchant['menu']['categories']:
            for item in category.get('items', []):
                dish = {
                    'id': item['ID'],
                    'name': item['name'],
                    'imgLink': item.get('imgHref', ""),
                    'price': item.get('priceInMinorUnit', 0),
                    'description': item.get('description', ""),
                    'merchant_id': item['merchantID']
                }
                dishes.append(dish)
    
    for dish in dishes:
        try:
            collection.update_one({'id': dish['id']}, {'$set': dish}, upsert=True)
            print(f"Successfully pushed dish {dish['id']}")
        except Exception as e:
            print(e)
            print(f"Dish {dish['id']} was not pushed to MongoDB")

# Push all restaurants to MongoDB
def push_all_restaurants_to_mongodb():
    session = requests.Session()
    session.proxies = {'http': 'socks5://127.0.0.1:9050', 'https': 'socks5://127.0.0.1:9050'}
    database = get_database("GrabFoodDB")
    collection = database["restaurants"]
    restaurants = get_restaurants("restaurants.txt")
    
    try:
        for restaurant in restaurants:
            get_restaurant_info(restaurant, collection, session)
        print("Pushed restaurant data successfully!")
    except Exception as e:
        print(e)
        print("Something went wrong during pushing restaurant data")

# Push all dishes to MongoDB
def push_all_dishes_to_mongodb():
    session = requests.Session()
    session.proxies = {'http': 'socks5://127.0.0.1:9050', 'httzdps': 'socks5://127.0.0.1:9050'}
    database = get_database("GrabFoodDB")
    collection = database["dishes"]
    restaurants = database.restaurants.find({}, {"id": 1})
    
    try:
        for restaurant in restaurants:
            get_dish_info(restaurant['id'], collection, session)
        print("Pushed dish data successfully!")
    except Exception as e:
        print(e)
        print("Something went wrong during pushing dish data")


# Start Tor process
def start_tor():
    return stem.process.launch_tor_with_config(config={'SocksPort': str(9050)})

# Restart Tor process
def restart_tor():
    global TOR_PROCESS
    TOR_PROCESS.kill()
    time.sleep(10)
    TOR_PROCESS = start_tor()
    print("Tor restarted!")

if __name__ == '__main__':
    TOR_PROCESS = start_tor()
    push_all_restaurants_to_mongodb()
    push_all_dishes_to_mongodb()
    TOR_PROCESS.kill()
