import React from 'react';
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react';
import InputForm from '@/components/fragments/input/InputForm';

export const FormLupaPassword = () => {
  return (
    <form className="md:p-8 p-6 md:w-[30%] bg-white m-auto rounded-md">
      <Typography variant="h4" color="blue-gray" className="text-center mb-10">
        Lupa password
      </Typography>
      <div className="mb-1 flex flex-col gap-6">
        <InputForm
          label="Masukan email anda"
          type="email"
          placeholder="Email.."
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <Button className="mt-6 bg-[#066AFF]" fullWidth>
        KIRIM RESET PASSWORD KE EMAIL
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        <a href="#" className="font-medium">
          Login
        </a>
      </Typography>
    </form>
  );
};
