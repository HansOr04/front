'use client'

import React, { useState } from 'react'

interface Service {
  id: number
  icon: React.ReactNode
  title: string
  description: string
  details: string
}

const services: Service[] = [
  {
    id: 1,
    icon: (
      // Wallet/Billetera
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.99 1-1.72V9c0-.73-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2H9c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h10v2H5z"/>
        <circle cx="16" cy="12" r="1.5"/>
      </svg>
    ),
    title: 'Compra de Cartera',
    description: 'Adquisición segura de acuerdo al mercado y cumplimiento normativo',
    details: 'Evaluamos y adquirimos carteras de crédito con estrictos estándares de calidad'
  },
  {
    id: 2,
    icon: (
      <svg width="48" height="48" viewBox="0 0 640 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M96 96C113.7 96 128 110.3 128 128L128 464C128 472.8 135.2 480 144 480L544 480C561.7 480 576 494.3 576 512C576 529.7 561.7 544 544 544L144 544C99.8 544 64 508.2 64 464L64 128C64 110.3 78.3 96 96 96zM208 288C225.7 288 240 302.3 240 320L240 384C240 401.7 225.7 416 208 416C190.3 416 176 401.7 176 384L176 320C176 302.3 190.3 288 208 288zM352 224L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224zM432 256C449.7 256 464 270.3 464 288L464 384C464 401.7 449.7 416 432 416C414.3 416 400 401.7 400 384L400 288C400 270.3 414.3 256 432 256zM576 160L576 384C576 401.7 561.7 416 544 416C526.3 416 512 401.7 512 384L512 160C512 142.3 526.3 128 544 128C561.7 128 576 142.3 576 160z"/>
      </svg>
    ),
    title: 'Gestión de Cobranzas',
    description: 'Cobros efectivos con tecnología especializada',
    details: 'Utilizamos IA y machine learning para optimizar los procesos de cobranza'
  },
  {
    id: 3,
    icon: (
      // Persona con headset (call center)
     <svg width="48" height="48" viewBox="0 0 640 640" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M320 128C241 128 175.3 185.3 162.3 260.7C171.6 257.7 181.6 256 192 256L208 256C234.5 256 256 277.5 256 304L256 400C256 426.5 234.5 448 208 448L192 448C139 448 96 405 96 352L96 288C96 164.3 196.3 64 320 64C443.7 64 544 164.3 544 288L544 456.1C544 522.4 490.2 576.1 423.9 576.1L336 576L304 576C277.5 576 256 554.5 256 528C256 501.5 277.5 480 304 480L336 480C362.5 480 384 501.5 384 528L384 528L424 528C463.8 528 496 495.8 496 456L496 435.1C481.9 443.3 465.5 447.9 448 447.9L432 447.9C405.5 447.9 384 426.4 384 399.9L384 303.9C384 277.4 405.5 255.9 432 255.9L448 255.9C458.4 255.9 468.3 257.5 477.7 260.6C464.7 185.3 399.1 127.9 320 127.9z"/>
      </svg>
    ),
    title: 'Contact Center',
    description: 'Personal capacitado en servicio al cliente',
    details: 'Equipo especializado en atención personalizada y resolución de conflictos'
  },
  {
    id: 4,
    icon: (
      // Fábrica
      <svg width="48" height="48" viewBox="0 0 640 640" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M96 96C78.3 96 64 110.3 64 128L64 496C64 522.5 85.5 544 112 544L528 544C554.5 544 576 522.5 576 496L576 216.2C576 198 556.6 186.5 540.6 195.1L384 279.4L384 216.2C384 198 364.6 186.5 348.6 195.1L192 279.4L192 128C192 110.3 177.7 96 160 96L96 96z"/>
      </svg>
    ),
    title: 'Fábrica de Crédito',
    description: 'Procesamiento ágil y digitalización',
    details: 'Automatización de procesos crediticios con tecnología de vanguardia'
  }
]

export const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Función para obtener el índice anterior (circular)
  const getPrevIndex = () => {
    return currentIndex === 0 ? services.length - 1 : currentIndex - 1
  }

  // Función para obtener el índice siguiente (circular)
  const getNextIndex = () => {
    return currentIndex === services.length - 1 ? 0 : currentIndex + 1
  }

  // Función para renderizar una card
  const renderCard = (service: Service, position: 'left' | 'center' | 'right', index: number) => {
    const isCenter = position === 'center'
    
    const cardStyle = {
      backgroundColor: 'white',
      color: 'var(--primary-dark)',
      borderRadius: '20px',
      padding: '2.5rem 2rem',
      height: '280px',
      width: '300px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: isCenter 
        ? '0 15px 35px rgba(0,0,0,0.25)' 
        : '0 8px 20px rgba(0,0,0,0.15)',
      border: '1px solid rgba(0,0,0,0.1)',
      transition: 'all 0.4s ease',
      transform: isCenter 
        ? 'scale(1.1) translateZ(0)' 
        : 'scale(0.9) translateZ(-50px)',
      opacity: isCenter ? 1 : 0.6,
      filter: isCenter ? 'blur(0px)' : 'blur(2px)',
      zIndex: isCenter ? 10 : 5,
      cursor: isCenter ? 'default' : 'pointer',
      position: 'absolute' as const,
      left: position === 'left' ? '0%' : 
            position === 'center' ? '50%' : '100%',
      transformOrigin: 'center',
      marginLeft: position === 'left' ? '0' :
                  position === 'center' ? '-150px' : '-300px'
    }

    return (
      <div
        key={`${service.id}-${position}`}
        style={cardStyle}
        onClick={() => {
          if (!isCenter) {
            setCurrentIndex(index)
          }
        }}
      >
        <div style={{ 
          transition: 'all 0.4s ease',
          color: 'var(--primary-dark)'
        }}>
          {service.icon}
        </div>
        
        <h3 style={{ 
          fontSize: isCenter ? '1.8rem' : '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: 'var(--primary-dark)',
          textAlign: 'center',
          transition: 'all 0.4s ease'
        }}>
          {service.title}
        </h3>
        
        <p style={{ 
          fontSize: isCenter ? '1rem' : '0.9rem', 
          maxWidth: '250px',
          lineHeight: '1.5',
          textAlign: 'center',
          transition: 'all 0.4s ease',
          opacity: isCenter ? 1 : 0.8
        }}>
          {service.description}
        </p>
      </div>
    )
  }

  return (
    <div className="text-center" style={{ color: 'var(--primary-dark)' }}>
      <h2 style={{ 
        fontSize: '3rem', 
        fontWeight: 'bold', 
        marginBottom: '3rem',
        color: 'var(--primary-dark)'
      }}>
        Nuestros Servicios
      </h2>
      
      {/* Carousel Container */}
      <div style={{
        position: 'relative',
        width: '900px',
        height: '400px',
        margin: '0 auto',
        padding: '2rem',
        perspective: '1000px'
      }}>
        
        {/* Cards Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Card Izquierda */}
          {renderCard(services[getPrevIndex()], 'left', getPrevIndex())}
          
          {/* Card Central */}
          {renderCard(services[currentIndex], 'center', currentIndex)}
          
          {/* Card Derecha */}
          {renderCard(services[getNextIndex()], 'right', getNextIndex())}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: 'var(--primary-dark)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 20
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.1)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: 'var(--primary-dark)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 20
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.1)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          ›
        </button>

        {/* Dots Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px'
        }}>
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex 
                  ? 'var(--primary-dark)' 
                  : 'rgba(0,0,0,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}