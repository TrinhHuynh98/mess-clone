"use client";

import { Buttons } from "@/app/components/Buttons";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Modal from "@/app/components/modals/Modal";
import { User } from "@prisma/client";
import axios from "axios";
import { error } from "console";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface IGroupChatModal {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModel: React.FC<IGroupChatModal> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/conservations`, {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a new group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                errors={errors}
                required
                register={register}
                id="name"
              />
              <Select
                disable={isLoading}
                label={"Members"}
                options={users.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                onChange={(value) => {
                  setValue("members", value, {
                    shouldValidate: true,
                  });
                }}
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Buttons
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            Cancel
          </Buttons>
          <Buttons disabled={isLoading} type="submit">
            Create
          </Buttons>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModel;
