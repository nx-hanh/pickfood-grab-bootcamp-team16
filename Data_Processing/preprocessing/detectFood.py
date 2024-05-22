import json
from trie import Trie
import re
import unicodedata

delimiter_list = [" ", "(", ")" , ",", ".", ":", ";", "!", "?", "\n", "\t", "\r"]
delimiters = "[(),;| /.:;!?]"
max_word_in_food_name = 3

trie = Trie()

def delimiter(c):
    return (c in delimiter_list)


def normalize_text(text):
    text = text.replace("\u00A0", " ")
    return unicodedata.normalize("NFD", text.strip()).lower()

def extractName(query):
    query = normalize_text(query)
    query = re.split(delimiters, query)
    matchs = set()
    for i in range(len(query)):
        for j in range(i + 1, min(i + max_word_in_food_name + 1, len(query) + 1)):
            tmp = " ".join(query[i:j])
            if tmp in matchs:
                continue
            if trie.search(tmp):
                matchs.add(tmp)
    # set to list
    matchs = list(matchs)
    return matchs

def get_list_dishes(fileName = "dishes_tmp.json"):
    with open(fileName, "r", encoding='utf-8') as file:
        dishes = json.load(file)
        print(dishes)
    return dishes

def load_food_list(fileName = "foodName.txt"):
    with open(fileName, "r", encoding='utf-8') as file:
        food_list = file.readlines()
        for i in range(len(food_list)):
            food_list[i] = normalize_text(food_list[i])
            trie.insert(food_list[i])
    
# write to json file
def write_to_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    load_food_list()
    list_dishes = get_list_dishes()
    dishes = []
    cant_detect = []
    total_dishes = len(list_dishes)
    done_percent = 5

    # text = "Latte"
    # text = normalize_text(text)
    # print(extractName(text))
    # print(trie.search(text))

    # exit(0)
    
    for i, dish in enumerate(list_dishes):    
        name_extracted = extractName(dish['name'])
        print(name_extracted)
        if (len(name_extracted) == 0) :
            cant_detect.append(dish)
            continue 

        dishes.append({
            "id": dish['id'],
            "name": name_extracted
        
        })
        
        if i / total_dishes * 100 >= done_percent:
            print(f"Done {done_percent}%")
            done_percent += 5
        
    print(f"Number of dishes: {len(dishes)}")
    print(f"Number of cant detect: {len(cant_detect)}")

    write_to_json(dishes, "name_extracted_tmp.json")
    write_to_json(cant_detect, "cant_detect_tmp.json")
    