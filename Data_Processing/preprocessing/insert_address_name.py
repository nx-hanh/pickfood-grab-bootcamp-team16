import requests
import json
from pymongo import MongoClient

uri = "mongodb+srv://huyngovoquang:8LqONnokekwDmr9D@grabfood.agpqcez.mongodb.net/?retryWrites=true&w=majority&appName=GrabFood"

# MongoDB connection setup
client = MongoClient(uri)
db = client['GrabFoodDB']  # Replace with your database name
restaurants_collection = db['restaurants']  # Replace with your collection name

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Content-Type': 'application/json; charset=utf-8',
    'Referer': 'https://food.be.com.vn/',
    'app_version': '11257',
    'version': '1.1.257',
    'Origin': 'https://food.be.com.vn',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjowLCJhdWQiOiJndWVzdCIsImV4cCI6MTcxNTgzOTczMCwiaWF0IjoxNzE1NzUzMzMwLCJpc3MiOiJiZS1kZWxpdmVyeS1nYXRld2F5In0.VNm8MhyPek0WKWV60l7JtkViuoUuG_2L5uXQZGc--Qc',
    'Connection': 'keep-alive',
}

def get_address_from_api(lat, long):
    data = {
        "latitude": lat,
        "longitude": long
    }

    response = requests.post('https://gw.be.com.vn/api/v1/be-delivery-gateway/maps/geocode', headers=headers, json=data)
    if response.status_code == 200:
        response_object = response.json()
        address = response_object.get("address", {})
        return address
    else:
        print(f"Error: Unable to get address for lat {lat}, long {long}")
        return None
def get_address_from_osm(lat, lon):
    url = f'https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}&addressdetails=1'
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    if response.status_code == 200:
        response_json = response.json()
        if 'display_name' in response_json:
            return response_json['display_name']
        else:
            print(f"No address found for lat {lat}, lon {lon}")
            return None
    else:
        print(f"Error: Unable to get address for lat {lat}, lon {lon}")
        return None
    
    
def main():
    # Fetch all restaurants from the collection
    restaurants = restaurants_collection.find({"address": {"$exists": False}})

    for restaurant in restaurants:
        location = restaurant.get("location", {})
        lat = location[0]
        long = location[1]
        if lat is not None and long is not None:
                address = get_address_from_api(lat, long)
                if address:
                    # Update the restaurant document with the new address
                    restaurants_collection.update_one(
                        {"_id": restaurant["_id"]},
                        {"$set": {"address": address}}
                    )
                else:
                    address = get_address_from_osm(lat,long)
                    if address:
                        restaurants_collection.update_one(
                        {"_id": restaurant["_id"]},
                        {"$set": {"address": address}}
                    )
                print(f"Updated restaurant ID {restaurant['_id']} with address: {address}")
        else:
            print(f"Skipping restaurant ID {restaurant['_id']} due to missing lat/long")

if __name__ == "__main__":
    main()
