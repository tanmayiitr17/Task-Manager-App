import { FC } from "react";
import {
    CircularProgress,
    Button,
} from "@mui/material";

// Define the type for ButtonProps
type ButtonProps = {
    text?: string;
    className?: string;
    loading?: boolean;
}

// CustomButton component with optional text, className, and loading props
export const CustomButton: FC<ButtonProps> = ({
    text,
    className = "",
    loading = false,
}) => {
    return (
        // Button component with conditional styles based on loading state
        <Button
            disabled={loading} // Disable the button when loading
            className={`${loading ? "!bg-[rgb(37,141,243)] !text-yellow-400" : "!bg-[rgb(9,132,253)]"
                }  !w-[100%] h-[40px] !border-[0.5px] !border-[rgba(68,68,68,0.57)] !rounded-[4px] !text-[#FFF] text-[16px] font-[500] gap-y-[45px] ${className}`}
            type="submit"
        >
            {/* Display button text */}
            <span className="hover:text-yellow-400">{text}</span>
            {/* Display loading spinner when loading */}
            {loading && (
                <div className="flex items-center justify-center pl-[20px]">
                    <CircularProgress className="!text-yellow-400 !h-[20px] !w-[20px]" />
                </div>
            )}
        </Button>
    );
};
