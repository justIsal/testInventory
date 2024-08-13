import React from 'react';
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import InputForm from '@/components/fragments/input/InputForm';
export const FormLogin = ({ onHandleSubmit }) => {
  const router = useRouter();
  return (
    <form className="md:p-8 p-6 md:w-[30%] bg-white m-auto rounded-xl" onSubmit={onHandleSubmit}>
      <Typography variant="h4" color="blue-gray" className="text-center mb-10">
        Login to your account
      </Typography>
      <div className="mb-1 flex flex-col gap-6">
        <InputForm
          label="Masukan username Anda."
          type="text"
          placeholder="Username"
          // onChange={(e) => console.log(e.target.value)}
          name="username"
        />
        <InputForm
          label="Masukan password Anda."
          type="password"
          placeholder="*********"
          // onChange={(e) => console.log(e.target.value)}
          name="password"
        />
      </div>
      <Checkbox
        label={
          <Typography variant="small" color="gray" className="flex items-center font-normal">
            I agree the
            <a href="#" className="font-medium transition-colors hover:text-gray-900">
              &nbsp;Terms and Conditions
            </a>
          </Typography>
        }
        containerProps={{ className: '-ml-2.5' }}
      />
      <Button type="submit" className="mt-6 bg-[#066AFF]" fullWidth>
        Login
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        <a href="#" className="font-medium">
          Lupa Password
        </a>
      </Typography>
    </form>
  );
};
