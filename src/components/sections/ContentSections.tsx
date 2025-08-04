// src/components/sections/ContentSections.tsx
// Organizando las páginas - mantiene tu código base intacto

'use client'

import { useState } from 'react'
import { DiscountWheel } from '../wheel/DiscountWheel'
import { ServiceCarousel } from '../layout/ServiceCarousel'

// Importar páginas organizadas
import { InicioPage } from '../../pages/InicioPage'
import { ServiciosPage } from '../../pages/ServiciosPage'
import { TrabajaPage } from '../../pages/TrabajaPage'
import { SolucionaPage } from '../../pages/SolucionaPage'
import { ProteccionPage } from '../../pages/ProteccionPage'

// Definir el tipo para el resultado de la rueda
interface WheelResult {
  message: string
  isWinning: boolean
}

interface ContentSectionsProps {
  activeSection: string
}

export const ContentSections = ({ activeSection }: ContentSectionsProps) => {
  const [wheelResult, setWheelResult] = useState<WheelResult | null>(null)
  const [showWheel, setShowWheel] = useState(false)

  const handleWheelResult = (result: WheelResult) => {
    setWheelResult(result)
    setTimeout(() => {
      setShowWheel(false)
    }, 5000) // Ocultar rueda después de 5 segundos
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'inicio':
        return <InicioPage />

      case 'servicios':
        return <ServiciosPage />

      case 'trabaja':
        return <TrabajaPage />

      case 'soluciona':
        return <SolucionaPage />

      case 'proteccion':
        return <ProteccionPage />

      default:
        return (
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold">Bienvenido a Intelcobro</h2>
          </div>
        )
    }
  }

  return (
    <>
      {/* Contenido normal */}
      <div className="flex items-center justify-center h-full" style={{ padding: '2rem' }}>
        {renderContent()}
      </div>

      {/* Modal de la Rueda (si es necesario) */}
      {showWheel && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'var(--primary-dark)',
            borderRadius: '20px',
            padding: '2rem',
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh'
          }}>
            <button
              onClick={() => setShowWheel(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            
            <DiscountWheel onResult={handleWheelResult} />
          </div>
        </div>
      )}
    </>
  )
}