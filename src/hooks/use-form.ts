import { useState } from 'react';

function useForm(initialValues: any, validate: (values: any) => any) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as any;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    });
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const handleSubmit = (e: React.FormEvent, callback: Function) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      callback();
      setIsSubmitting(false);
    }
  };

  return { values, errors, touched, handleChange, handleSubmit, isSubmitting };
}

export default useForm;
