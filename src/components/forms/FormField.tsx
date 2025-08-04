// src/components/forms/FormField.tsx

'use client'

import React from 'react'
import { FormFieldProps } from '@/types/forms'

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type,
  required = false,
  placeholder,
  options = [],
  maxLength,
  accept,
  multiple = false,
  disabled = false,
  error,
  value,
  onChange,
  onBlur
}) => {
  const baseInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '6px 10px', // Más compacto
    border: error ? '2px solid #ef4444' : '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)', // Responsivo
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: disabled ? '#f9fafb' : 'white'
  }

  const focusStyle: React.CSSProperties = {
    borderColor: error ? '#ef4444' : 'var(--primary-red)',
    boxShadow: error 
      ? '0 0 0 2px rgba(239, 68, 68, 0.1)' 
      : '0 0 0 2px rgba(214, 35, 54, 0.1)'
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let newValue: any = e.target.value

    if (type === 'boolean') {
      newValue = (e.target as HTMLInputElement).checked
    } else if (type === 'file') {
      const files = (e.target as HTMLInputElement).files
      newValue = multiple ? files : files?.[0] || null
    }

    onChange?.(newValue)
  }

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value || ''}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            style={{
              ...baseInputStyle,
              minHeight: '50px', // Más compacto
              resize: 'vertical'
            }}
            onFocus={(e) => {
              Object.assign(e.target.style, focusStyle)
            }}
            onBlurCapture={(e) => {
              e.target.style.borderColor = error ? '#ef4444' : '#d1d5db'
              e.target.style.boxShadow = 'none'
            }}
          />
        )

      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value || ''}
            onChange={handleInputChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            style={baseInputStyle}
            onFocus={(e) => {
              Object.assign(e.target.style, focusStyle)
            }}
            onBlurCapture={(e) => {
              e.target.style.borderColor = error ? '#ef4444' : '#d1d5db'
              e.target.style.boxShadow = 'none'
            }}
          >
            <option value="">Selecciona una opción</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'boolean':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={value || false}
              onChange={handleInputChange}
              onBlur={onBlur}
              disabled={disabled}
              required={required}
              style={{
                width: '14px', // Más pequeño
                height: '14px',
                accentColor: 'var(--primary-red)'
              }}
            />
            <label 
              htmlFor={name}
              style={{
                fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', // Responsivo
                color: disabled ? '#6b7280' : 'var(--primary-dark)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                lineHeight: '1.2'
              }}
            >
              {label}
              {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
            </label>
          </div>
        )

      case 'file':
        return (
          <div>
            <input
              type="file"
              id={name}
              name={name}
              onChange={handleInputChange}
              onBlur={onBlur}
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              required={required}
              style={{
                ...baseInputStyle,
                padding: '4px', // Más compacto
                cursor: disabled ? 'not-allowed' : 'pointer'
              }}
            />
            {maxLength && (
              <p style={{
                fontSize: 'clamp(0.65rem, 1.8vw, 0.7rem)', // Responsivo
                color: '#6b7280',
                marginTop: '2px'
              }}>
                Tamaño máximo: {Math.round(maxLength / 1024 / 1024)}MB
              </p>
            )}
          </div>
        )

      case 'date':
        return (
          <input
            type="date"
            id={name}
            name={name}
            value={value || ''}
            onChange={handleInputChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            style={baseInputStyle}
            onFocus={(e) => {
              Object.assign(e.target.style, focusStyle)
            }}
            onBlurCapture={(e) => {
              e.target.style.borderColor = error ? '#ef4444' : '#d1d5db'
              e.target.style.boxShadow = 'none'
            }}
          />
        )

      case 'url':
        return (
          <input
            type="url"
            id={name}
            name={name}
            value={value || ''}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            style={baseInputStyle}
            onFocus={(e) => {
              Object.assign(e.target.style, focusStyle)
            }}
            onBlurCapture={(e) => {
              e.target.style.borderColor = error ? '#ef4444' : '#d1d5db'
              e.target.style.boxShadow = 'none'
            }}
          />
        )

      default: // text, email, tel
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value || ''}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            style={baseInputStyle}
            onFocus={(e) => {
              Object.assign(e.target.style, focusStyle)
            }}
            onBlurCapture={(e) => {
              e.target.style.borderColor = error ? '#ef4444' : '#d1d5db'
              e.target.style.boxShadow = 'none'
            }}
          />
        )
    }
  }

  return (
    <div style={{ marginBottom: '0.4rem' }}> {/* Más compacto */}
      {type !== 'boolean' && (
        <label 
          htmlFor={name}
          style={{
            display: 'block',
            marginBottom: '2px', // Más compacto
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', // Responsivo
            fontWeight: '500',
            color: 'var(--primary-dark)'
          }}
        >
          {label}
          {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      
      {renderInput()}
      
      {error && (
        <p style={{
          marginTop: '2px',
          fontSize: 'clamp(0.65rem, 1.8vw, 0.7rem)', // Responsivo
          color: '#ef4444'
        }}>
          {error}
        </p>
      )}
      
      {maxLength && type !== 'file' && value && typeof value === 'string' && (
        <p style={{
          marginTop: '2px',
          fontSize: 'clamp(0.65rem, 1.8vw, 0.7rem)', // Responsivo
          color: value.length > maxLength * 0.9 ? '#f59e0b' : '#6b7280'
        }}>
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  )
}