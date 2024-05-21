"use client"
import {useRouter} from 'next/navigation';
import React, { useState, useEffect } from 'react';
import './SettingsPage.css'; // Import the CSS file for styling
import { Button } from '@/components/ui/button';
import { User, ShieldCheck, Bell, Lock, CalendarCheck, BadgeHelp, Boxes} from 'lucide-react'
import { useAppDispatch } from '@/lib/hooks/redux';
import { resetDishes } from '@/lib/redux/features/dishes/dishesSlice';
 

const SettingsPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const navigateToEditProfile = () => {
        router.push("/editProfile");
      };
    
      const navigateToSecurity = () => {
        console.log("Security function");
      };
    
      const navigateToNotifications = () => {
        console.log("Notifications function");
      };
    
      const navigateToPrivacy = () => {
        console.log("Privacy function");
      };
    
      const navigateToSubscription = () => {
        console.log("Subscription function");
      };
    
      const navigateToSupport = () => {
        console.log("Support function");
      };
    
      const navigateToTermsAndPolicies = () => {
        console.log("Terms and Policies function");
      };
    
      const navigateToFreeSpace = () => {
        console.log("Free Space function");
      };
    
      const navigateToDateSaver = () => {
        console.log("Date saver");
      };
    
      const navigateToReportProblem = () => {
        console.log("Report a problem");
      };
    
      const addAccount = () => {
        console.log("Add account ");
      };
    
      const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("favorites");
        dispatch(resetDishes());
        document.cookie.split(";").forEach(cookie => {
          const name = cookie.split("=")[0].trim();
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
        });

        router.push("/signin")
        console.log("Logout");
      };

    const [buttonClicked, setButtonClicked] = useState(false);

    const handleClick = () => {
        setButtonClicked(true);
        logout()
    };
      
  return (
    <div className = "p-3">
    <div className="text-center text-2xl font-medium">Cài đặt</div>
      <section className="settings-section">
        <h2 className= "text-xl font-semibold mb-2">Tài khoản</h2>
        <ul>
          <li className = "text-lg"> 
            <User className="mr-10"/> Chỉnh sửa thông tin
          </li>
          <li className = "text-lg"> 
            <ShieldCheck className="mr-10"/> Bảo mật
          </li>
        <li className = "text-lg"> 
            <Bell className="mr-10"/> Thông báo
          </li>
          <li className = "text-lg"> 
            <Lock className="mr-10"/> Quyền riêng tư
          </li>
        </ul>
      </section>

      <section className="settings-section">
        <h2 className= "text-xl font-semibold mb-2">Hỗ trợ</h2>
        <ul>
        <li className = "text-lg"> 
          <CalendarCheck className="mr-10"/> Đăng kí
          </li>
          <li className = "text-lg"> 
          <BadgeHelp className="mr-10"/> Trợ giúp 
          </li>
          <li className = "text-lg"> 
            <Boxes className="mr-10"/> Điều khoản
          </li>
        </ul>
      </section>

      <div className="footer">
        <Button size='lg' className='absolute bottom-20 mb-2 left-3 right-3 text-white bg-green-600 justify-center disabled' onClick={handleClick} type='submit' disabled={buttonClicked}>
          Đăng xuất
        </Button>
        </div>
    </div>
  );
};

export default SettingsPage;