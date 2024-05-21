'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const FormSchema = z.object({
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu')
    .min(8, 'Mật khẩu cần có ít nhất 8 ký tự')
});

const SignInForm = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        newUser: false
        })
      })      
      setButtonClicked(true);
      if(response.ok) {
        localStorage.setItem("token", (await response.json()).token);
        router.push('/home')
      } else {
        console.error('Registration failed')
      }
  };

  return (
    <div>
      <div className="header p-3 top-3">
        <p className="flex flex-wrap text-4xl font-semibold"> Đăng nhập</p>
      </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='mx-4 space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email@hallo.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Nhập mật khẩu'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <Button className='w-full mt-6 bg-green-600 border-2 border-green-600' type='submit'> */}
        <Button variant='outline' className='w-11/12 mx-4 grid justify-items-center mt-6 text-white bg-green-600 border-2 border-green-600' type='submit' disabled={buttonClicked}>
           Đăng nhập
        </Button>
      </form>
      <div className='w-11/12 mx-4 my-4 text-xm flex items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-900 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-900'>
        hoặc
      </div>
      <GoogleSignInButton>Đăng nhập với Google</GoogleSignInButton>
      <p className='text-center text-xm text-black mt-2'>
        Nếu bạn chưa có tài khoản, hãy&nbsp;
        <Link className='text-blue-500 hover:underline' href='/signup'>
          đăng kí tại đây
        </Link>
      </p>
    </Form>
    </div>
  );
};

export default SignInForm;
