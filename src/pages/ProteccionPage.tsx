// src/pages/ProteccionPage.tsx

'use client'

import React from 'react'

export const ProteccionPage = () => {
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
}