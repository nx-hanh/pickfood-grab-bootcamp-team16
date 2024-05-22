import requests
import json
import time
from bs4 import BeautifulSoup
import stem.process

url_1 = "https://food.grab.com/vn/vi/restaurants"
url_2  = "https://portal.grab.com/foodweb/v2/search"
list_id = set()
locations = [
        {'lat': 10.774933761880254, 'lng': 106.68662494349095},
        {'lat': 10.77598867671969, 'lng': 106.68534308704346},
        {'lat': 10.782335625510987, 'lng': 106.68969711655107},
        {'lat': 10.784435443091581, 'lng': 106.69144603232196},
        
        {'lat': 10.787946923695479, 'lng': 106.66834454469348},
        {'lat': 10.783916624679302, 'lng': 106.67840753009938},
        {'lat': 10.790805306503177, 'lng': 106.68256789850311},
        # ---------------------------------------------------
        {'lat': 10.753874738846191, 'lng': 106.68817526619554},
        {'lat': 10.753020265523137, 'lng': 106.69543841471578},
        {'lat': 10.759301337484194, 'lng': 106.69524005141587},
        {'lat': 10.75315518254646, 'lng': 106.7020759561098},
        {'lat': 10.761032455619306, 'lng': 106.7034081443427},
        {'lat': 10.765147107094467, 'lng': 106.70701981768258},
        {'lat': 10.768263564843327, 'lng': 106.7056527479454},
        {'lat': 10.760765901765355, 'lng': 106.70437790672602},
        # ---------------------------------------------------
        {'lat': 10.75033276601958, 'lng': 106.65593671032616},
        {'lat': 10.755881969219578, 'lng': 106.65412050843291},
        {'lat': 10.75001158713842, 'lng': 106.66127634313628},
        {'lat': 10.7553645236856, 'lng': 106.66463631619727},
        {'lat': 10.754534441341168, 'lng': 106.68410163771784},
        {'lat': 10.755002188871503, 'lng': 106.66725184305818},
        {'lat': 10.757582597731894, 'lng': 106.65278502944106},
        {'lat': 10.761646081168047, 'lng': 106.66848575580043},
        {'lat': 10.762295566102178, 'lng': 106.68262405656057},
        # ---------------------------------------------------
        {'lat': 10.739338424529647, 'lng': 106.63621758485694},
        {'lat': 10.743048886839976, 'lng': 106.631654154045},
        {'lat': 10.743744593448211, 'lng': 106.64565916584718},
        {'lat': 10.754098527247509, 'lng': 106.63473158957481},
        {'lat': 10.747044128102765, 'lng': 106.63142696171597},
        # ---------------------------------------------------
        {'lat': 10.70474803413083, 'lng': 106.73218667422857},
        {'lat': 10.70657177178163, 'lng': 106.7436638393621},
        {'lat': 10.71059139985845, 'lng': 106.7440426236762},
        {'lat': 10.714052703518494, 'lng': 106.7368836001398},
        {'lat': 10.713085031210102, 'lng': 106.73150486287965},
        {'lat': 10.706795085851523, 'lng': 106.72915640013225},
        {'lat': 10.745056122820426, 'lng': 106.71004698091618},
        {'lat': 10.7708628116785, 'lng': 106.7389381912914},
        {'lat': 10.751119258303955, 'lng': 106.73406497886498},
        {'lat': 10.741638346852474, 'lng': 106.70195790905964},
        {'lat': 10.737420123117996, 'lng': 106.71208704986618},
        {'lat': 10.749221011921716, 'lng': 106.71084950934686},
        {'lat': 10.752403596975155, 'lng': 106.72024025863604},
        {'lat': 10.737405590252235, 'lng': 106.75191026443946}

    ]

brief_locations = [
    {'lat' : 10.793940524972125, 'lng': 106.73133257616024},
    {'lat' : 10.794109149104433, 'lng': 106.73021677725703},
    {'lat' : 10.78262315432622, 'lng': 106.68657519183},
    {'lat' : 10.761029178027023, 'lng': 106.70345985891825},
    {'lat' : 10.75532523512031, 'lng': 106.66432689480897},
    {'lat' : 10.742726659158544, 'lng': 106.63263886043192},
    {'lat' : 10.70474803413083, 'lng': 106.73218667422857},
    {'lat': 10.752403596975155, 'lng': 106.72024025863604}
]

tor_process = None

def start_tor():
    return stem.process.launch_tor_with_config(
        config = {
            'SocksPort': str(9050),
        },
    )

def restart_tor():
    global tor_process
    tor_process.kill()
    time.sleep(10)
    tor_process = start_tor()
    print("Tor restarted!")


def add_restaurant(restaurant_id):
    if restaurant_id in list_id:
        print(f"Duplicate {restaurant_id}")
        return
    list_id.add(restaurant_id)
    with open("restaurant.txt", "a", encoding='utf-8') as file:
        file.write(restaurant_id + '\n')
    print(f"Added {restaurant_id}")

def parse_first_page():
    with open("first_page.html", "r", encoding='utf-8') as file:
        content = file.read()
    soup = BeautifulSoup(content, "html.parser")
    matching_links = soup.find_all("a", attrs={'style': 'color:inherit;text-decoration:none'})
    for link in matching_links:
        href_value = link['href']
        desired_text = href_value.split('/')[-1].split('?')[0]  # Extract the desired part from the href
        add_restaurant(desired_text)

