// src/components/ui/Notifications.tsx

'use client'

import React from 'react'

interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timestamp: Date
}

interface NotificationsProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export const Notifications: React.FC<NotificationsProps> = ({ 
  notifications, 
  onRemove 
}) => {
  if (!notifications || notifications.length === 0) return null

  const getNotificationStyle = (type: Notification['type']): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      animation: 'slideInRight 0.3s ease-out',
      minWidth: '300px',
      maxWidth: '400px'
    }

    switch (type) {
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: '#10B981',
          color: 'white',
          border: '1px solid #059669'
        }
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: '#EF4444',
          color: 'white',
          border: '1px solid #DC2626'
        }
      case 'warning':
        return {
          ...baseStyle,
          backgroundColor: '#F59E0B',
          color: 'white',
          border: '1px solid #D97706'
        }
      default: // info
        return {
          ...baseStyle,
          backgroundColor: 'var(--primary-dark)',
          color: 'white',
          border: '1px solid #374151'
        }
    }
  }

  const getIcon = (type: Notification['type']): string => {
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
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '10px',
            flex: 1
          }}>
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>
              {getIcon(notification.type)}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: '0.9rem', 
                lineHeight: '1.4',
                wordBreak: 'break-word'
              }}>
                {notification.message}
              </div>
              <div style={{ 
                fontSize: '0.7rem', 
                opacity: 0.8, 
                marginTop: '4px' 
              }}>
                {notification.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
          <button
            onClick={() => onRemove(notification.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '1.2rem',
              opacity: 0.7,
              padding: '2px 6px',
              borderRadius: '4px',
              transition: 'all 0.2s',
              flexShrink: 0,
              marginLeft: '10px'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.opacity = '1'
              ;(e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.2)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.opacity = '0.7'
              ;(e.target as HTMLButtonElement).style.backgroundColor = 'transparent'
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

// Simple Toast component for quick notifications
interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  onClose,
  autoClose = true,
  duration = 3000
}) => {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, onClose])

  const getToastStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      bottom: '100px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      animation: 'fadeIn 0.3s ease-out',
      minWidth: '250px',
      maxWidth: '400px'
    }

    switch (type) {
      case 'success':
        return { ...baseStyle, backgroundColor: '#10B981', color: 'white' }
      case 'error':
        return { ...baseStyle, backgroundColor: '#EF4444', color: 'white' }
      case 'warning':
        return { ...baseStyle, backgroundColor: '#F59E0B', color: 'white' }
      default:
        return { ...baseStyle, backgroundColor: 'var(--primary-green)', color: 'white' }
    }
  }

  const getIcon = (): string => {
    switch (type) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'warning': return '⚠️'
      default: return 'ℹ️'
    }
  }

  return (
    <div style={getToastStyle()}>
      <span>{getIcon()}</span>
      <span style={{ flex: 1, fontSize: '0.9rem' }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.1rem',
          marginLeft: '10px',
          padding: '2px 6px',
          borderRadius: '4px',
          opacity: 0.8,
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.opacity = '1'
          ;(e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.2)'
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.opacity = '0.8'
          ;(e.target as HTMLButtonElement).style.backgroundColor = 'transparent'
        }}
      >
        ×
      </button>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}