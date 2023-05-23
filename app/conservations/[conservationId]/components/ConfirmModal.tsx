"use client";

import { Buttons } from "@/app/components/Buttons";
import Modal from "@/app/components/modals/Modal";
import useConservation from "@/hooks/useConservation";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";

interface IConfirmModal {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<IConfirmModal> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conservationId } = useConservation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/conservations/${conservationId}`)
      .then(() => {
        onClose();
        console.log("delete", conservationId);
        router.push("/conservations");
        router.refresh();
        toast.success("Delete conservation success!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  }, [router, conservationId, onClose]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertCircle className="w-6 h6 text-red-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete this conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Buttons disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Buttons>
        <Buttons disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Buttons>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
