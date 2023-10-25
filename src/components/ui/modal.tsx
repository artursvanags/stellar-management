"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";


interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = (
props,
) => {
  const onChange = (open: boolean) => {
    if (!open) {
      props.onClose();
    }
  };

  return ( 
    <Dialog open={props.isOpen} onOpenChange={onChange}>
      <DialogContent className={`${props.className}`}>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>
            {props.description}
          </DialogDescription>
        </DialogHeader>
        <div>
          {props.children}
        </div>
      </DialogContent>
    </Dialog>
  );
};