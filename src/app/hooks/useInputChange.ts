import { useState } from 'react'

import { InputValue } from '@/types'

export function useInputChange<T extends Record<string, InputValue>>(
  initialValues: T
) {
  const [formData, setFormData] = useState<T>(initialValues)

  const handleInputChange = (name: keyof T, value: InputValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value as T[typeof name],
    }))
  }
  console.log('formData: ', formData)
  return {
    formData,
    setFormData,
    handleInputChange,
  }
}
