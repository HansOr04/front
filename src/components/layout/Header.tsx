'use client'

import React, { useState } from 'react'
import { ChatWidget } from '../chat/ChatWidget'

interface HeaderProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isChatOpen: boolean
  onChatToggle: (isOpen: boolean) => void
}

export const Header = ({ activeSection, onSectionChange, isChatOpen, onChatToggle }: HeaderProps) => {
  
  return (
    <>
      <header className="header">
        <div className="nav-container">
          {/* Logo */}
          <div style={{ 
            width: '180px',
            height: '20px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-dark)'
          }}>
            <img 
              src="/assets/images/LogoIntelcobro.png" 
              alt="Logo Intelcobro" 
              style={{
                width: '180px', 
                height: 'auto'
              }}
            />
          </div>
          
          {/* Navigation Menu */}
          <nav className="nav-menu">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'servicios', label: 'Servicios' },
              { id: 'trabaja', label: 'Trabaja con nosotros' },
              { id: 'soluciona', label: 'Soluciona tu deuda' },
              { id: 'proteccion', label: 'Protección de datos' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Chat Toggle Button */}
          {!isChatOpen && (
            <button
              onClick={() => onChatToggle(true)}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'white',
                color: 'var(--primary-dark)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                zIndex: 999,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                (e.target as HTMLButtonElement).style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                (e.target as HTMLButtonElement).style.transform = 'scale(1)'
              }}
            >
              💬
            </button>
          )}
        </div>
      </header>
      
      {/* Chat Widget */}
      <ChatWidget 
        isOpen={isChatOpen} 
        onClose={() => onChatToggle(false)} 
      />
    </>
  )
}