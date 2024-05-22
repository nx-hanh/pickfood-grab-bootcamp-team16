import requests
from pymongo import MongoClient
import stem.process
import time
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime,timedelta
from airflow.utils.dates import days_ago

URI = "mongodb+srv://huyngovoquang:8LqONnokekwDmr9D@grabfood.agpqcez.mongodb.net/?retryWrites=true&w=majority&appName=GrabFood"
TOR_PROCESS = None

def init_mongodb_conn(uri=URI):
    
    client = MongoClient(uri)
    try:
        client.admin.command('ping')
        return client
    except Exception as e:
        print(e)
        return None


def get_restaurants(client):
    db = client['GrabFoodDB']
    col = db['restaurants']
    
    restaurants = []
    
    query_result = col.find({},{'id':1})
    
    for object in query_result:
        restaurants.append(object['id'])
    
    return restaurants

def mongodb_get_dishes_by_restaurant_id(client,restaurant_id):
    
    db = client['GrabFoodDB']
    col = db['dishes']
    
    query_result = col.find({"merchant_id":restaurant_id},{'_id':0,'id':1,'name':1,'price':1,'description':1})
        
    dishes_info = []
    for object in query_result:
        dishes_info.append(object)
        
    return dishes_info

def check_exist_dish(client,restaurant_id,dish_id):
    
    dishes = mongodb_get_dishes_by_restaurant_id(client,restaurant_id)
    
    ids = [dish['id'] for dish in dishes]
    
    if dish_id in ids:       
        return True
    else:
        return False
    

def api_get_dishes_by_restaurant_id(restaurant_id, session):
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
    
    dishes = {}
    if 'categories' in merchant['menu']:
        for category in merchant['menu']['categories']:
            for item in category.get('items', []):
                dish_id = item['ID']
                dishes[dish_id] = {
                    'id': item['ID'],
                    'name': item['name'],
                    'imgLink': item.get('imgHref', ""),
                    'price': item.get('priceInMinorUnit', 0),
                    'description': item.get('description', ""),
                    'merchant_id': item['merchantID']
                }
    
    return dishes

def update_dish(client,restaurant_id):
    db = client['GrabFoodDB']
    collection = db['dishes']
    session = requests.Session()
    print(f'Restaurant {restaurant_id}')
    session.proxies = {'http': 'socks5://127.0.0.1:9050', 'https': 'socks5://127.0.0.1:9050'}
    mongodb_dishes = mongodb_get_dishes_by_restaurant_id(client,restaurant_id)
    api_dishes = api_get_dishes_by_restaurant_id(restaurant_id,session)
    
    ids = [dish['id'] for dish in mongodb_dishes]
    names = [dish['name'] for dish in mongodb_dishes]
    for dish_id, api_dish in api_dishes.items():
        
        if dish_id in ids or api_dish['name'] in names:
            
            # If dish exists in MongoDB, update it
            collection.update_one(
                {'id': dish_id, 'merchant_id': restaurant_id},
                {'$set': api_dish}
            )
            print(f"Updated dish {dish_id}")
        else:
            # If dish does not exist in MongoDB, insert it
            collection.insert_one(api_dish)
            print(f"Inserted new dish {dish_id}")
        

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
    
    
def run_update_task():
    client = init_mongodb_conn()
    if client is None:
        print("Cannot connect to MongoDB")
        exit()
    global TOR_PROCESS
    TOR_PROCESS = start_tor()
    restaurants=get_restaurants(client)
    for restaurant_id in restaurants:
        update_dish(restaurant_id)
    TOR_PROCESS.kill()


default_args = {
    'owner':'group16-be',
    'depends_on_past':False,
    'start_date': days_ago(1),
    'retry':1,
    'email':['nvqhuy21@gmail.com'],
    'email_on_failed':True,
    'email_on_retry': False,
    'retry_delay':timedelta(minutes=3),
}

with DAG(
    'update_dish_dag',
    default_args=default_args,
    decsription='A DAG to update dishes daily',
    schedule_interval=timedelta(days=1)
) as dag:
    update_task = PythonOperator(
        task_id='run_update_task',
        python_callable=run_update_task
    )

    update_task

    
