"use client";

import React from "react";
import Modal from "./Modal";
import Image from "next/image";

interface IImageModal {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}
const ImageModal: React.FC<IImageModal> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-80 w-80">
        <Image className="object-cover" fill alt="Image" src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
