import Image from "next/image";
import React from "react";
import { IconType } from "react-icons";

interface ISocialButton {
  icon: IconType;
  image?: any;
  onClick: () => void;
}
export const SocialButton: React.FC<ISocialButton> = ({
  icon: Icon,
  image,
  onClick,
}) => {
  return (
    <button type="button" onClick={onClick} className="btn-social-login">
      <Image className="w-6 h-6" alt="social-logo" src={image} />
      {/* <Icon /> */}
    </button>
  );
};
