// src/utils/validation.ts

import { FormValidationSchema, ValidationRule } from '@/types/forms'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone validation regex (Ecuador format)
const PHONE_REGEX = /^(\+593|0)[0-9]{8,9}$/

// Cedula validation regex (Ecuador)
const CEDULA_REGEX = /^[0-9]{10}$/

// Validation functions
export const validators = {
  required: (value: any): string | null => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'Este campo es requerido'
    }
    return null
  },

  email: (value: string): string | null => {
    if (!value) return null
    if (!EMAIL_REGEX.test(value)) {
      return 'Ingresa un email válido'
    }
    return null
  },

  phone: (value: string): string | null => {
    if (!value) return null
    if (!PHONE_REGEX.test(value)) {
      return 'Ingresa un número de teléfono válido'
    }
    return null
  },

  cedula: (value: string): string | null => {
    if (!value) return null
    if (!CEDULA_REGEX.test(value)) {
      return 'Ingresa una cédula válida (10 dígitos)'
    }
    // Validación adicional del dígito verificador
    if (!validateEcuadorianCedula(value)) {
      return 'Número de cédula inválido'
    }
    return null
  },

  minLength: (min: number) => (value: string): string | null => {
    if (!value) return null
    if (value.length < min) {
      return `Debe tener al menos ${min} caracteres`
    }
    return null
  },

  maxLength: (max: number) => (value: string): string | null => {
    if (!value) return null
    if (value.length > max) {
      return `No puede exceder ${max} caracteres`
    }
    return null
  },

  fileSize: (maxSizeInMB: number) => (file: File): string | null => {
    if (!file) return null
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    if (file.size > maxSizeInBytes) {
      return `El archivo no puede exceder ${maxSizeInMB}MB`
    }
    return null
  },

  fileType: (allowedTypes: string[]) => (file: File): string | null => {
    if (!file) return null
    if (!allowedTypes.includes(file.type)) {
      return `Tipo de archivo no permitido. Tipos válidos: ${allowedTypes.join(', ')}`
    }
    return null
  },

  url: (value: string): string | null => {
    if (!value) return null
    try {
      new URL(value)
      return null
    } catch {
      return 'Ingresa una URL válida'
    }
  },

  pattern: (regex: RegExp, message: string) => (value: string): string | null => {
    if (!value) return null
    if (!regex.test(value)) {
      return message
    }
    return null
  }
}

// Validate individual field
export const validateField = (value: any, rules: ValidationRule): string | null => {
  // Required validation
  if (rules.required) {
    const error = validators.required(value)
    if (error) return error
  }

  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && !value.trim())) {
    return null
  }

  // Length validations
  if (rules.minLength && typeof value === 'string') {
    const error = validators.minLength(rules.minLength)(value)
    if (error) return error
  }

  if (rules.maxLength && typeof value === 'string') {
    const error = validators.maxLength(rules.maxLength)(value)
    if (error) return error
  }

  // Pattern validation
  if (rules.pattern && typeof value === 'string') {
    if (!rules.pattern.test(value)) {
      return 'Formato inválido'
    }
  }

  // Custom validation
  if (rules.custom) {
    const error = rules.custom(value)
    if (error) return error
  }

  return null
}

// Validate entire form
export const validateForm = <T extends Record<string, any>>(
  values: T,
  schema: FormValidationSchema
): Record<string, string> => {
  const errors: Record<string, string> = {}

  Object.entries(schema).forEach(([fieldName, rules]) => {
    const value = values[fieldName]
    const error = validateField(value, rules)
    if (error) {
      errors[fieldName] = error
    }
  })

  return errors
}

// Validation schemas for different forms

export const jobApplicationSchema: FormValidationSchema = {
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    required: true,
    custom: validators.email
  },
  phoneNumber: {
    required: true,
    custom: validators.phone
  },
  position: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  experience: {
    maxLength: 1000
  },
  skills: {
    maxLength: 500
  },
  education: {
    maxLength: 500
  },
  coverLetter: {
    maxLength: 2000
  },
  salary: {
    maxLength: 50
  },
  linkedIn: {
    custom: (value: string) => value ? validators.url(value) : null
  },
  github: {
    custom: (value: string) => value ? validators.url(value) : null
  },
  portfolio: {
    custom: (value: string) => value ? validators.url(value) : null
  },
  resume: {
    custom: (file: File) => {
      if (!file) return 'CV es requerido'
      const sizeError = validators.fileSize(5)(file)
      if (sizeError) return sizeError
      const typeError = validators.fileType([
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ])(file)
      return typeError
    }
  },
  agreedToTerms: {
    required: true,
    custom: (value: boolean) => value ? null : 'Debes aceptar los términos y condiciones'
  }
}

export const discountFormSchema: FormValidationSchema = {
  identificacion: {
    required: true,
    custom: validators.cedula
  },
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  phoneNumber: {
    required: true,
    custom: validators.phone
  },
  email: {
    required: true,
    custom: validators.email
  },
  serviceInterest: {
    required: true
  },
  companyName: {
    maxLength: 100
  },
  projectDescription: {
    maxLength: 2000
  },
  agreedToTerms: {
    required: true,
    custom: (value: boolean) => value ? null : 'Debes aceptar los términos y condiciones'
  }
}

export const contactFormSchema: FormValidationSchema = {
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    required: true,
    custom: validators.email
  },
  phoneNumber: {
    custom: (value: string) => value ? validators.phone(value) : null
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 200
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 2000
  },
  agreedToTerms: {
    required: true,
    custom: (value: boolean) => value ? null : 'Debes aceptar los términos y condiciones'
  }
}

// Utility function to validate Ecuadorian cedula
function validateEcuadorianCedula(cedula: string): boolean {
  if (cedula.length !== 10) return false

  const digits = cedula.split('').map(Number)
  const checkDigit = digits[9]
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    let digit = digits[i]
    if (i % 2 === 0) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
  }
  
  const calculatedCheckDigit = (10 - (sum % 10)) % 10
  return calculatedCheckDigit === checkDigit
}

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}