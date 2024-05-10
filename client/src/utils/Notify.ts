import toast from "react-hot-toast";

/**
 * showMessage function displays a success toast message.
 * @param {string} message - The message to be displayed.
 */
export const showMessage = (message: string) => {
    // Display a success toast with the provided message for 4 seconds
    toast.success(message, { duration: 4000 });
};

/**
 * showError function displays an error toast message.
 * @param {any} message - The error message to be displayed.
 */
export const showError = (message: any) => {
    // Display an error toast with the provided message for 4 seconds
    toast.error(message, { duration: 4000 });
};
