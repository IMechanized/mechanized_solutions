import Multiselect from 'multiselect-react-dropdown';
import React from 'react';

export const MultiSelect = ({
    forwardRef,
    name,
    displayValue,
    selectedValues,
    options,
    disabled,
    placeholder,
    validationSyntax,
    singleSelect,
    className,
    isObject,
    register,
    setValue,
    setNewTags,
    error,
    adAlert,
}) => (
    <Multiselect
        customCloseIcon={
            <svg
                width="10"
                height="10"
                className="ml-2 cursor-pointer hover:text-red-500"
                viewBox="0 0 10 10"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9 1L1 9M1 1L9 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        }
        options={options}
        {...register(name, {
            required: {
                value: validationSyntax,
                message: `${name} field is required`,
            },
        })}
        placeholder={placeholder}
        name={name}
        selectedValues={selectedValues}
        disable={disabled}
        className={className}
        isObject={isObject}
        style={{
            chips: {
                backgroundColor: '#E6F2F2',
                color: '#66737F',
                borderRadius: '4px',
                fontSize: '16px',
                height: '33px',
            },
            searchBox: {
                // padding: "8px",
                padding: adAlert ? '13px' : '8px',
                border: error ? '1px solid red' : '1px solid #D6DBDF',
            },
        }}
        singleSelect={singleSelect}
        selectionLimit={singleSelect ? 1 : null}
        ref={forwardRef}
        displayValue={displayValue}
        onSelect={(selected, item) => {
            setValue(name, selected);
            setNewTags(selected);
        }}
        onRemove={(selected, item) => {
            setValue(name, selected);
            setNewTags(selected);
        }}
    />
);
