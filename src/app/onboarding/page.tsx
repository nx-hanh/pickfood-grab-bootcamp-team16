"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Croissant } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Roboto as FontSans } from "next/font/google";
import Header from "@/components/common/header";
interface FoodItem {
  id: number;
  name: string;
}

const fontSans = FontSans({ 
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "700", "900"],
 });

const Onboarding: React.FC = () => {
  const [selectedFoodItems, setSelectedFoodItems] = useState<FoodItem[]>([]);
  // const [categories, setCategories] = useState<FoodItem[]>([]);
  const [foodList, setFoodList] = useState<FoodItem[] | any>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();
  // Add favorite
  const addFavorite = async () => {
    const response = await fetch('/api/addfavor', {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json',
        Authorization : localStorage.getItem("token") || "",
        // Authorization : "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..H4ZrKxqVxmU4W3jBBjzZ_A.K60SCzydwLW23W7KwoU7Tm6rIAfjs4mSFPiGTbuDNsiYekXcS0dfmOKhvcq6AKUZ.uK5yEtE5Ap-GJvdNvIqClw"
      },
      body: JSON.stringify({
        favorites: selectedFoodItems.map(food => food.id)
        })
      })
      if(response.ok) {
        router.push('/home')
        // localStorage.setItem('itemName', value)
        // localStorage.getItem('itemName')
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
    // console.log(values);
    const response = await fetch('/api/getcategories', {
      method: 'GET',
      headers : {
        'Content-Type' : 'application/json',
        // Authorization : localStorage.getItem("token")
        Authorization : "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..H4ZrKxqVxmU4W3jBBjzZ_A.K60SCzydwLW23W7KwoU7Tm6rIAfjs4mSFPiGTbuDNsiYekXcS0dfmOKhvcq6AKUZ.uK5yEtE5Ap-GJvdNvIqClw"
      },
      })

      if(response.ok) {
        const result = (await response.json());
        const myList: FoodItem[] = result.map((item) => ({ id: item[0], name: item[1] }));
        console.log(myList);
        // console.log(myList);
        // console.log(Array.isArray(result));
        return myList;
        //router.push('/home')
      } else {
        console.error('Registration failed')
      };
  };  

  useEffect(() => {
    // Using a Promise to simulate an asynchronous operation
    getCategories()
    .then((result) => {
        setFoodList(result);
      })
      .catch((error) => {
        console.error('Registration failed')
      });
  }, []);

  return (
    <div> 
      
      <div className="header p-3 top-3">
          <h1 className="flex justify-stretch flex-wrap text-4xl font-bold">
            Lựa chọn những món ăn bạn yêu thích 🥳</h1>
          <h3 className="pt-3 text-2xl font-normal">Bạn chọn món, tôi làm hết 🎉🎉🎉</h3>
      </div>
      <div className='flex flex-wrap justify-stretch px-2'>
      
      {foodList.map((food: FoodItem, index) => (
        <Button 
          variant ={`${selectedFoodItems.includes(food)? 'default' : 'outline'}`}
          // variant = 'outline'
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
          Tiếp tục
        </Button>
        </div>
    </div>
  );
};

export default Onboarding;