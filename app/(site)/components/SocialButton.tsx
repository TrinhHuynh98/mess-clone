import React from "react";
import { IconType } from "react-icons";

interface ISocialButton {
  icon: IconType;
  onClick: () => void;
}
export const SocialButton: React.FC<ISocialButton> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-400 hover:bg-gray-100 focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};
