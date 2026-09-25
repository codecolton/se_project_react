import { useCallback, useState } from "react";

export function useFormWithValidation(defaultValues, validationRules = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validate = useCallback(
    (currentValues = values) => {
      const nextErrors = {};

      Object.entries(validationRules).forEach(([name, rule]) => {
        const value = currentValues[name];
        const validationResult = rule(value, currentValues);

        if (validationResult) {
          nextErrors[name] = validationResult;
        }
      });

      setErrors(nextErrors);
      setIsValid(Object.keys(nextErrors).length === 0);

      return nextErrors;
    },
    [validationRules, values],
  );

  function handleChange(evt) {
    const { name, value, type, checked } = evt.target;
    const nextValue = type === "checkbox" ? checked : value;
    const nextValues = { ...values, [name]: nextValue };

    setValues(nextValues);

    const nextErrors = {};

    Object.entries(validationRules).forEach(([fieldName, rule]) => {
      const validationResult = rule(nextValues[fieldName], nextValues);

      if (validationResult) {
        nextErrors[fieldName] = validationResult;
      }
    });

    setErrors(nextErrors);
    setIsValid(Object.keys(nextErrors).length === 0);
  }

  const resetForm = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
  }, [defaultValues]);

  return {
    values,
    errors,
    isValid,
    setValues,
    handleChange,
    validate,
    resetForm,
  };
}
