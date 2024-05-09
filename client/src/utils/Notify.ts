import toast from "react-hot-toast";

export const showMessage = (message: string) => {
    toast.success(message, { duration: 4000 });
};

export const showError = (message: any) => {
    toast.error(message, { duration: 4000 });
};
