// @ts-nocheck
import { useState, useRef, useCallback } from 'react'
import { chatService, wheelService, formsService } from '@/services/api'

// Hook para Chat
export const useChat = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const sessionId = useRef(Math.random().toString(36).substr(2, 9))

  const sendMessage = useCallback(async (message, isVoice = false) => {
    if (!message.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      message,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await chatService.sendMessage(
        sessionId.current,
        message,
        isVoice
      )

      const aiMessage = {
        id: response.id,
        message: response.response,
        isUser: false,
        timestamp: new Date(response.timestamp),
        audioUrl: response.audioUrl
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Fallback response para desarrollo
      const fallbackMessage = {
        id: (Date.now() + 1).toString(),
        message: "Disculpa, estoy teniendo problemas de conexión. Por favor intenta más tarde o contacta directamente a nuestro equipo.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  const clearChat = useCallback(() => {
    setMessages([])
    sessionId.current = Math.random().toString(36).substr(2, 9)
  }, [])

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    sessionId: sessionId.current
  }
}

// Hook para la Rueda
export const useWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastResult, setLastResult] = useState(null)
  const sessionId = useRef(Math.random().toString(36).substr(2, 9))

  const spin = useCallback(async () => {
    if (isSpinning) return

    setIsSpinning(true)

    try {
      const result = await wheelService.spin(sessionId.current)
      setLastResult(result)
      return result
    } catch (error) {
      console.error('Error spinning wheel:', error)
      
      // Fallback result para desarrollo
      const fallbackResult = {
        id: Date.now().toString(),
        section: '10% OFF',
        discountPercentage: 10,
        isWinning: true,
        resultMessage: '¡Felicitaciones! Ganaste 10% de descuento'
      }
      setLastResult(fallbackResult)
      return fallbackResult
    } finally {
      setTimeout(() => {
        setIsSpinning(false)
      }, 3000)
    }
  }, [isSpinning])

  return {
    isSpinning,
    lastResult,
    spin,
    sessionId: sessionId.current
  }
}

// Hook para Formularios
export const useForms = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmission, setLastSubmission] = useState(null)

  const submitJobApplication = useCallback(async (formData) => {
    setIsSubmitting(true)
    
    try {
      const result = await formsService.submitJobApplication(formData)
      setLastSubmission(result)
      return result
    } catch (error) {
      console.error('Error submitting job application:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const submitDiscountForm = useCallback(async (data) => {
    setIsSubmitting(true)
    
    try {
      const result = await formsService.submitDiscountForm(data)
      setLastSubmission(result)
      return result
    } catch (error) {
      console.error('Error submitting discount form:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const submitContactForm = useCallback(async (data) => {
    setIsSubmitting(true)
    
    try {
      const result = await formsService.submitContactForm(data)
      setLastSubmission(result)
      return result
    } catch (error) {
      console.error('Error submitting contact form:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return {
    isSubmitting,
    lastSubmission,
    submitJobApplication,
    submitDiscountForm,
    submitContactForm
  }
}

// Hook para notificaciones
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info') => {
    const notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    }
    
    setNotifications(prev => [...prev, notification])
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id))
    }, 5000)
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return {
    notifications,
    addNotification,
    removeNotification
  }
}