import InfoIcon from "@mui/icons-material/Info";
import { FC } from "react";

// Define props for the ErrorText component
type ErrorTextProps = {
    text: any; // Error message to display
};

// ErrorText component displays an error message with an icon if provided
const ErrorText: FC<ErrorTextProps> = ({ text }) => {
    return (
        <div className="!h-[20px] !text-[10px] font-[600] flex items-center text-[#e13434] pt-[4px] ">
            {/* Render the error message and icon if the text is provided */}
            {text && (
                <>
                    <InfoIcon className="!text-[15px] pr-[4px]" /> {/* InfoIcon */}
                    {text} {/* Error message */}
                </>
            )}
        </div>
    );
};

export default ErrorText;