def get_first_page(lat, long):
    headers = {
        "Host": "food.grab.com",
        "Cookie": f"gfc_country=VN; _hjSessionUser_1532049=eyJpZCI6ImZkMWQ0ODc1LTY4MjItNWJkMC05YzVjLTZhYjdhNWRlYmYzMCIsImNyZWF0ZWQiOjE3MTQxMzEyMzQyNDcsImV4aXN0aW5nIjp0cnVlfQ==; hwuuid=f919718d-cc80-437a-92dd-cd2953d7661d; hwuuidtime=1714131284; _gsvid=bb8e13ac-60e2-4706-94d2-7234a12eccfa; _gcl_au=1.1.218718802.1714212952; _hjSessionUser_1740618=eyJpZCI6ImRhNjEwMjcxLWM2ZDUtNTg5OC04NDRjLWM3MWE1NGE5YTAzZCIsImNyZWF0ZWQiOjE3MTQyMTMxMjQ0MTUsImV4aXN0aW5nIjp0cnVlfQ==; _gid=GA1.2.2127332638.1714214020; _fbp=fb.1.1714214020373.1875437786; location=%7B%22id%22%3A%22IT.3HJYRZNLF3ZNS%22%2C%22latitude%22%3A{lat}%2C%22longitude%22%3A{long}%2C%22address%22%3A%2246%20C%C3%A1ch%20M%E1%BA%A1ng%20Th%C3%A1ng%208%2C%20P.V%C3%B5%20Th%E1%BB%8B%20S%C3%A1u%2C%20Q.3%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%2070000%2C%20Vietnam%22%2C%22countryCode%22%3A%22VN%22%2C%22isAccurate%22%3Atrue%2C%22addressDetail%22%3A%2246%20C%C3%A1ch%20M%E1%BA%A1ng%20Th%C3%A1ng%208%20-%2046%20C%C3%A1ch%20M%E1%BA%A1ng%20Th%C3%A1ng%208%2C%20P.V%C3%B5%20Th%E1%BB%8B%20S%C3%A1u%2C%20Q.3%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%2070000%2C%20Vietnam%22%2C%22noteToDriver%22%3A%22%22%2C%22city%22%3A%22Ho%20Chi%20Minh%20City%22%2C%22cityID%22%3A9%2C%22displayAddress%22%3A%2246%20C%C3%A1ch%20M%E1%BA%A1ng%20Th%C3%A1ng%208%20-%2046%20C%C3%A1ch%20M%E1%BA%A1ng%20Th%C3%A1ng%208%2C%20P.V%C3%B5%20Th%E1%BB%8B%20S%C3%A1u%2C%20Q.3%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%2070000%2C%20Vietnam%22%7D; _ga=GA1.1.1370911988.1714212987; _ga_RPEHNJMMEM=GS1.1.1714241620.2.1.1714242930.27.0.848899242; gfc_session_guid=542f9aa1-178c-4db7-8a99-5b004fdf0152; next-i18next=vi; _gssid=2403280142-980ro3dcr5w; _hjSession_1532049=eyJpZCI6ImQyNjQ2MmQzLWM2ZDktNGQ3ZS04NjkzLTg1OTY4OTliYWQyOCIsImMiOjE3MTQyNjg1NzcwMDUsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=",
        "Cache-Control": "max-age=0",
        "Sec-Ch-Ua": "\"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.60 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Priority": "u=0, i"
    }
    while True:
        session = requests.Session()
        response = session.get(url_1, headers=headers)
        if (response.status_code != 200):
            print(f"Error (First page) {response.status_code}")
        with open("first_page.html", "w", encoding='utf-8') as file:
            file.write(response.text)
        parse_first_page()
        break

def parse_loaded_page():
    # parse json
    with open(f"loaded_page.json", "r", encoding='utf-8') as file:
        content = file.read()
    data = json.loads(content)
    for restaurant in data["searchResult"]["searchMerchants"]:
        add_restaurant(restaurant["id"])


def get_loaded_page(lat, long, offset, session):
    payload = {
        "latlng": f"{lat},{long}",
        "keyword": "",
        "offset": offset,
        "pageSize": 32,
        "countryCode": "VN"
    }
    headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.60 Safari/537.36",
        "Accept-Language": "vi",
        "X-Grab-Web-App-Version": "7gqMfezL5thCKA6bc5kUX",
        "X-Gfc-Country": "VN",
        "X-Country-Code": "VN",
        "Origin": "https://food.grab.com",
        "Referer": "https://food.grab.com/",
        "Accept-Encoding": "gzip, deflate, br"
    }
    while True:
        response = session.post(url_2, json=payload, headers=headers)
        if (response.status_code != 200):
            print(f"Error (Loaded page) {response.status_code}")
            if response.status_code == 429: # Too many requests
                restart_tor() # Change IP
                continue
        with open(f"loaded_page.json", "w", encoding='utf-8') as file:
            file.write(response.text)
        parse_loaded_page()
        break

def load_restaurant_id():
    with open("restaurant.txt", "r", encoding='utf-8') as file:
        for line in file:
            list_id.add(line.strip())

if __name__ == "__main__":
    tor_process = start_tor()
    print("Tor started!")
    load_restaurant_id()
    offsetList = [32, 64, 93, 114, 137, 167, 197, 227, 251, 279]
    session = requests.Session()
    session.proxies = {'http': 'socks5://127.0.0.1:9050', 'https': 'socks5://127.0.0.1:9050'}
    for id_, location in enumerate(locations):
        try:
            lat, long = location['lat'], location['lng']
            get_first_page(lat, long)
            for offset in offsetList:
                try:
                    get_loaded_page(lat, long, offset, session)
                    print(f"Offset {offset} done!")
                except:
                    print(f"Offset {offset} failed!")
            print(f"Location {id_} done!")
            time.sleep(2)
        except:
            print(f"Location {id_} failed!")
    tor_process.kill()