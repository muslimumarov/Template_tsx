import React, {InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes} from "react";
import {BUTTON_THEME} from "@app/shared";
import {Props as SelectProps} from "react-select";

// Input Interface
interface IFieldProperties {
    id: string;
    type?: string;
    error?: string | React.ReactNode;
    label?: string;
    textarea?: boolean;
    autocomplete?: boolean;
    required?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "right" | "left";
    handleIcon?: () => void;
}

type IField = InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement> & IFieldProperties;

// Button Interface
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: BUTTON_THEME,
    mini?: boolean,
    navigate?: string,
    icon?: React.ReactNode,
    iconPosition?: 'left' | 'right',
    // onClick?: (e?: React.BaseSyntheticEvent) => Promise<void>
}

// Select Option Interface
interface ISelectOption {
    value: string | number;
    label: string | number;
    icon?: React.ReactNode;
    validTo?: Date;
    dropdownIndicator?: React.ReactNode;
}

// Select Interface
interface ISelect extends SelectProps<ISelectOption> {
    id: string;
    options: ISelectOption[];
    type?: 'form' | 'language' | 'filter';
    placeholder?: string;
    icon?: React.ReactNode;
    handleOnChange?: (e: string | number | boolean | string[] | number[] | boolean[] | null) => void;
    disabled?: boolean;
    label?: string;
    error?: string;
    top?: boolean;
}

interface IFIle {
    name: string;
    id: string | number;
    file: string;
}

export type {IButton, IField, ISelectOption, ISelect, IFIle};
