const CustomInput = ({
    fieldName = "",         // Field name for the input
    value = "",             // Current value of the input
    onChange,               // Function to handle input change
    type = "text",          // Input type (default: text)
    placeholder = "Enter...",   // Placeholder text for the input
}: {
    fieldName?: string;         // Optional field name
    value?: any;                // Optional value
    onChange?: any;             // Optional onChange function
    type?: string;              // Optional input type
    placeholder?: string;       // Optional placeholder text
}) => {

    return (
        <div className="text-[#000] w-[100%] text-[12px] font-[400] leading-[22px]">
            {/* Display field name if provided */}
            {fieldName && (
                <div className="text-[#000] text-[12px] font-[500] leading-[22px]">
                    {fieldName}
                </div>
            )}
            {/* Input element */}
            <input
                type={type}                         // Set input type
                placeholder={placeholder}           // Set placeholder
                defaultValue={value}                // Set default value
                onChange={onChange}                 // Set onChange handler
                className="text-[rgba(0,0,0,0.25)] text-[14px] font-[400] leading-[22px] p-[5px_12px] outline-none rounded-[10px] border-[1px] border-[#D9D9D9] w-[100%] mt-[5px] h-[32px] bg-[#D9D9D9]"
            />
        </div>
    );
};

export default CustomInput;
