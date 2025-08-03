'use client'

// @ts-nocheck
import React from 'react'

export const Notifications = ({ notifications, onRemove }) => {
  if (!notifications || notifications.length === 0) return null

  const getNotificationStyle = (type) => {
    const baseStyle = {
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      animation: 'slideInRight 0.3s ease-out'
    }

    switch (type) {
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: '#10B981',
          color: 'white'
        }
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: '#EF4444',
          color: 'white'
        }
      case 'warning':
        return {
          ...baseStyle,
          backgroundColor: '#F59E0B',
          color: 'white'
        }
      default:
        return {
          ...baseStyle,
          backgroundColor: 'var(--primary-dark)',
          color: 'white'
        }
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'warning': return '⚠️'
      default: return 'ℹ️'
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 3000,
      maxWidth: '400px'
    }}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={getNotificationStyle(notification.type)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{getIcon(notification.type)}</span>
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => onRemove(notification.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '1.2rem',
              opacity: 0.7
            }}
          >
            ×
          </button>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

// Componente de Toast simple
export const Toast = ({ message, type = 'info', onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        backgroundColor: type === 'error' ? '#EF4444' : 'var(--primary-green)',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <span>{type === 'error' ? '❌' : '✅'}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.1rem',
          marginLeft: '10px'
        }}
      >
        ×
      </button>
    </div>
  )
}