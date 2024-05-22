import unicodedata
import json

def normalize_text(text):
    return unicodedata.normalize('NFC', text).lower().strip()

categories = {
        "Beef": [ "xúc xích", "bò xào", "bò lúc lắc", "bò kho"],
        "Coffee - Tea - Juice": ["affogato", "flat white", "espresso", "macchiato", "coffee", "americano", "latte", "cappuccino", "cà phê", "trà đào", "nước ép", "sinh tố", "cafe", "lassi"],
        "Bread": ["croissant", "bánh mì", "churros"],
        "Milk Tea": ["sữa chua", "sữa", "trà sữa", "cappucino", "frappuccino"],
        "Dessert": ["chè bạch quả", "chè chuối", "tiramisu", "chè", "churros","croissant", "bánh flan", "chè bưởi"],
        "Fast Food": ["fish and chips", "hamburger", "burger", "hotdog", "pizza", "mì gói","gà"],
        "Snack": ["bò bía", "bắp xào", "khoai tây", "nui", "xiên que", "nem chua", "nem rán","cá viên","nem"],
        "Healthy Food": ["cháo","salad"],
        "Hotpot & Grill": ["lẩu", "gyro", "tom yum", "kebab", "nem nướng", "gà nướng"],
        "International Food": ["chimichurri", "curry", "mandu", "kimchi", "gimbap", "gyro", "kebab", "pizza", "sushi", "sashimi", "tempura", "pad thai", "bibimbap", "falafel", "satay", "tokbokki"],
        "Noodles": ["bánh canh", "bún mắm nêm", "bún riêu", "bún riêu cua", "bún thang", "bún cá", "bún chả cá", "mì xào", "bún chả giò", "bún thịt nướng", "bún chả", "bún bò", "phở", "bún", "bún đậu", "bún mắm", "bún ốc", "mì thịt heo", "bún hến","mì gói","mì ý", "mì ramen", "mì udon", "hủ tiếu", "mì trộn", "mì quảng", "mì vịt tiềm", "mì chua", "mì","mì gà"],
        "Rice": ["xôi", "xôi gấc", "xôi nếp than", "cơm gà", "cơm hến", "cơm cháy", "cơm chiên", "cơm lam", "cơm rang", "cơm tấm"],
        "Others": ["mocktail", "chạo tôm"],
        "Vietnamese Cake": ["bánh ú", "bánh bò nướng", "bánh tét", "bánh xèo", "bánh cuốn", "bánh ướt", "bánh bèo", "bánh rán", "bánh bột lọc", "bánh cam", "bánh tôm","bánh tráng", "bánh dày", "bánh chưng", "bánh in", "bánh bao", "bánh bò", "bánh ít", "bánh đúc", "bánh da lợn", "bánh gai", "bánh khọt", "bánh pía","bánh gạo","bánh hỏi", "bánh bông lan", "bánh gối"],
        "Bánh Mì": ["bánh mì"],
        "Congee": ["súp","cháo"],
        "Dimsum": ["gyoza","chả giò", "mandu", "há cảo"],
        "Pizza": ["pizza"],
        "Seafood": ["nghêu", "cá", "sò đình", "hải sản", "cá kho", "cá chua", "ốc", "cá chiên", "cá lóc", "cá vịt", "sò"],
        "Món Nhậu": ["nem cua bể", "chả giò", "chả ram", "gỏi", "rau muống xào tỏi", "rau muống xào chua ngọt", "rau muống xào lòng", "rau muống luốc", "rau muống xào tỏi", "rau muống xào lòng"],
        "Vegan - Vegetarian": ["chay", "đậu phụ", "bí đỏ", "rau cải"],
        "Japanese": ["gimbap", "kimbap", "sushi", "sashimi", "tempura", "udon", "miso", "bento"]
    }

               
def getDishes(filename):
    with open(filename,"r",encoding='utf-8') as file:
        contents = file.readlines()
        for i in range(len(contents)):
            contents[i] = normalize_text(contents[i])
    return contents

if __name__ == "__main__":
    cnt = 0
    # create a set
    food_name = set()
    for category,items in categories.items():
        for item in items:
            item = normalize_text(item)
            food_name.add(item)
    dishes = getDishes("dish_names.txt")
    categories2Index = {}
    with open("categories.txt","w",encoding='utf-8') as file:
        for i, category in enumerate(categories):
            category = normalize_text(category)
            file.write(category + "\n")
            categories2Index[category] = i

    data = []

    for i, dish in enumerate(dishes):
        dish = normalize_text(dish)
        categories_index = []
        for category,dish_name in categories.items():
            category = normalize_text(category)
            for name in dish_name:
                name = normalize_text(name)
                if dish == name:
                    categories_index.append(categories2Index[category])
                    print(dish + " " + category)
                    break

        data.append({
            "id": i,
            "categories": categories_index
        })
    
    with open("dish_categories.json","w",encoding='utf-8') as file:
        file.write(json.dumps(data,ensure_ascii=False,indent=4))

    
        
    
