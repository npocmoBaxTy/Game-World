import React from "react";
import Dialog from "@mui/material/Dialog";
import { IoMdClose } from "react-icons/io";

interface IProps {
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}
const SimpleDialogDemo: React.FC<IProps> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <span
        onClick={handleClose}
        className="absolute right-2 top-2 bg-gray-300 w-5 h-5 flex items-center justify-center text-sm rounded-full border"
      >
        <IoMdClose />
      </span>
      {children}
    </Dialog>
  );
};
export default SimpleDialogDemo;
