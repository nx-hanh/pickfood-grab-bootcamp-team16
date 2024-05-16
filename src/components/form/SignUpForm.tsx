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

const FormSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Vui lòng nhập tên tài khoản')
      .max(100),
    email: z
      .string()
      .min(1, 'Vui lòng nhập email')
      .email('Email không hợp lệ'),
    password: z
      .string()
      .min(1, 'Vui lòng nhập mật khẩu')
      .min(8, 'Mật khẩu cần có ít nhất 8 ký tự'),
    confirmPassword: z.string().min(1, 'Vui lòng nhập lại mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu không trùng khớp',
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    // console.log(values);
    const response = await fetch('/api/auth', {
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      newUser: true
      })
    })

    if(response.ok) {
      router.push('/onboarding')
      // localStorage.setItem('itemName', value)
      // localStorage.getItem('itemName')
    } else {
      console.error('Registration failed')
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='items-center'>
        <div className='w-11/12 mx-4 space-y-2 justify-center'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên tài khoản</FormLabel>
                <FormControl>
                  <Input placeholder='oogabooga' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email@example.com' {...field} />
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
                    placeholder='use4Ginstead'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập lại mật khẩu'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant='outline' className='w-11/12 mx-4 grid justify-items-center mt-6 bg-green-600 border-2 border-green-600' type='submit'>
          Đăng kí
        </Button>
      </form>
      {/* {/* <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div> */}
      {/* <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}
      <p className='text-center text-sm text-white mt-2'>
        Nếu bạn đã có tài khoản, hãy&nbsp;
        <Link className='text-blue-500 hover:underline' href='/signin'>
          đăng nhập tại đây
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
