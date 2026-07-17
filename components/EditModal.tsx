"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function EditModal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    } else if (!isOpen && dialogRef.current?.open) {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="admin-modal"
      onCancel={handleClose}
    >
      <div className="admin-modal-content">
        <div className="admin-modal-header">
          <h3>{title}</h3>
          <button onClick={handleClose} className="admin-modal-close" aria-label="Close modal">
            <i className="ph-bold ph-x"></i>
          </button>
        </div>
        <div className="admin-modal-body">
          {children}
        </div>
      </div>
    </dialog>
  );
}
