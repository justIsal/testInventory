'use client';
import React from 'react';
import { FormLogin } from '@/components/layouts/Form/FormLogin';
// import { FormLupaPassword } from '../layouts/Form/FormLupaPassword';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const ress = await signIn('credentials', {
        redirect: false,
        username: formData.get('username'),
        password: formData.get('password'),
        callbackUrl: '/admin',
      });
      if (!ress?.error) {
        router.push('/admin');
      } else {
        console.log(ress.error);
        alert(ress.error);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div className="w-screen h-screen bg-[url('/images/bgLogin.png')] bg-cover flex">
      <FormLogin onHandleSubmit={handleSubmit} />
      {/* <FormLupaPassword /> */}
    </div>
  );
};
export default LoginPage;
