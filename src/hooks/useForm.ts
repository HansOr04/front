// src/hooks/useForm.ts

import { useState, useCallback } from 'react'
import { FormState, FormHookReturn, FormValidationSchema } from '@/types/forms'
import { validateForm, sanitizeInput } from '@/utils/validation'

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: FormValidationSchema
): FormHookReturn<T> {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    isSubmitting: false,
    isValid: true,
    touched: {}
  })

  // Handle field changes
  const handleChange = useCallback((name: string, value: any) => {
    setFormState(prev => {
      const newValues = { ...prev.values }
      
      // Sanitize string inputs
      if (typeof value === 'string') {
        newValues[name as keyof T] = sanitizeInput(value) as T[keyof T]
      } else {
        newValues[name as keyof T] = value
      }
      
      // Validate if schema is provided
      let newErrors = { ...prev.errors }
      if (validationSchema) {
        const fieldErrors = validateForm(newValues, validationSchema)
        newErrors = fieldErrors
      }
      
      return {
        ...prev,
        values: newValues,
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0
      }
    })
  }, [validationSchema])

  // Handle field blur (mark as touched)
  const handleBlur = useCallback((name: string) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true }
    }))
  }, [])

  // Handle form submission
  const handleSubmit = useCallback((onSubmit: (values: T) => Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault()
      
      // Mark all fields as touched
      const allTouched = Object.keys(formState.values).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {} as Record<string, boolean>)
      
      // Validate if schema is provided
      let errors = {}
      if (validationSchema) {
        errors = validateForm(formState.values, validationSchema)
      }
      
      setFormState(prev => ({
        ...prev,
        touched: allTouched,
        errors,
        isValid: Object.keys(errors).length === 0
      }))
      
      // Don't submit if there are errors
      if (Object.keys(errors).length > 0) {
        return
      }
      
      // Set submitting state
      setFormState(prev => ({ ...prev, isSubmitting: true }))
      
      try {
        await onSubmit(formState.values)
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setFormState(prev => ({ ...prev, isSubmitting: false }))
      }
    }
  }, [formState.values, validationSchema])

  // Reset form
  const reset = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      isSubmitting: false,
      isValid: true,
      touched: {}
    })
  }, [initialValues])

  // Set field error manually
  const setFieldError = useCallback((name: string, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [name]: error },
      isValid: false
    }))
  }, [])

  // Set field value manually
  const setFieldValue = useCallback((name: string, value: any) => {
    handleChange(name, value)
  }, [handleChange])

  return {
    formState,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldError,
    setFieldValue
  }
}