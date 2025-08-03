'use client'

import React, { useState, useEffect } from 'react'

interface CircularNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

interface NavItem {
  id: string
  label: string
  color: string
  style: React.CSSProperties & {
    textOrientation?: string
  }
}

export const CircularNavigation = ({ activeSection, onSectionChange }: CircularNavigationProps) => {
  const [rotation, setRotation] = useState(0)

  const navItems: NavItem[] = [
    { 
      id: 'inicio', 
      label: 'Inicio', 
      color: '#798553',
      style: {
        width: '180px',
        height: '180px',
        bottom: '142px',
        right: '-115px'
      }
    },
    { 
      id: 'servicios', 
      label: 'Servicios', 
      color: '#D62336',
      style: {
        width: '180px',
        height: '180px',
        transform: 'rotate(90deg)',
        top: '-114px',
        right: '91px',
        writingMode: 'sideways-lr',
        textOrientation: 'mixed'
      }
    },
    { 
      id: 'trabaja', 
      label: 'Trabaja con nosotros', 
      color: '#798553',
      style: {
        width: '180px',
        height: '180px',
        transform: 'rotate(0deg)',
        bottom: '174px',
        left: '-102px',
        fontSize: '25px',
        lineHeight: '1.1'
      }
    },
    { 
      id: 'soluciona', 
      label: 'Soluciona tu deuda', 
      color: '#D62336',
      style: {
        writingMode: 'vertical-rl',
        width: '180px',
        height: '180px',
        transform: 'rotate(-90deg)',
        top: '301px',
        left: '-53px',
        fontSize: '25px',
        lineHeight: '1.1'
      }
    },
    { 
      id: 'proteccion', 
      label: 'Protección de datos', 
      color: '#D62336',
      style: {
        width: '180px',
        height: '180px',
        transform: 'rotate(-90deg)',
        bottom: '-83px',
        left: '191px',  
        fontSize: '24px',
        lineHeight: '1.1',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed'
      }
    }
  ]

  // Definir las rotaciones para coincidir con el navbar superior (sentido horario)
  const sectionRotations: { [key: string]: number } = {
    'inicio': 0,        // Posición inicial
    'servicios': 72,    // Gira hacia la derecha
    'trabaja': 144,     // Continúa hacia la derecha
    'soluciona': 216,   // Continúa hacia la derecha
    'proteccion': 288   // Continúa hacia la derecha
  }

  // Actualizar rotación cuando cambia la sección activa
  useEffect(() => {
    console.log('Active section changed to:', activeSection)
    const newRotation = sectionRotations[activeSection] || 0
    console.log('Setting rotation to:', newRotation)
    setRotation(newRotation)
  }, [activeSection])

  return (
    <div 
      style={{
        position: 'relative',
        left: '-20rem',
        width: '400px',
        height: '400px',
        transform: 'none',
        transition: 'none'
      }}
    >
      {/* Central Circle */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          backgroundColor: '#070E22',
          borderRadius: '50%',
          zIndex: 0,
          border: '3px solid #798553'
        }}
      />
      
      {/* Rotating Container */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transformOrigin: 'center center'
        }}
      >
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              console.log('Clicked on:', item.id)
              onSectionChange(item.id)
            }}
            style={{
              ...item.style,
              backgroundColor: item.color,
              cursor: 'pointer',
              position: 'absolute',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '27px',
              lineHeight: '1.2',
              zIndex: 1,
              transition: 'all 0.3s ease',
              transformOrigin: 'center center',
              // Efectos hover y active
              ...(activeSection === item.id ? {
                transform: `${item.style.transform || ''} scale(1.1)`,
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
                filter: 'brightness(1.1)'
              } : {})
            }}
            onMouseEnter={(e) => {
              if (activeSection !== item.id) {
                e.currentTarget.style.transform = `${item.style.transform || ''} scale(1.05)`
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== item.id) {
                e.currentTarget.style.transform = item.style.transform || ''
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          >
            <div style={{
              transform: `rotate(${-rotation}deg)`,
              transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}