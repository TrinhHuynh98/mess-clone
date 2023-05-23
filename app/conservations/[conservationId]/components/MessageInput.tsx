"use client";

import React from "react";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface IMessageInput {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const MessageInput: React.FC<IMessageInput> = ({
  id,
  type,
  placeholder,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
        text-black
        font-light
        py-2
        px-4
        bg-neutral-100 
        w-full 
        rounded-full
        focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
