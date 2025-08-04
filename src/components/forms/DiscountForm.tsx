// src/components/forms/DiscountForm.tsx

'use client'

import React from 'react'
import { FormField } from './FormField'
import { useForm } from '@/hooks/useForm'
import { useForms, useNotifications } from '@/hooks/useIntelcobro'
import { DiscountFormValues, SERVICE_OPTIONS, COMPANY_SIZE_OPTIONS, BUDGET_OPTIONS, TIMELINE_OPTIONS, REFERRAL_SOURCE_OPTIONS } from '@/types/forms'
import { discountFormSchema } from '@/utils/validation'

const initialValues: DiscountFormValues = {
  identificacion: '',
  fullName: '',
  phoneNumber: '',
  email: '',
  serviceInterest: '',
  companyName: '',
  companySize: '',
  budget: '',
  timeline: '',
  projectDescription: '',
  wheelResultId: '',
  discountCode: '',
  referralSource: '',
  agreeToMarketing: false,
  agreedToTerms: false
}

interface DiscountFormProps {
  wheelResultId?: string
  discountCode?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const DiscountForm: React.FC<DiscountFormProps> = ({
  wheelResultId,
  discountCode,
  onSuccess,
  onError
}) => {
  const { formState, handleChange, handleBlur, handleSubmit, reset } = useForm(
    {
      ...initialValues,
      wheelResultId: wheelResultId || '',
      discountCode: discountCode || ''
    },
    discountFormSchema
  )
  const { submitDiscountForm, isSubmitting } = useForms()
  const { addNotification } = useNotifications()

  const onSubmit = async (values: DiscountFormValues) => {
    try {
      const response = await submitDiscountForm(values)
      
      addNotification(
        '¡Formulario enviado exitosamente! Nos contactaremos contigo pronto.',
        'success'
      )
      
      reset()
      onSuccess?.()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar el formulario'
      addNotification(errorMessage, 'error')
      onError?.(errorMessage)
    }
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '0.75rem',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      border: '1px solid #eee',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header fijo */}
      <div style={{ flexShrink: 0, marginBottom: '0.5rem' }}>
        <h3 style={{
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          fontWeight: 'bold',
          margin: '0 0 0.25rem 0',
          color: 'var(--primary-dark)',
          textAlign: 'center'
        }}>
          Solicita Asesoría Gratuita
        </h3>

        {(wheelResultId || discountCode) && (
          <div style={{
            backgroundColor: 'var(--primary-green)',
            color: 'white',
            padding: '0.4rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)'
          }}>
            🎉 ¡Descuento aplicado!
          </div>
        )}
      </div>
      
      {/* Formulario con scroll */}
      <form 
        onSubmit={handleSubmit(onSubmit)}
        style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ 
          flex: 1,
          overflowY: 'auto',
          paddingRight: '4px',
          marginRight: '-4px'
        }}>
          <div style={{ display: 'grid', gap: '0.4rem' }}>
            {/* Información Personal - Grid 2 columnas */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '0.4rem',
              marginBottom: '0.3rem'
            }}>
              <FormField
                name="identificacion"
                label="Cédula"
                type="text"
                required
                placeholder="1234567890"
                maxLength={10}
                value={formState.values.identificacion}
                onChange={(value) => handleChange('identificacion', value)}
                onBlur={() => handleBlur('identificacion')}
                error={formState.touched.identificacion ? formState.errors.identificacion : undefined}
              />

              <FormField
                name="fullName"
                label="Nombre"
                type="text"
                required
                placeholder="Tu nombre"
                value={formState.values.fullName}
                onChange={(value) => handleChange('fullName', value)}
                onBlur={() => handleBlur('fullName')}
                error={formState.touched.fullName ? formState.errors.fullName : undefined}
              />
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '0.4rem',
              marginBottom: '0.3rem'
            }}>
              <FormField
                name="phoneNumber"
                label="Teléfono"
                type="tel"
                required
                placeholder="+593 99 999 9999"
                value={formState.values.phoneNumber}
                onChange={(value) => handleChange('phoneNumber', value)}
                onBlur={() => handleBlur('phoneNumber')}
                error={formState.touched.phoneNumber ? formState.errors.phoneNumber : undefined}
              />

              <FormField
                name="email"
                label="Email"
                type="email"
                required
                placeholder="tu@email.com"
                value={formState.values.email}
                onChange={(value) => handleChange('email', value)}
                onBlur={() => handleBlur('email')}
                error={formState.touched.email ? formState.errors.email : undefined}
              />
            </div>

            {/* Información del Proyecto */}
            <FormField
              name="serviceInterest"
              label="Servicio de interés"
              type="select"
              required
              options={SERVICE_OPTIONS}
              value={formState.values.serviceInterest}
              onChange={(value) => handleChange('serviceInterest', value)}
              onBlur={() => handleBlur('serviceInterest')}
              error={formState.touched.serviceInterest ? formState.errors.serviceInterest : undefined}
            />

            <FormField
              name="projectDescription"
              label="Descripción del proyecto"
              type="textarea"
              placeholder="Cuéntanos sobre tu proyecto..."
              maxLength={500}
              value={formState.values.projectDescription}
              onChange={(value) => handleChange('projectDescription', value)}
              onBlur={() => handleBlur('projectDescription')}
              error={formState.touched.projectDescription ? formState.errors.projectDescription : undefined}
            />

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '0.4rem',
              marginBottom: '0.3rem'
            }}>
              <FormField
                name="budget"
                label="Presupuesto"
                type="select"
                options={BUDGET_OPTIONS}
                value={formState.values.budget}
                onChange={(value) => handleChange('budget', value)}
                onBlur={() => handleBlur('budget')}
                error={formState.touched.budget ? formState.errors.budget : undefined}
              />

              <FormField
                name="timeline"
                label="Tiempo"
                type="select"
                options={TIMELINE_OPTIONS}
                value={formState.values.timeline}
                onChange={(value) => handleChange('timeline', value)}
                onBlur={() => handleBlur('timeline')}
                error={formState.touched.timeline ? formState.errors.timeline : undefined}
              />
            </div>

            {/* Empresa (Opcional) */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '0.4rem',
              marginBottom: '0.3rem'
            }}>
              <FormField
                name="companyName"
                label="Empresa (Opcional)"
                type="text"
                placeholder="Tu empresa"
                value={formState.values.companyName}
                onChange={(value) => handleChange('companyName', value)}
                onBlur={() => handleBlur('companyName')}
                error={formState.touched.companyName ? formState.errors.companyName : undefined}
              />

              <FormField
                name="referralSource"
                label="¿Cómo nos conociste?"
                type="select"
                options={REFERRAL_SOURCE_OPTIONS}
                value={formState.values.referralSource}
                onChange={(value) => handleChange('referralSource', value)}
                onBlur={() => handleBlur('referralSource')}
                error={formState.touched.referralSource ? formState.errors.referralSource : undefined}
              />
            </div>

            {/* Checkboxes compactos */}
            <div style={{ marginBottom: '0.3rem' }}>
              <FormField
                name="agreeToMarketing"
                label="Acepto recibir información promocional"
                type="boolean"
                value={formState.values.agreeToMarketing}
                onChange={(value) => handleChange('agreeToMarketing', value)}
                onBlur={() => handleBlur('agreeToMarketing')}
              />
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <FormField
                name="agreedToTerms"
                label="Acepto términos y condiciones"
                type="boolean"
                required
                value={formState.values.agreedToTerms}
                onChange={(value) => handleChange('agreedToTerms', value)}
                onBlur={() => handleBlur('agreedToTerms')}
                error={formState.touched.agreedToTerms ? formState.errors.agreedToTerms : undefined}
              />
            </div>
          </div>
        </div>

        {/* Submit Button fijo en la parte inferior */}
        <div style={{ 
          paddingTop: '0.5rem',
          borderTop: '1px solid #f0f0f0',
          flexShrink: 0
        }}>
          <button 
            type="submit" 
            disabled={isSubmitting || !formState.isValid}
            style={{
              backgroundColor: isSubmitting || !formState.isValid ? '#6b7280' : 'var(--primary-red)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              fontWeight: 'bold',
              cursor: isSubmitting || !formState.isValid ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isSubmitting || !formState.isValid ? 0.6 : 1,
              width: '100%'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && formState.isValid) {
                (e.target as HTMLButtonElement).style.transform = 'scale(1.02)'
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1)'
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Solicitar Asesoría'}
          </button>
        </div>
      </form>
    </div>
  )
}