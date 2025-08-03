// @ts-nocheck
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Función helper para hacer peticiones
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Request failed:', error)
    throw error
  }
}

// Chat Service
export const chatService = {
  sendMessage: async (sessionId, message, isVoice = false) => {
    return apiRequest('/chat/message', {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        message,
        isVoice
      })
    })
  }
}

// Wheel Service
export const wheelService = {
  spin: async (sessionId) => {
    return apiRequest('/wheel/spin', {
      method: 'POST',
      body: JSON.stringify({ sessionId })
    })
  }
}

// Forms Service
export const formsService = {
  submitJobApplication: async (formData) => {
    // Para formularios con archivos, no usar JSON
    return apiRequest('/forms/job-application', {
      method: 'POST',
      headers: {}, // No establecer Content-Type para FormData
      body: formData
    })
  },

  submitDiscountForm: async (data) => {
    return apiRequest('/forms/discount-request', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  submitContactForm: async (data) => {
    return apiRequest('/forms/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}

// Health check
export const healthService = {
  check: async () => {
    return apiRequest('/health')
  }
}

// Utility function para crear FormData
export const createFormData = (data) => {
  const formData = new FormData()
  
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString())
    }
  })
  
  return formData
}