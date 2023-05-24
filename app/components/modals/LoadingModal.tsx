"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { CSSProperties, Fragment } from "react";
import { HashLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#0284c7",
};

const LoadingModal = () => {
  return (
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
          fixed 
          inset-0 
          bg-gray-100 
          bg-opacity-50 
          transition-opacity
        "
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="
          flex 
          min-h-full 
          items-center 
          justify-center 
          p-4 
          text-center 
        "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel>
                <HashLoader
                  size={40}
                  color="#0284c7"
                  cssOverride={override}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
