'use client'

import { useState } from 'react'
import { DiscountWheel } from '../wheel/DiscountWheel'
import { ServiceCarousel } from '../layout/ServiceCarousel'

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
        return (
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold" style={{ margin: '3rem', paddingTop: '4rem' }}>
              Conecta con el futuro de la cobranza
            </h1>
            <div className="flex justify-center" style={{ gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-white">
                Contáctanos
              </button>
            </div>
          </div>
        )

      case 'servicios':
        return <ServiceCarousel />

      case 'trabaja':
        return (
          <div className="text-center" style={{ color: 'var(--primary-dark)', maxWidth: '900px', margin: '0 auto' }}>
            {/* Título principal */}
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem',
              color: 'var(--primary-dark)'
            }}>
              Trabaja con Nosotros
            </h2>
            
            {/* Iconos de redes sociales */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem'
            }}>
              <a href="https://linkedin.com/company/intelcobro" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                color: 'var(--primary-dark)',
                textDecoration: 'none'
              }}>
                <svg width="40" height="40" viewBox="0 0 640 640" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"/>
                </svg>
              </a>
              <a href="https://instagram.com/intelcobro" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                color: 'var(--primary-dark)',
                textDecoration: 'none'
              }}>
                <svg width="40" height="40" viewBox="0 0 640 640" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@intelcobro" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                color: 'var(--primary-dark)',
                textDecoration: 'none'
              }}>
                <svg width="40" height="40" viewBox="0 0 640 640" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z"/>
                </svg>
              </a>
              <a href="https://facebook.com/intelcobro" target="_blank" rel="noopener noreferrer" style={{
                width: '40px',
                height: '40px',
                color: 'var(--primary-dark)',
                textDecoration: 'none'
              }}>
                <svg width="40" height="40" viewBox="0 0 640 640" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L258.2 544L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96z"/>
                </svg>
              </a>
            </div>

            {/* Layout horizontal: Texto a la izquierda, Formulario a la derecha */}
            <div style={{
              display: 'flex',
              gap: '3rem',
              alignItems: 'flex-start',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              
              {/* Columna izquierda - Texto */}
              <div style={{
                flex: '1',
                minWidth: '300px',
                textAlign: 'left'
              }}>
                {/* Subtítulo */}
                <h3 style={{
                  marginLeft:'5rem',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem',
                  color: 'var(--primary-dark)'
                }}>
                  ¡Destaca en Intelcobro!
                </h3>

                {/* Descripción */}
                <p style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.6',
                  marginBottom: '0.5rem',
                  marginLeft:'5rem',
                  color: 'var(--primary-dark)'
                }}>
                  Si tienes talento, confianza y ambición de llegar alto.
                </p>
                
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  marginLeft:'5rem',
                  marginBottom: '2rem',
                  color: 'var(--primary-dark)'
                }}>
                  Envíanos tu hoja de vida a <strong>talentohumano@intelcobro.com</strong> y
                  sé parte de un equipo que impulsa tu crecimiento y celebra
                  tus éxitos.
                </p>
              </div>

              {/* Columna derecha - Formulario */}
              <div style={{
                flex: '1',
                minWidth: '350px',
                maxWidth: '400px'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.2rem',
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  border: '1px solid #eee'
                }}>
                  <h5 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: 'var(--primary-dark)',
                    textAlign: 'center'
                  }}>
                    Envía tu Hoja de Vida
                  </h5>
                  
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target as HTMLFormElement)
                      const name = formData.get('name')
                      const email = formData.get('email')
                      const position = formData.get('position')
                      const file = formData.get('cv')
                      
                      // Crear mailto con los datos
                      const subject = encodeURIComponent(`Aplicación de trabajo - ${position}`)
                      const body = encodeURIComponent(
                        `Hola,\n\nMe interesa aplicar para la posición de ${position}.\n\nDatos del candidato:\nNombre: ${name}\nEmail: ${email}\nPosición: ${position}\n\nAdjunto mi hoja de vida.\n\nSaludos cordiales.`
                      )
                      
                      window.location.href = `mailto:talentohumano@intelcobro.com?subject=${subject}&body=${body}`
                      
                      alert('Se abrirá tu cliente de email para enviar la aplicación. No olvides adjuntar tu CV.')
                    }}
                  >
                    <input 
                      name="name"
                      type="text" 
                      placeholder="Nombre completo" 
                      required
                      style={{
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <input 
                      name="email"
                      type="email" 
                      placeholder="Email" 
                      required
                      style={{
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <input 
                      name="position"
                      type="text" 
                      placeholder="Posición de interés" 
                      required
                      style={{
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    
                    {/* Input de archivo con estilo personalizado */}
                    <div style={{ position: 'relative' }}>
                      <input 
                        name="cv"
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        required
                        style={{
                          position: 'absolute',
                          opacity: 0,
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer'
                        }}
                        onChange={(e) => {
                          const fileName = e.target.files?.[0]?.name || 'Sin archivos seleccionados'
                          const label = e.target.parentElement?.querySelector('.file-label') as HTMLElement
                          if (label) {
                            label.textContent = fileName.length > 30 ? fileName.substring(0, 30) + '...' : fileName
                          }
                        }}
                      />
                      <div style={{
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        backgroundColor: '#f8f9fa',
                        color: '#6c757d',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span className="file-label">Seleccionar archivo</span>
                        <span>📎</span>
                      </div>
                    </div>
                    
                    <button 
                      type="submit" 
                      style={{
                        backgroundColor: 'var(--primary-red)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLButtonElement).style.transform = 'scale(1.05)'
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLButtonElement).style.transform = 'scale(1)'
                      }}
                    >
                      Enviar Aplicación
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
        case 'soluciona':
        return (
          <div className="text-center" style={{ color: 'var(--primary-dark)', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: 'var(--primary-dark)'
            }}>
              Soluciona tu Deuda
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.6',
              marginBottom: '3rem',
              color: 'var(--primary-dark)',
              maxWidth: '600px',
              margin: '0 auto 3rem auto'
            }}>
              Te ayudamos a encontrar la mejor solución para tu situación financiera
            </p>

            {/* Layout horizontal: Formulario a la izquierda, Ruleta a la derecha */}
            <div style={{
              display: 'flex',
              gap: '3rem',
              alignItems: 'flex-start',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>

              {/* Columna derecha - Ruleta */}
              <div style={{
                flex: '1',
                minWidth: '350px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  backgroundColor: 'var(--primary-dark)',
                  padding: '2rem',
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  border: '1px solid #eee',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: 'white'
                  }}>
                    ¡Obtén tu Descuento!
                  </h3>
                  
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '1rem'
                  }}>
                    Gira la ruleta y obtén un descuento especial
                  </p>

                  {/* Componente DiscountWheel personalizado para 10% */}
                  <DiscountWheel 
                    onResult={(result) => {
                      // Forzar que siempre sea 10% de descuento
                      const fixedResult = {
                        ...result,
                        section: '10% OFF',
                        discount: 10,
                        isWinning: true,
                        message: '¡Felicitaciones! Ganaste 10% OFF'
                      }
                      setWheelResult(fixedResult)
                    }}
                  />
                </div>
              </div>
              {/* Columna izquierda - Formulario */}
              <div style={{
                flex: '1',
                minWidth: '350px',
                maxWidth: '400px'
              }}>
                {/* Mostrar resultado */}
                  {wheelResult && (
                    <div style={{
                      backgroundColor: 'var(--primary-green, #28a745)',
                      color: 'white',
                      padding: '1rem',
                      borderRadius: '10px',
                      marginBottom: '2rem'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                        🎉 ¡Felicidades!
                      </h4>
                      <p style={{ margin: '0', fontSize: '1rem' }}>
                        {wheelResult.message}
                      </p>
                      <p style={{
                        fontSize: '0.9rem',
                        margin: '0.5rem 0 0 0',
                        opacity: 0.9
                      }}>
                        Menciona este descuento al solicitar tu asesoría
                      </p>
                    </div>
                  )}
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  border: '1px solid #eee'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: 'var(--primary-dark)'
                  }}>
                    Solicita Asesoría Gratuita
                  </h3>
                  
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Solicitud enviada. Nos contactaremos contigo pronto.')
                    }}
                  >
                    <input 
                      type="text" 
                      placeholder="Cédula" 
                      required
                      style={{
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <input 
                      type="text" 
                      placeholder="Nombre completo" 
                      required
                      style={{
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <input 
                      type="tel" 
                      placeholder="Celular" 
                      required
                      style={{
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <input 
                      type="email" 
                      placeholder="Correo electrónico" 
                      required
                      style={{
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    
                    <button 
                      type="submit" 
                      style={{
                        backgroundColor: 'var(--primary-red)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLButtonElement).style.transform = 'scale(1.05)'
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLButtonElement).style.transform = 'scale(1)'
                      }}
                    >
                      Solicitar Asesoría
                    </button>
                  </form>
                </div>
              </div>
              
            </div>
          </div>
        )


      case 'proteccion':
        return (
          <div className="text-center" style={{ color: 'var(--primary-dark)', maxWidth: '700px', margin: '0 auto' }}>
            {/* Título principal con icono */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'var(--primary-green, #798553)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🛡️
              </div>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold',
                color: 'var(--primary-dark)',
                margin: 0
              }}>
                Tus Derechos
              </h2>
            </div>

            {/* Grid de derechos */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              {/* Acceso */}
              <div style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#e8f4fd',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  👁️
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-dark)'
                  }}>
                    Acceso
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    margin: 0
                  }}>
                    Conoce qué datos tratamos
                  </p>
                </div>
              </div>

              {/* Rectificación */}
              <div style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#fff4e6',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  ✏️
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-dark)'
                  }}>
                    Rectificación
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    margin: 0
                  }}>
                    Modificar tus datos
                  </p>
                </div>
              </div>

              {/* Eliminación */}
              <div style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#f3e8ff',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  🗑️
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-dark)'
                  }}>
                    Eliminación
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    margin: 0
                  }}>
                    Borrar tus datos
                  </p>
                </div>
              </div>

              {/* Oposición */}
              <div style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  ✋
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-dark)'
                  }}>
                    Oposición
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    margin: 0
                  }}>
                    Rechazar el uso
                  </p>
                </div>
              </div>
            </div>

            {/* Sección de ejercer derechos */}
            <div style={{
              background: 'linear-gradient(135deg, var(--primary-green, #798553) 0%, #4a90e2 100%)',
              padding: '1.5rem 2rem',
              borderRadius: '20px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                margin: '0 0 1.5rem 0'
              }}>
                Ejercer tus Derechos
              </h3>
              
              <p style={{
                fontSize: '0.9rem',
                lineHeight: '1.6',
                marginBottom: '2rem',
                maxWidth: '500px',
                margin: '0 auto 2rem auto'
              }}>
                Descarga y completa nuestro formulario oficial para ejercer cualquiera de estos derechos
              </p>

              {/* Botón de descarga */}
              <button
                onClick={() => {
                  // Simular descarga del PDF
                  alert('Descargando formulario PDF...')
                }}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  margin: '0 auto 1rem auto',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.2)'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>📄</span>
                Descargar Formulario PDF
              </button>

              {/* Separador */}
              <div style={{
                height: '1px',
                backgroundColor: 'rgba(255,255,255,0.3)',
                margin: '1rem auto',
                maxWidth: '400px'
              }} />

              {/* Email de contacto */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                borderRadius: '12px',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📧</span>
                <span style={{ fontSize: '1rem', fontWeight: '500' }}>
                  protecciondatospersonales@intelcobro.com
                </span>
              </div>
            </div>
          </div>
        )


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

      {/* Modal de la Rueda */}
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