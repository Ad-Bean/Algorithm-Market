import React from 'react';
import Dialog from './Dialog';

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
  onConfirm: Function;
}
export default function Confirm(props: Props) {
  const { open, onClose, title, children, onConfirm } = props;
  if (!open) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button onClick={() => onClose()} className="bg-secondary hover:bg-secondary-light">
            取消
          </Button>
        </div>
        <div className="p-1">
          <Button
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            确定
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { type = 'button', children, onClick, className = '' } = props;

  return (
    <button
      className={`bg-primary hover:bg-primary-light font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
