"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Croissant } from 'lucide-react';

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

  return (
    <div>
        {/* <div className="header">
            <h1 className="flex ">Chọn những món bạn thích</h1>
        </div> */}
        <div className="header">
            <h1 className="flex justify-center flex-wrap">Chọn những món bạn thích</h1>
        </div>
      <div className='flex justify-center flex-wrap'>

      {foodList.map((food, index) => (
          <Button 
            variant ={`${selectedFoodItems.includes(food)? 'default' : 'outline'}`}
            key={index}
            className={`mt-2 mr-2 ml-2 ${selectedFoodItems.includes(food)? 'bg-red-400 border-2 border-red-400' : ''}`}
            type="submit"
            onClick={() => handleFoodSelect(food)}
          >
            <div>
              {selectedFoodItems.includes(food) ? <Heart className = 'mr-2'/> : <Croissant className = 'mr-2'/>}
            </div>
            {food.name}
          </Button>
      ))}
      </div>
    <div className="footer">
    <Button className='w-full mt-4 mr-2 ml-2' type='submit'>
      Tiếp tục
    </Button>
    </div>
    </div>
  );
};

export default App;