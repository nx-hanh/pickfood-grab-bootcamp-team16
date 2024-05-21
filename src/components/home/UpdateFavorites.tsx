"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Croissant } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface FoodItem {
  id: number;
  name: string;
}

const UpdateFavorites: React.FC = () => {
  const [selectedFoodItems, setSelectedFoodItems] = useState<FoodItem[] | any>([]);
  const [foodList, setFoodList] = useState<FoodItem[] | any>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();

  const addFavorite = async () => {
    // const favorites = selectedFoodItems.map(food => food.id);
    // localStorage.setItem('favorites', JSON.stringify(favorites));
    const response = await fetch('/api/addfavor', {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json',
        Authorization : localStorage.getItem("token") || "",
      },

      body: JSON.stringify({
        favorites: selectedFoodItems.map(food => food.id)
        })
      })
      if(response.ok) {
        const favorites = selectedFoodItems.map(food => food.id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
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
    setButtonClicked(true);
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
        console.log(myList);
        return myList;
      } else {
        console.error('Registration failed')
      };
    

  };  
  // useEffect(() => {
  // const currentFavorite = JSON.parse(localStorage.getItem("favorites"));
  // setSelectedFoodItems(currentFavorite);
  // }, []);

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
        // const myList: FoodItem[] = result.map((item) => ({ id: item[0], name: item[1] }));
        // setFoodList(result);
        console.log(result);
        return result;
      } else {
        console.error('Registration failed')
      };
  };  

  // useEffect(() => {
  //   getCategories()
  //   .then((result) => {
  //       setFoodList(result);
  //     })
  //     .catch((error) => {
  //       console.error('Registration failed')
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categories, favorites] = await Promise.all([getCategories(), getCurrentFavorite()]);
        console.log(categories);
        console.log(favorites);
        setFoodList(categories);
        setSelectedFoodItems(favorites);
      } catch (error) {
        console.error('Fetching data failed', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div> 
      <div className="header p-2 top-2">
          <h1 className="flex justify-stretch flex-wrap text-3xl font-bold">
            Cập nhật những món ăn bạn yêu thích 🥳</h1>
      </div>
      <div className='flex flex-wrap justify-stretch px-1'>
      {foodList.map((food: FoodItem, index) => (
        <Button 
          variant ={`${selectedFoodItems.includes(food)? 'default' : 'outline'}`}
          key={index}
          className={`m-1 text-white ${selectedFoodItems.includes(food)? 'bg-red-400 border-2 border-red-400' : 'bg-green-600 border-2 border-green-600'}`}
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
        <Button size='lg' className='absolute bottom-3 left-3 right-3 text-white bg-green-600 justify-center disabled' onClick={handleClick} type='submit' disabled={buttonClicked}>
          Xác nhận
        </Button>
        </div>
    </div>
  );
};

export default UpdateFavorites;