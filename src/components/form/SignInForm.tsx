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

const FormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters')
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    // console.log(values);
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        newUser: false
        })
      })
  
      if(response.ok) {
        router.push('/onboarding/breakfast')
      } else {
        console.error('Registration failed')
      }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='w-11/12 mx-4 space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='americaya@hallo.com' {...field} />
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
        <Button variant='outline' className='w-11/12 mx-4 grid justify-items-center mt-6 bg-green-600 border-2 border-green-600' type='submit'>
           Đăng nhập
        </Button>
      </form>
      <div className='w-11/12 mx-4 my-4 flex items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        hoặc
      </div>
      <GoogleSignInButton>Đăng nhập với Google</GoogleSignInButton>
      <p className='text-center text-sm text-black mt-2'>
        Nếu bạn chưa có tài khoản, hãy&nbsp;
        <Link className='text-blue-500 hover:underline' href='/signup'>
          đăng kí tại đây
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
