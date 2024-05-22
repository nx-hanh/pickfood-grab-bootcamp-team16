"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Croissant } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks/redux';
import { resetDishes } from '@/lib/redux/features/dishes/dishesSlice';

interface FoodItem {
  id: number;
  name: string;
}

const UpdateFavorites: React.FC = () => {
  const [selectedFoodItems, setSelectedFoodItems] = useState<FoodItem[]>([]);
  const [foodList, setFoodList] = useState<FoodItem[] | any>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  

  const addFavorite = async () => {
    const response = await fetch('/api/addfavor', {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json',
        Authorization : localStorage.getItem("token") || "",
      },

      body: JSON.stringify({
        favorites: selectedFoodItems
        })
      })
      if(response.ok) {
        router.push('/home')
      } else {
        console.error('Registration failed')
      }
  };

  const handleFoodSelect = (chosenFood: FoodItem) => {
    setSelectedFoodItems((prevFoodItems) =>
      prevFoodItems.includes(chosenFood)
       ? prevFoodItems.filter((food) => food!== chosenFood)
        : [...prevFoodItems, chosenFood]
    );
  };

  const handleClick = () => {
    addFavorite()
    dispatch(resetDishes());
    setButtonClicked(true);
    alert("Đổi món thành công!");
  };
  // GET api/getcategories (lấy các category từ server, format [category_id, category_name], protected api)

  const getCategories = async () => {
    const response = await fetch('/api/getcategories', {
      method: 'GET',
      headers : {
        'Content-Type' : 'application/json',
        Authorization : localStorage.getItem("token") || "",
      },
      })

      if(response.ok) {
        const result = (await response.json());
        const myList: FoodItem[] = result.map((item) => ({ id: item[0], name: item[1] }));
        return myList;
      } else {
        console.error('Registration failed')
      };
  };  

  const getCurrentFavorite = async () => {
    const response = await fetch('/api/getinitfavor', {
      method: 'GET',
      headers : {
        'Content-Type' : 'application/json',
        Authorization : localStorage.getItem("token") || "",
      },
      })

      if(response.ok) {
        const result = (await response.json());
        setSelectedFoodItems(result.initFood);

      } else {
        console.error('Registration failed')
      };
  };  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categories, favorites] = await Promise.all([getCategories(), getCurrentFavorite()]);
        setFoodList(categories);
      } catch (error) {
        console.error('Fetching data failed', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    // <div className = "className='h-full flex flex-col"> 
    //   <div className="header p-2 top-2">
    //       <h1 className="flex justify-stretch flex-wrap text-3xl font-bold">
    //        
    //   </div>
    //   <div className='flex overflow-hidden pb-20'>
    //   <div className='h-full flex flex-wrap justify-start space-x-1 px-1 overflow-auto '>
    //   {foodList.map((food: FoodItem, index) => (
    //     <Button 
    //       variant ={`${selectedFoodItems.includes(index)? 'default' : 'outline'}`}
    //       key={index}
    //       className={`m-1 text-white ${selectedFoodItems.includes(index)? 'bg-red-400 border-2 border-red-400' : 'bg-green-600 border-2 border-green-600'}`}
    //       type="submit"
    //       onClick={() => handleFoodSelect(index)}
    //     >
    //       <div>
    //         {selectedFoodItems.includes(index) ? <Heart className = 'mr-1'/> : <Croissant className = 'mr-1'/>}
    //       </div>
    //       {food.name}
    //     </Button>
    //   ))}
    //    </div>
    //   </div>
    //   <div className="footer">
    //     <Button size='lg' className='absolute bottom-3 left-3 right-3 max-w-[320px] mx-auto text-white bg-green-600 justify-center disabled' onClick={handleClick} type='submit' disabled={buttonClicked}>
    //       Xác nhận
    //     </Button>
    //   </div>
    // </div>
    <div className='h-full flex flex-col '>
      <div className="header p-2 top-2">
        <h1 className="flex justify-stretch flex-wrap text-3xl font-bold">
        Cập nhật những món ăn bạn yêu thích 🥳</h1>
      </div>
      <div className='flex overflow-hidden pb-20'>
        <div className='h-full flex flex-wrap justify-start space-x-1 px-1 overflow-y-scroll '>
          {foodList.map((food: FoodItem, index) => (
            <Button
              variant={`${selectedFoodItems.includes(index) ? 'default' : 'outline'}`}
              key={index}
              className={`m-1 text-white ${selectedFoodItems.includes(index) ? 'bg-red-400 border-2 border-red-400' : 'bg-green-600 border-2 border-green-600'}`}
              type="submit"
              onClick={() => handleFoodSelect(index)}
            >
              <div>
                {selectedFoodItems.includes(index) ? <Heart className='mr-1' /> : <Croissant className='mr-1' />}
              </div>
              {food.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="footer">
        <Button size='lg' className='absolute bottom-3 left-3 right-3 max-w-[320px] mx-auto text-white bg-green-600 justify-center disabled' onClick={handleClick} type='submit' disabled={buttonClicked}>
          Xác nhận
        </Button>
      </div>
    </div>
  );
};

export default UpdateFavorites;
