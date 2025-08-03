'use client'

import React, { useState, useRef } from 'react'

interface DiscountWheelProps {
  onResult: (result: any) => void
}

export const DiscountWheel = ({ onResult }: DiscountWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [hasSpun, setHasSpun] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)

  const sections = [
    { id: 1, label: '5% OFF', angle: 0, color: '#D62336' },
    { id: 2, label: 'Sin premio', angle: 60, color: '#798553' }, // Esta es la sección ganadora
    { id: 3, label: '10% OFF', angle: 120, color: '#D62336' },
    { id: 4, label: 'Sin premio', angle: 180, color: '#6b7280' },
    { id: 5, label: '20% OFF', angle: 240, color: '#798553' },
    { id: 6, label: '15% OFF', angle: 300, color: '#6b7280' },
  ]

  const spinWheel = async () => {
    if (isSpinning || hasSpun) return

    setIsSpinning(true)
    setHasSpun(true)
    
    // Calcular rotación para que SIEMPRE caiga en 10% OFF (sección 2, ángulo 60)
    const targetAngle = 280 // Ángulo de la sección "10% OFF"
    const spins = 3
    
    // Calcular el ángulo final para que la flecha apunte al 10% OFF
    // La flecha está en la parte superior (0 grados), necesitamos que apunte a 60 grados
    const finalAngle = 360 - targetAngle + (Math.random() * 10 - 5) // Pequeña variación para naturalidad
    const totalRotation = rotation + (spins * 360) + finalAngle

    setRotation(totalRotation)

    try {
      setTimeout(() => {
        // Siempre devolver resultado de 10% OFF
        const result = {
          id: Date.now().toString(),
          section: '10% OFF',
          discount: 10,
          isWinning: true,
          message: '¡Felicitaciones! Ganaste 10% OFF',
          angle: finalAngle,
          spinDuration: 3000
        }

        setIsSpinning(false)
        if (onResult) {
          onResult(result)
        }
      }, 3000)
    } catch (error) {
      console.error('Error spinning wheel:', error)
      setIsSpinning(false)
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '1.5rem',
      padding: '1rem'
    }}>
      <div style={{ position: 'relative', width: '280px', height: '280px' }}>
        {/* Wheel Container */}
        <div
          ref={wheelRef}
          style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            position: 'relative',
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
            background: 'conic-gradient(from 0deg, #D62336 0deg 60deg, #798553 60deg 120deg, #D62336 120deg 180deg, #6b7280 180deg 240deg, #798553 240deg 300deg, #6b7280 300deg 360deg)',
            border: '5px solid white',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Wheel Sections with Text */}
          {sections.map((section, index) => (
            <div
              key={section.id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${section.angle + 30}deg)`,
                width: '140px',
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <span style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                transform: 'rotate(35deg)',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                position: 'absolute',
                top: '35px',
                left: '50%',
                transformOrigin: 'center',
                marginLeft: '-50px',
                width: '100px'
              }}>
                {section.label}
              </span>
            </div>
          ))}
        </div>

        {/* Wheel Pointer */}
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-60deg)',
          width: '0',
          height: '0',
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '25px solid white',
          zIndex: 10,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
        }} />

        {/* Center Circle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50px',
          height: '50px',
          backgroundColor: 'var(--primary-dark)',
          borderRadius: '50%',
          border: '3px solid white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          zIndex: 10
        }}>
          🎲
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning || hasSpun}
        style={{
          backgroundColor: isSpinning || hasSpun ? '#6b7280' : 'var(--primary-green)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '25px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: isSpinning || hasSpun ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          opacity: hasSpun ? 0.6 : 1
        }}
      >
        {isSpinning ? 'Girando...' : hasSpun ? 'Ya giraste' : '🎯 ¡GIRAR RUEDA!'}
      </button>
    </div>
  )
}