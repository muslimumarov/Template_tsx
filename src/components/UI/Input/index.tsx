import React, {forwardRef} from "react";

import classNames from "classnames";
import styles from "./styles.module.scss";
import {FIELD} from "@app/shared";
import {useTranslation} from "react-i18next";
import {IField} from "@app/interfaces";

const Index = forwardRef<HTMLInputElement | HTMLTextAreaElement, IField>(
    (
        {
            iconPosition = "left",
            autocomplete = false,
            type = FIELD.TEXT,
            textarea = false,
            required = false,
            handleIcon,
            children,
            label,
            error,
            icon,
            id,
            ...props
        },
        ref
    ) => {
        const {t} = useTranslation()

        return (
            <div className={classNames(styles.root, {[styles.error]: error, [styles.icon]: icon})}>
                {
                    label && (
                        <div className={styles.wrapper}>
                            <label htmlFor={id}>{t(label)}</label>
                            {required && <span className={styles.required}>*</span>}
                        </div>
                    )
                }
                {
                    children ? children :
                        textarea ? (
                            <textarea
                                {...props}
                                ref={ref as React.Ref<HTMLTextAreaElement>}
                                id={id.toString()}
                                className={styles.input}
                                rows={5}
                                placeholder={props.placeholder ? t(props.placeholder as string) : ""}
                                autoComplete={autocomplete ? "on" : "off"}
                            />
                        ) : (
                            <div
                                className={classNames(styles['input-wrapper'], {[styles.right]: iconPosition === 'right'})}
                            >
                                {
                                    icon &&
                                    <div className={styles['icon-wrapper']} onClick={() => handleIcon?.()}>
                                        {icon}
                                    </div>
                                }
                                <input
                                    {...props}
                                    ref={ref as React.Ref<HTMLInputElement>}
                                    id={id.toString()}
                                    type={type}
                                    className={styles.input}
                                    placeholder={props.placeholder ? t(props.placeholder as string) : ""}
                                    autoComplete={autocomplete ? "on" : "off"}
                                />
                            </div>
                        )}
                {error && <span className={styles['error__message']}>{t(error as string)}</span>}
            </div>
        )
    }
);

export default Index
