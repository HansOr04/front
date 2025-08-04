// src/components/forms/JobApplicationForm.tsx

'use client'

import React from 'react'
import { FormField } from './FormField'
import { useForm } from '@/hooks/useForm'
import { useForms, useNotifications } from '@/hooks/useIntelcobro'
import { JobApplicationFormValues } from '@/types/forms'
import { jobApplicationSchema } from '@/utils/validation'

const initialValues: JobApplicationFormValues = {
  fullName: '',
  email: '',
  phoneNumber: '',
  position: '',
  experience: '',
  skills: '',
  education: '',
  availability: '',
  portfolio: '',
  coverLetter: '',
  salary: '',
  relocate: false,
  remoteWork: false,
  startDate: '',
  references: '',
  linkedIn: '',
  github: '',
  resume: null,
  additionalInfo: '',
  agreedToTerms: false
}

interface JobApplicationFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  onSuccess,
  onError
}) => {
  const { formState, handleChange, handleBlur, handleSubmit, reset } = useForm(
    initialValues,
    jobApplicationSchema
  )
  const { submitJobApplication, isSubmitting } = useForms()
  const { addNotification } = useNotifications()

  const onSubmit = async (values: JobApplicationFormValues) => {
    try {
      const response = await submitJobApplication(values)
      
      addNotification(
        '¡Aplicación enviada exitosamente! Te contactaremos pronto.',
        'success'
      )
      
      reset()
      onSuccess?.()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar la aplicación'
      addNotification(errorMessage, 'error')
      onError?.(errorMessage)
    }
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      border: '1px solid #eee',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: 'var(--primary-dark)',
        textAlign: 'center'
      }}>
        Envía tu Hoja de Vida
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {/* Personal Information */}
          <div style={{ 
            borderBottom: '1px solid #e5e7eb', 
            paddingBottom: '1rem',
            marginBottom: '1rem'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              color: 'var(--primary-dark)',
              marginBottom: '1rem'
            }}>
              Información Personal
            </h4>
            
            <FormField
              name="fullName"
              label="Nombre completo"
              type="text"
              required
              placeholder="Tu nombre completo"
              value={formState.values.fullName}
              onChange={(value) => handleChange('fullName', value)}
              onBlur={() => handleBlur('fullName')}
              error={formState.touched.fullName ? formState.errors.fullName : undefined}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
            </div>
          </div>

          {/* Job Information */}
          <div style={{ 
            borderBottom: '1px solid #e5e7eb', 
            paddingBottom: '1rem',
            marginBottom: '1rem'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              color: 'var(--primary-dark)',
              marginBottom: '1rem'
            }}>
              Información Laboral
            </h4>

            <FormField
              name="position"
              label="Posición de interés"
              type="text"
              required
              placeholder="Ej: Desarrollador Frontend"
              value={formState.values.position}
              onChange={(value) => handleChange('position', value)}
              onBlur={() => handleBlur('position')}
              error={formState.touched.position ? formState.errors.position : undefined}
            />

            <FormField
              name="experience"
              label="Experiencia profesional"
              type="textarea"
              placeholder="Describe tu experiencia laboral relevante..."
              maxLength={1000}
              value={formState.values.experience}
              onChange={(value) => handleChange('experience', value)}
              onBlur={() => handleBlur('experience')}
              error={formState.touched.experience ? formState.errors.experience : undefined}
            />

            <FormField
              name="skills"
              label="Habilidades técnicas"
              type="textarea"
              placeholder="Ej: JavaScript, React, Node.js, Python..."
              maxLength={500}
              value={formState.values.skills}
              onChange={(value) => handleChange('skills', value)}
              onBlur={() => handleBlur('skills')}
              error={formState.touched.skills ? formState.errors.skills : undefined}
            />

            <FormField
              name="education"
              label="Educación"
              type="textarea"
              placeholder="Tu formación académica..."
              maxLength={500}
              value={formState.values.education}
              onChange={(value) => handleChange('education', value)}
              onBlur={() => handleBlur('education')}
              error={formState.touched.education ? formState.errors.education : undefined}
            />
          </div>

          {/* Additional Information */}
          <div style={{ 
            borderBottom: '1px solid #e5e7eb', 
            paddingBottom: '1rem',
            marginBottom: '1rem'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              color: 'var(--primary-dark)',
              marginBottom: '1rem'
            }}>
              Información Adicional
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormField
                name="salary"
                label="Expectativa salarial"
                type="text"
                placeholder="Ej: $1500 - $2000"
                value={formState.values.salary}
                onChange={(value) => handleChange('salary', value)}
                onBlur={() => handleBlur('salary')}
                error={formState.touched.salary ? formState.errors.salary : undefined}
              />

              <FormField
                name="startDate"
                label="Fecha de disponibilidad"
                type="date"
                value={formState.values.startDate}
                onChange={(value) => handleChange('startDate', value)}
                onBlur={() => handleBlur('startDate')}
                error={formState.touched.startDate ? formState.errors.startDate : undefined}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormField
                name="linkedIn"
                label="LinkedIn"
                type="url"
                placeholder="https://linkedin.com/in/tu-perfil"
                value={formState.values.linkedIn}
                onChange={(value) => handleChange('linkedIn', value)}
                onBlur={() => handleBlur('linkedIn')}
                error={formState.touched.linkedIn ? formState.errors.linkedIn : undefined}
              />

              <FormField
                name="portfolio"
                label="Portfolio/GitHub"
                type="url"
                placeholder="https://github.com/tu-usuario"
                value={formState.values.portfolio}
                onChange={(value) => handleChange('portfolio', value)}
                onBlur={() => handleBlur('portfolio')}
                error={formState.touched.portfolio ? formState.errors.portfolio : undefined}
              />
            </div>

            <FormField
              name="coverLetter"
              label="Carta de presentación"
              type="textarea"
              placeholder="¿Por qué te interesa trabajar con nosotros?..."
              maxLength={2000}
              value={formState.values.coverLetter}
              onChange={(value) => handleChange('coverLetter', value)}
              onBlur={() => handleBlur('coverLetter')}
              error={formState.touched.coverLetter ? formState.errors.coverLetter : undefined}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormField
                name="relocate"
                label="¿Estarías dispuesto/a a reubicarte?"
                type="boolean"
                value={formState.values.relocate}
                onChange={(value) => handleChange('relocate', value)}
                onBlur={() => handleBlur('relocate')}
              />

              <FormField
                name="remoteWork"
                label="¿Te interesa el trabajo remoto?"
                type="boolean"
                value={formState.values.remoteWork}
                onChange={(value) => handleChange('remoteWork', value)}
                onBlur={() => handleBlur('remoteWork')}
              />
            </div>
          </div>

          {/* File Upload */}
          <div style={{ 
            borderBottom: '1px solid #e5e7eb', 
            paddingBottom: '1rem',
            marginBottom: '1rem'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              color: 'var(--primary-dark)',
              marginBottom: '1rem'
            }}>
              Documentos
            </h4>

            <FormField
              name="resume"
              label="Curriculum Vitae"
              type="file"
              required
              accept=".pdf,.doc,.docx"
              maxLength={5242880} // 5MB
              value={formState.values.resume}
              onChange={(value) => handleChange('resume', value)}
              onBlur={() => handleBlur('resume')}
              error={formState.touched.resume ? formState.errors.resume : undefined}
            />

            <FormField
              name="additionalInfo"
              label="Información adicional"
              type="textarea"
              placeholder="Cualquier información adicional que consideres relevante..."
              maxLength={1000}
              value={formState.values.additionalInfo}
              onChange={(value) => handleChange('additionalInfo', value)}
              onBlur={() => handleBlur('additionalInfo')}
              error={formState.touched.additionalInfo ? formState.errors.additionalInfo : undefined}
            />
          </div>

          {/* Terms and Conditions */}
          <div style={{ marginBottom: '1rem' }}>
            <FormField
              name="agreedToTerms"
              label="Acepto los términos y condiciones y autorizo el tratamiento de mis datos personales"
              type="boolean"
              required
              value={formState.values.agreedToTerms}
              onChange={(value) => handleChange('agreedToTerms', value)}
              onBlur={() => handleBlur('agreedToTerms')}
              error={formState.touched.agreedToTerms ? formState.errors.agreedToTerms : undefined}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting || !formState.isValid}
            style={{
              backgroundColor: isSubmitting || !formState.isValid ? '#6b7280' : 'var(--primary-red)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isSubmitting || !formState.isValid ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isSubmitting || !formState.isValid ? 0.6 : 1
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
            {isSubmitting ? 'Enviando...' : 'Enviar Aplicación'}
          </button>
        </div>
      </form>
    </div>
  )
}