from pymongo import MongoClient
import random

uri = "mongodb+srv://huyngovoquang:8LqONnokekwDmr9D@grabfood.agpqcez.mongodb.net/?retryWrites=true&w=majority&appName=GrabFood"

client = MongoClient(uri)

db = client['GrabFoodDB']

old_dishes = db['dishes']

new_dishes = db['new_dishes']

documents = list(old_dishes.find())


random.shuffle(documents)

new_dishes.insert_many(documents)

print("Cloning, shuffling, and inserting completed successfully.")
