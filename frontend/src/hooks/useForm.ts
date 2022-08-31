import { useState } from 'react';

export function useForm<T>(initialValue: T) {
  const [formData, setFormData] = useState<T>({ ...initialValue });
  const values = { ...formData };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return { values, onChangeInput };
}
