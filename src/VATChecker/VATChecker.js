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
  /*
   * For UK VAT numbers do the following exercise: Excluding the first two letters, list the numbers vertically and multiply each by a value starting with 8 and ending with 2. Then add up all the sums you have and deduct 97 from the sum until the answer is negative. The negative sum should be equal to the last 2 digits of the VAT number.
   *
   * So for example, the VAT number for HSBC bank is GB 365684514 the calculation is:
   *    3 x 8 = 24
   *    6 x 7 = 42
   *    5 x 6 = 30
   *    6 x 5 = 30
   *    8 x 4 = 32
   *    4 x 3 = 12
   *    5 x 2 = 10
   *
   * The total of the above calculation is 24+42+30+30+32+12+10=180.
   *
   * Deduct 97 until the result is negative (in this case you will deduct 97 twice).
   * For this example the result is 180-97-97=-14 which is the same as the last two digits so the VAT number is valid.
   */

  // TODO: Implement the validation logic for UK VAT numbers. Return true if the value is valid, return false if the value is not.

  return undefined;
};
