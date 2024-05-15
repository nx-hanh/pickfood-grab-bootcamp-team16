"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Croissant } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FoodItem {
  name: string;
}

const foodList: FoodItem[] = [
    { name: "Bánh mì pate" },
    { name: "Bún chả" },
    { name: "Bún bò Huế" },
    { name: "Bún riêu cua" },
    { name: "Bún thang" },
    { name: "Cá kho tộ" },
    { name: "Chả cá Lã Vọng" },
    { name: "Chả giò" },
    { name: "Chè hạt sen" },
    { name: "Chè bưởi" },
    { name: "Cơm gà Hội An" },
    { name: "Cơm tấm sườn bì chả" },
    { name: "Gỏi cuốn" },
    { name: "Lẩu Thái" },
    { name: "Lẩu mắm" },
    { name: "Mì Quảng" },
    { name: "Nem rán" },
    { name: "Phở bò" },
    { name: "Phở gà" },
    { name: "Tôm rang muối" },
    { name: "Thịt kho tàu" },
    { name: "Bánh xèo" },
    { name: "Bánh canh ghẹ" },
    { name: "Bánh tráng cuốn thịt heo" },
    { name: "Bánh bèo chén" },
    { name: "Bánh ít lá gai" },
    { name: "Bánh chuối nướng" },
    { name: "Bánh flan" },
    { name: "Bánh kem" },
    { name: "Bánh bèo chén" },
    { name: "Bánh ít lá gai" },
    { name: "Bánh chuối nướng" },
    { name: "Bánh flan" },
    { name: "Bánh kem" },
  ];

interface AppState {
  selectedFoodItems: FoodItem[];
}

const App: React.FC = () => {
  const [selectedFoodItems, setSelectedFoodItems] = useState<FoodItem[]>([]);

  const handleFoodSelect = (chosenFood: FoodItem) => {
    setSelectedFoodItems((prevFoodItems) =>
      prevFoodItems.includes(chosenFood)
       ? prevFoodItems.filter((food) => food!== chosenFood)
        : [...prevFoodItems, chosenFood]
    );
  };

  // GET api/getcategories (lấy các category từ server, format [category_id, category_name], protected api)

  const getCategories = async () => {
    // console.log(values);
    const router = useRouter();
    const response = await fetch('/api/getcategories', {
      method: 'GET',
      headers : {
        'Content-Type' : 'application/json'
      },
      // body: JSON.stringify({
      //   email: values.email,
      //   password: values.password,
      //   })
      })
  
      if(response.ok) {
        router.push('/home')
      } else {
        console.error('Registration failed')
      }
  };  

  const getUserFavorite = async () => {
    // console.log(values);
    const router = useRouter();
    const response = await fetch('api/addfavor', {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      // body: JSON.stringify({
      //   email: values.email,
      //   password: values.password,
      //   })
      })
  
      if(response.ok) {
        router.push('/home')
      } else {
        console.error('Registration failed')
      }
  };  

  return (
    <div>
      <div className="header">
          <h1 className="flex justify-center flex-wrap text-xl">Chọn những món bạn thích</h1>
      </div>
      <div className='flex flex-wrap justify-stretch'>

      {foodList.map((food, index) => (
          <Button 
            variant ={`${selectedFoodItems.includes(food)? 'default' : 'outline'}`}
            // variant = 'outline'
            key={index}
            className={`mt-1 mr-1 ml-1 ${selectedFoodItems.includes(food)? 'bg-red-400 border-2 border-red-400' : 'bg-green-600 border-2 border-green-600'}`}
            type="submit"
            onClick={() => handleFoodSelect(food)}
          >
            <div>
              {selectedFoodItems.includes(food) ? <Heart className = 'mr-1'/> : <Croissant className = 'mr-1'/>}
            </div>
            {food.name}
          </Button>
      ))}
      </div>
      <div className="footer">
        <Button className='absolute w-11/12 mr-4 m-3 bottom-0 bg-green-600 justify-center' type='submit'>
          Tiếp tục
        </Button>
        </div>
    </div>
  );
};

export default App;