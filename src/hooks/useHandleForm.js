import { useState } from "react";
const textRegex = /^(?=.{4,30}$)[A-Za-z ]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = {
  minLength: /^.{8,}$/,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  digit: /\d/,
  specialChar: /[@$!%*?&#^()_\-+=~.,<>{}[\]|\\/:;"'`]/,
  allowedCharsOnly: /^[A-Za-z\d@$!%*?&#]+$/,
};

const useHandleForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const validate = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "name":
        if (!value.trim()) return "Can't be empty!";
        if (!textRegex.test(value)) return "between 4 and 30";
        return "";

      case "message":
        if (!value.trim()) return "Can't be empty!";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Invalid email";
        return "";

      case "currentPassword":
        if (!value) return "Current password is required";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (!passwordRegex.minLength.test(value))
          return "Password must be at least 8 characters long.";
        if (!passwordRegex.lowercase.test(value))
          return "Password must contain at least one lowercase letter.";
        if (!passwordRegex.uppercase.test(value))
          return "Password must contain at least one uppercase letter.";
        if (!passwordRegex.digit.test(value))
          return "Password must contain at least one digit.";
        if (!passwordRegex.specialChar.test(value))
          return "Password must contain at least one special character.";
        if (!passwordRegex.allowedCharsOnly.test(value))
          return "Only letters, digits, and @ $ ! % * ? & # are allowed.";
        return "";

      case "confirmPassword":
        if (!value) return "Confirm Password is required";
        if (value !== values.password) return "Password does not match";
        return "";

      case "destinationUrl":
        if (!value.trim()) return "URL is required";
        try {
          const url = new URL(value);
          if (!["http:", "https:"].includes(url.protocol)) {
            return "Invalid URL";
          }
        } catch {
          return "Invalid URL";
        }
        return "";

      default:
        return "";
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    if (!isSubmitted) return;
    setErrors((pre) => ({ ...pre, [name]: validate(name, value) }));
  };
  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const newErrors = {};
    Object.keys(values).forEach((key) => {
      newErrors[key] = validate(key, values[key]);
    });
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((error) => error !== "");
    if (hasError) return;
    setIsLoading(true);
    try {
      await callback(values);
    } finally {
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setValues({ ...initialValues });
    setErrors({});
  };
  return {
    handleChange,
    setValues,
    errors,
    resetForm,
    handleSubmit,
    values,
    isLoading,
  };
};

export default useHandleForm;
