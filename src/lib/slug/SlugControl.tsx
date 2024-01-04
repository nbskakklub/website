import React, { useCallback, useMemo, useRef, useState } from "react";

import Field from "./Field/Field";
import TextField from "./text-field/TextField";
import classNames from "./classNames.util";
import { isNotEmpty } from "./string.util";
import { generateClassNames } from "./theming.util";

import type { StringField, WidgetControlProps } from "@staticcms/core";
import type { ChangeEvent, FC } from "react";

import "./SlugControl.css";

const classes = generateClassNames("WidgetString", [
  "root",
  "error",
  "required",
  "disabled",
  "for-single-list",
  "input",
  "with-prefix",
  "with-suffix",
  "prefix",
  "suffix",
]);

const SlugControl: FC<WidgetControlProps<string, StringField>> = ({
  value,
  label,
  errors,
  hasErrors,
  disabled,
  field,
  forSingleList,
  duplicate,
  controlled,
  onChange,
}) => {
  const rawValue = useMemo(() => value ?? "", [value]);
  const [internalRawValue, setInternalValue] = useState(rawValue);
  const internalValue = useMemo(
    () => (controlled || duplicate ? rawValue : internalRawValue),
    [controlled, duplicate, rawValue, internalRawValue]
  );

  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(
        event.target.value
          .replaceAll(/[^a-zA-Z0-9- ]/g, "")
          .replaceAll(" ", "-")
          .replaceAll(/-+/g, "-")
      );
      setInternalValue(
        event.target.value
          .replaceAll(/[^a-zA-Z0-9- ]/g, "")
          .replaceAll(" ", "-")
          .replaceAll(/-+/g, "-")
      );
    },
    [onChange]
  );

  const prefix = useMemo(() => field.prefix ?? "", [field.prefix]);
  const suffix = useMemo(() => field.suffix ?? "", [field.suffix]);

  return (
    <Field
      inputRef={ref}
      label={label}
      errors={errors}
      hint={field.hint}
      forSingleList={forSingleList}
      cursor="text"
      disabled={disabled}
      rootClassName={classNames(
        classes.root,
        disabled && classes.disabled,
        field.required !== false && classes.required,
        hasErrors && classes.error,
        forSingleList && classes["for-single-list"]
      )}
    >
      <TextField
        type="text"
        inputRef={ref}
        value={internalValue}
        disabled={disabled}
        onChange={handleChange}
        inputClassName={classNames(
          classes.input,
          isNotEmpty(prefix) && classes["with-prefix"],
          isNotEmpty(suffix) && classes["with-suffix"]
        )}
        startAdornment={
          isNotEmpty(prefix) ? (
            <div className={classes.prefix}>{prefix}</div>
          ) : null
        }
        endAdornment={
          isNotEmpty(suffix) ? (
            <div className={classes.suffix}>{suffix}</div>
          ) : null
        }
      />
    </Field>
  );
};

export default SlugControl;
