'use client'

import React, {useState, useEffect} from 'react';
import './UserPage.css'; // Create and import a CSS file for styling
import download from "@/assets/images/download.png";
import userbg from "@/assets/images/userBground.jpg";
import {MapPin,Settings} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const UserPage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [getUser, setUser] = useState(null);
  const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch('/api/auth');
//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUser();
//   }, []);

  const handleClick = () => {
      setButtonClicked(true);
      router.push("/settings")
  };

  const changeFavorites = () => {
    setButtonClicked(true);
    router.push("/updateFavorites")
    };

    return (
    <div className="container w-full flex">
      <div className="image-container">
        <img 
          src={userbg.src}
          alt="Cover" 
          className="cover-image"
        />
      </div>
      <div className="mt-2 mr-2"> 
        <Settings className="float-right" onClick={handleClick} type='submit'/>
      </div>
      <div className="profile-container">
        <img 
          src={download.src}
          alt="Profile" 
          className="profile-image"
        />

        <p className="profile-name text-lg font-semibold my-2">Người dùng</p>
        {/* <p className="profile-name text-lg font-semibold my-2">{getUser.email}</p> */}

        <p className="profile-role">Một người yêu ẩm thực nhưng lười</p>

        <div className="location-container">
          {/* <i className="material-icons">location_on</i> */}
          <MapPin />
          <p className="location-text">  
            Hồ Chí Minh, Việt Nam</p>
        </div>
        <div className="stats-container">
          <div className="stats-item">
            <p className="stats-number">122</p>
            <p className="stats-label">Người theo dõi</p>
          </div>
          <div className="stats-item">
            <p className="stats-number">67</p>
            <p className="stats-label">Đang theo dõi</p>
          </div>
          <div className="stats-item">
            <p className="stats-number">69420</p>
            <p className="stats-label">Thích</p>
          </div>
        </div>

        <div className="flex py-4">
          <Button className="profile-button text-white" onClick={handleClick} type='submit' disabled={buttonClicked}>Cài đặt</Button>
          <Button className="profile-button text-white"onClick={changeFavorites} type='submit' disabled={buttonClicked}>Đổi món yêu thích </Button>
        </div>
      </div>

    </div>
  );
};

export default UserPage;