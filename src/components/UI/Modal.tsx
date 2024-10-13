import { FC, PropsWithChildren, ReactNode } from "react";
import "../../styles/UI/Modal.scss";

type ModalProps = {
  show: boolean;
  setShow: (val: boolean) => void;
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  show,
  setShow,
  children,
}) => {
  return (
    <div
      onClick={() => setShow(false)}
      className={(show ? "open " : "") + "modal-wrapper"}
    >
      <div onClick={(e) => e.stopPropagation()} className={"modal"}>
        {children}
      </div>
    </div>
  );
};
