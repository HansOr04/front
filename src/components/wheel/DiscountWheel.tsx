// src/components/wheel/DiscountWheel.tsx

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useWheel } from '@/hooks/useIntelcobro'
import { WheelResult } from '@/types/wheel'
import { DEFAULT_WHEEL_SECTIONS, WHEEL_ANIMATION } from '@/types/wheel'

interface DiscountWheelProps {
  onResult?: (result: WheelResult) => void
  onSpin?: () => void
  disabled?: boolean
  size?: number
}

export const DiscountWheel: React.FC<DiscountWheelProps> = ({
  onResult,
  onSpin,
  disabled = false,
  size = 220
}) => {
  const [rotation, setRotation] = useState(0)
  const [wheelSize, setWheelSize] = useState(size)
  const wheelRef = useRef<HTMLDivElement>(null)
  const { spin, isSpinning, hasSpun, lastResult } = useWheel()

  // Ajustar tamaño según el contenedor
  useEffect(() => {
    const updateSize = () => {
      if (wheelRef.current) {
        const container = wheelRef.current.parentElement
        if (container) {
          const containerWidth = container.clientWidth
          const containerHeight = container.clientHeight
          const maxSize = Math.min(containerWidth - 40, containerHeight - 100, size)
          setWheelSize(Math.max(180, maxSize)) // Mínimo 180px
        }
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [size])

  const handleSpin = async () => {
    if (isSpinning || hasSpun || disabled) return

    onSpin?.()

    try {
      // Calculate rotation for guaranteed 10% OFF result
      const targetSectionAngle = 120 // 10% OFF section angle
      const spins = Math.floor(Math.random() * 3) + WHEEL_ANIMATION.MIN_SPINS
      const randomOffset = Math.random() * 10 - 5 // Small random variation
      
      // Calculate final angle to land on 10% OFF
      const finalAngle = 360 - targetSectionAngle + randomOffset
      const totalRotation = rotation + (spins * 360) + finalAngle

      setRotation(totalRotation)

      // Call backend API - this already returns mapped WheelResult
      const result = await spin()
      
      // The result is already mapped by useWheel hook
      if (result) {
        // Delay result callback to match animation
        setTimeout(() => {
          onResult?.(result)
        }, WHEEL_ANIMATION.SPIN_DURATION)
      }

    } catch (error) {
      console.error('Error spinning wheel:', error)
      
      // Fallback result
      const fallbackResult: WheelResult = {
        id: Date.now().toString(),
        section: '10% OFF',
        discount: 10,
        isWinning: true,
        message: '¡Felicitaciones! Ganaste 10% OFF'
      }

      setTimeout(() => {
        onResult?.(fallbackResult)
      }, WHEEL_ANIMATION.SPIN_DURATION)
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 'clamp(0.75rem, 2vw, 1.5rem)',
      padding: '0.5rem',
      width: '100%',
      maxWidth: '100%'
    }}>
      <div style={{ 
        position: 'relative', 
        width: `${wheelSize}px`, 
        height: `${wheelSize}px`,
        flexShrink: 0
      }}>
        {/* Wheel Container */}
        <div
          ref={wheelRef}
          style={{
            width: `${wheelSize}px`,
            height: `${wheelSize}px`,
            borderRadius: '50%',
            position: 'relative',
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning 
              ? `transform ${WHEEL_ANIMATION.SPIN_DURATION}ms ${WHEEL_ANIMATION.EASING}` 
              : 'none',
            background: 'conic-gradient(from 0deg, #D62336 0deg 60deg, #798553 60deg 120deg, #D62336 120deg 180deg, #6b7280 180deg 240deg, #798553 240deg 300deg, #6b7280 300deg 360deg)',
            border: `${Math.max(3, wheelSize * 0.018)}px solid white`,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Wheel Sections with Text */}
          {DEFAULT_WHEEL_SECTIONS.map((section, index) => (
            <div
              key={section.id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${section.angle + 30}deg)`,
                width: `${wheelSize / 2}px`,
                height: `${wheelSize / 2}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <span style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: `${wheelSize * 0.025}rem`,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                transform: 'rotate(35deg)',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                position: 'absolute',
                top: `${wheelSize * 0.125}px`,
                left: '50%',
                transformOrigin: 'center',
                marginLeft: `${-wheelSize * 0.18}px`,
                width: `${wheelSize * 0.36}px`
              }}>
                {section.label}
              </span>
            </div>
          ))}
        </div>

        {/* Wheel Pointer */}
        <div style={{
          position: 'absolute',
          top: `${-wheelSize * 0.043}px`,
          left: '50%',
          transform: 'translateX(-50%) rotate(-60deg)',
          width: '0',
          height: '0',
          borderLeft: `${wheelSize * 0.054}px solid transparent`,
          borderRight: `${wheelSize * 0.054}px solid transparent`,
          borderBottom: `${wheelSize * 0.089}px solid white`,
          zIndex: 10,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
        }} />

        {/* Center Circle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${wheelSize * 0.18}px`,
          height: `${wheelSize * 0.18}px`,
          backgroundColor: 'var(--primary-dark)',
          borderRadius: '50%',
          border: `${Math.max(2, wheelSize * 0.014)}px solid white`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: `${wheelSize * 0.032}rem`,
          zIndex: 10
        }}>
          🎲
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning || hasSpun || disabled}
        style={{
          backgroundColor: (isSpinning || hasSpun || disabled) ? '#6b7280' : 'var(--primary-green)',
          color: 'white',
          border: 'none',
          padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)',
          borderRadius: '25px',
          fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
          fontWeight: 'bold',
          cursor: (isSpinning || hasSpun || disabled) ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          opacity: (hasSpun || disabled) ? 0.6 : 1,
          flexShrink: 0
        }}
        onMouseEnter={(e) => {
          if (!isSpinning && !hasSpun && !disabled) {
            (e.target as HTMLButtonElement).style.transform = 'scale(1.05)'
          }
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.transform = 'scale(1)'
        }}
      >
        {isSpinning ? 'Girando...' : hasSpun ? 'Ya giraste' : '🎯 ¡GIRAR RUEDA!'}
      </button>

      {/* Result Display */}
      {lastResult && (
        <div style={{
          backgroundColor: lastResult.isWinning ? 'var(--primary-green)' : '#6b7280',
          color: 'white',
          padding: 'clamp(0.5rem, 2vw, 1rem)',
          borderRadius: '10px',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-in',
          width: '100%',
          maxWidth: `${wheelSize}px`,
          flexShrink: 0
        }}>
          <h4 style={{ 
            margin: '0 0 0.25rem 0', 
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' 
          }}>
            {lastResult.isWinning ? '🎉 ¡Felicidades!' : '😔 ¡Suerte la próxima vez!'}
          </h4>
          <p style={{ 
            margin: '0', 
            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
            lineHeight: '1.3'
          }}>
            {lastResult.message}
          </p>
          {lastResult.discount && (
            <p style={{ 
              margin: '0.25rem 0 0 0', 
              fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', 
              opacity: 0.9,
              lineHeight: '1.2'
            }}>
              Menciona este descuento al solicitar tu asesoría
            </p>
          )}
        </div>
      )}
    </div>
  )
}