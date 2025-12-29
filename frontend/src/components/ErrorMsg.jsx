import React from 'react';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle } from "lucide-react";
import Button from "./Button";

const ErrorMsg = forwardRef(function ErrorMsg(
    { title = "Something went wrong", message, buttonCaption = "Close" },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));

    return createPortal(
        <dialog
        ref={dialog}
        className="
            backdrop:bg-black/40
            p-0
            rounded-xl
            shadow-lg
            sm:max-w-md
            w-full
        "
        >
        <div className="bg-white rounded-xl p-6">
            {/* Icon + Header */}
            <div className="flex flex-col items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-center">{title}</h2>
            {message && (
                <p className="text-sm text-gray-500 text-center mt-1">
                {message}
                </p>
            )}
            </div>

            {/* Action */}
            <form method="dialog" className="flex justify-center">
            <Button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">
                {buttonCaption}
            </Button>
            </form>
        </div>
        </dialog>, 
        document.getElementById('modal-root')
    );
});

export default ErrorMsg;