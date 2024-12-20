


import { toast } from 'react-toastify';
export const handleSuccess = (msg) => {
    toast.success(msg, { position: 'top-right' })
}

export const handleError = (error) => {
  toast.error(error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};