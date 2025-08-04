// src/hooks/useIntelcobro.ts

import { useState, useRef, useCallback } from 'react'
import { chatService, wheelService, formsService, generateSessionId, ApiError } from '@/services/api'
import { 
  JobApplicationRequestDTO, 
  DiscountFormRequestDTO, 
  ContactFormRequestDTO,
  WheelSpinResponse,
  ChatMessageResponse 
} from '@/types/api'
import { WheelResult, WheelBackendResult, mapBackendToWheelResult } from '@/types/wheel'


// Chat Hook
export const useChat = () => {
  const [messages, setMessages] = useState<Array<{
    id: string
    message: string
    isUser: boolean
    timestamp: Date
    audioUrl?: string
  }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const sessionId = useRef(generateSessionId())

  const sendMessage = useCallback(async (message: string, isVoice = false) => {
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
        id: response.data.id,
        message: response.data.response,
        isUser: false,
        timestamp: new Date(response.data.timestamp),
        audioUrl: response.data.audioUrl
      }

      setMessages(prev => [...prev, aiMessage])
      return response
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Fallback response for development
      const fallbackMessage = {
        id: (Date.now() + 1).toString(),
        message: "Disculpa, estoy teniendo problemas de conexión. Por favor intenta más tarde o contacta directamente a nuestro equipo.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, fallbackMessage])
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  const clearChat = useCallback(() => {
    setMessages([])
    sessionId.current = generateSessionId()
  }, [])

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    sessionId: sessionId.current
  }
}


// Wheel Hook - ACTUALIZADO
export const useWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastResult, setLastResult] = useState<WheelResult | null>(null) // Tipo correcto
  const [hasSpun, setHasSpun] = useState(false)
  const sessionId = useRef(generateSessionId())

  const spin = useCallback(async () => {
    if (isSpinning || hasSpun) return

    setIsSpinning(true)
    setHasSpun(true)

    try {
      const response = await wheelService.spin(sessionId.current)
      
      // Mapear la respuesta del backend al tipo frontend
      const mappedResult = mapBackendToWheelResult(response.data)
      setLastResult(mappedResult)
      
      // Simulate spin duration
      setTimeout(() => {
        setIsSpinning(false)
      }, 3000)
      
      return mappedResult // Devolver el resultado mapeado
    } catch (error) {
      console.error('Error spinning wheel:', error)
      
      // Fallback result for development - always 10% OFF
      const fallbackResult: WheelResult = {
        id: Date.now().toString(),
        section: '10% OFF',
        discount: 10,
        isWinning: true,
        message: '¡Felicitaciones! Ganaste 10% de descuento',
        spinDuration: 3000
      }
      
      setLastResult(fallbackResult)
      setTimeout(() => {
        setIsSpinning(false)
      }, 3000)
      
      return fallbackResult
    }
  }, [isSpinning, hasSpun])

  const reset = useCallback(() => {
    setIsSpinning(false)
    setLastResult(null)
    setHasSpun(false)
    sessionId.current = generateSessionId()
  }, [])

  return {
    isSpinning,
    lastResult, // Ahora es de tipo WheelResult
    hasSpun,
    spin,
    reset,
    sessionId: sessionId.current
  }
}



// Forms Hook
export const useForms = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmission, setLastSubmission] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const submitJobApplication = useCallback(async (formData: JobApplicationRequestDTO) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Add session ID if not provided
      const dataWithSession = {
        ...formData,
        sessionId: formData.sessionId || generateSessionId()
      }
      
      const result = await formsService.submitJobApplication(dataWithSession)
      setLastSubmission(result)
      return result
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Error al enviar la aplicación. Por favor intenta más tarde.'
      
      setError(errorMessage)
      console.error('Error submitting job application:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const submitDiscountForm = useCallback(async (formData: DiscountFormRequestDTO) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Add session ID if not provided
      const dataWithSession = {
        ...formData,
        sessionId: formData.sessionId || generateSessionId()
      }
      
      const result = await formsService.submitDiscountForm(dataWithSession)
      setLastSubmission(result)
      return result
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Error al enviar el formulario. Por favor intenta más tarde.'
      
      setError(errorMessage)
      console.error('Error submitting discount form:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const submitContactForm = useCallback(async (formData: ContactFormRequestDTO) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const result = await formsService.submitContactForm(formData)
      setLastSubmission(result)
      return result
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Error al enviar el mensaje. Por favor intenta más tarde.'
      
      setError(errorMessage)
      console.error('Error submitting contact form:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isSubmitting,
    lastSubmission,
    error,
    submitJobApplication,
    submitDiscountForm,
    submitContactForm,
    clearError
  }
}

// Notifications Hook
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    timestamp: Date
  }>>([])

  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    }
    
    setNotifications(prev => [...prev, notification])
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id))
    }, 5000)
    
    return notification.id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  }
}

// Configuration Hook
export const useFormsConfig = () => {
  const [config, setConfig] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchConfig = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await formsService.getFormsConfig()
      setConfig(response.data)
      return response.data
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Error al cargar la configuración'
      
      setError(errorMessage)
      console.error('Error fetching forms config:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    config,
    isLoading,
    error,
    fetchConfig
  }
}