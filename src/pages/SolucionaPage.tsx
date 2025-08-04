// src/pages/SolucionaPage.tsx

'use client'

import React, { useState } from 'react'
import { DiscountWheel } from '../components/wheel/DiscountWheel'
import { DiscountForm } from '../components/forms/DiscountForm'
import { WheelResult } from '../types/wheel'

export const SolucionaPage = () => {
  const [wheelResult, setWheelResult] = useState<WheelResult | null>(null)

  return (
    <div style={{ 
      color: 'var(--primary-dark)', 
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header compacto */}
      <div style={{
        textAlign: 'center',
        padding: '1rem 2rem 0.5rem 2rem',
        flexShrink: 0
      }}>
        <h2 style={{ 
          fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
          fontWeight: 'bold', 
          margin: '0 0 0.25rem 0',
          color: 'var(--primary-dark)'
        }}>
          Soluciona tu Deuda
        </h2>
        
        <p style={{
          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
          lineHeight: '1.3',
          margin: '0',
          color: 'var(--primary-dark)',
          opacity: 0.8
        }}>
          Te ayudamos a encontrar la mejor solución para tu situación financiera
        </p>
      </div>

      {/* Contenido principal */}
      <div 
        className="main-content"
        style={{
          flex: 1,
          display: 'flex',
          padding: '0.5rem 1rem 1rem 1rem',
          gap: 'clamp(0.5rem, 2vw, 1.5rem)',
          minHeight: 0, // Importante para el flex
          overflow: 'hidden'
        }}
      >

        {/* Columna izquierda - Formulario */}
        <div 
          className="form-column"
          style={{
            flex: '1',
            minWidth: '300px',
            maxWidth: '450px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <DiscountForm
              wheelResultId={wheelResult?.id}
              discountCode={wheelResult?.discount ? `${wheelResult.discount}OFF` : undefined}
              onSuccess={() => {
                console.log('Discount form submitted successfully')
              }}
              onError={(error) => {
                console.error('Discount form error:', error)
              }}
            />
          </div>
        </div>

        {/* Columna derecha - Ruleta */}
        <div 
          className="wheel-column"
          style={{
            flex: '1',
            minWidth: '280px',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <div 
            className="wheel-container"
            style={{
              backgroundColor: 'var(--primary-dark)',
              padding: 'clamp(0.75rem, 2vw, 1.25rem)',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '1px solid #eee',
              textAlign: 'center',
              width: '100%',
              maxWidth: '350px',
              height: 'fit-content',
              maxHeight: '100%',
              overflow: 'hidden'
            }}
          >
            <h3 style={{
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              fontWeight: 'bold',
              margin: '0 0 0.25rem 0',
              color: 'white'
            }}>
              ¡Obtén tu Descuento!
            </h3>
            
            <p style={{
              fontSize: 'clamp(0.8rem, 2.2vw, 0.9rem)',
              color: 'rgba(255,255,255,0.9)',
              margin: '0 0 0.5rem 0',
              lineHeight: '1.3'
            }}>
              Gira la ruleta y obtén un descuento especial
            </p>

            {/* Ruleta responsiva */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}>
              <DiscountWheel 
                size={Math.min(240, window.innerWidth * 0.3, window.innerHeight * 0.4)}
                onResult={(result) => {
                  setWheelResult(result)
                }}
                onSpin={() => {
                  console.log('Wheel spinning started')
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media Queries para dispositivos móviles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .main-content {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          .form-column, .wheel-column {
            min-width: unset !important;
            max-width: unset !important;
            width: 100% !important;
          }
          
          .wheel-container {
            max-width: 300px !important;
            margin: 0 auto !important;
          }
        }
        
        @media (max-height: 600px) {
          .header {
            padding: 0.5rem 1rem 0.25rem 1rem !important;
          }
          
          .main-content {
            padding: 0.25rem 1rem 0.5rem 1rem !important;
          }
          
          .wheel-container {
            padding: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  )
}