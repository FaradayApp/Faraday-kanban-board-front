import { toast } from 'react-toastify';

export function successNotification(message: string, duration = 1500) {
  toast.success(message, {
    position: 'top-right',
    autoClose: duration,
    pauseOnHover: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
}
