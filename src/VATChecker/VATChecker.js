import { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./VATChecker.css";

export const VATChecker = () => {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const onValueChange = useCallback(
    (e) => {
      const newValue = e.target.value.replace(" ", "");

      if (newValue === value) return;

      setIsEditing(!!newValue);
      setValue(newValue);
    },
    [value]
  );

  const validationIcon = useMemo(() => {
    if (!value) {
      return undefined;
    }

    if (isEditing) {
      return <FontAwesomeIcon icon={faSpinner} spin />;
    }

    return isValid ? (
      <FontAwesomeIcon
        className="positive"
        icon={faCheck}
        title="Entered VAT number is valid"
      />
    ) : (
      <FontAwesomeIcon
        className="negative"
        icon={faTimes}
        title="Entered VAT number is invalid"
      />
    );
  }, [isEditing, isValid, value]);

  useEffect(() => {
    const delayedValidation = setTimeout(() => {
      setIsEditing(false);
      setIsValid(valueIsValid(value));
    }, 500);
    return () => clearTimeout(delayedValidation);
  }, [value]);

  return (
    <>
      <div className="vat-input">
        <input
          placeholder="Enter VAT Number..."
          value={value}
          onChange={(e) => onValueChange(e)}
          maxLength={12}
        />
      </div>
      {validationIcon && (
        <div className="validation-icon">{validationIcon}</div>
      )}
    </>
  );
};

const valueIsValid = (value) => {
  const sanitisedValue = [...value].filter(o => !isNaN(o) && o !== " ");

  if (sanitisedValue.length !== 9) {
    return false;
  }

  let valid = false;
  let num1 = sanitisedValue[0] * 8;
  let num2 = sanitisedValue[1] * 7;
  let num3 = sanitisedValue[2] * 6;
  let num4 = sanitisedValue[3] * 5;
  let num5 = sanitisedValue[4] * 4;
  let num6 = sanitisedValue[5] * 3;
  let num7 = sanitisedValue[6] * 2;
  let bignum = num1 + num2 + num3 + num4 + num5 + num6 + num7;

  while (bignum > -1) {
      bignum -= 97;
  }

  bignum *= -1;
  
  let lastnum = parseInt(sanitisedValue[7] + sanitisedValue[8]);

  if (bignum === lastnum) {
    valid = true;
  }

  return valid;
  };
