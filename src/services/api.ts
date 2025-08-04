// src/services/api.ts

import { 
  JobApplicationRequestDTO, 
  JobApplicationResponseDTO,
  DiscountFormRequestDTO, 
  DiscountFormResponseDTO,
  ContactFormRequestDTO, 
  ContactFormResponseDTO,
  ChatMessageRequest, 
  ChatMessageResponse,
  WheelSpinRequest, 
  WheelSpinResponse,
  FormsConfigResponse,
  ApiErrorResponse 
} from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// API Error class
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Generic API request function
const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || `HTTP error! status: ${response.status}`,
        data.details
      )
    }
    
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    console.error('API Request failed:', error)
    throw new ApiError(
      500,
      'Error de conexión. Por favor intenta más tarde.',
      error
    )
  }
}

// API request for FormData (file uploads)
const apiRequestFormData = async <T>(
  endpoint: string, 
  formData: FormData,
  options: Omit<RequestInit, 'body'> = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`
  const config: RequestInit = {
    method: 'POST',
    body: formData,
    // Don't set Content-Type for FormData - browser will set it with boundary
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || `HTTP error! status: ${response.status}`,
        data.details
      )
    }
    
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    console.error('API FormData Request failed:', error)
    throw new ApiError(
      500,
      'Error de conexión. Por favor intenta más tarde.',
      error
    )
  }
}

// Chat Service
export const chatService = {
  sendMessage: async (sessionId: string, message: string, isVoice = false): Promise<ChatMessageResponse> => {
    const request: ChatMessageRequest = {
      sessionId,
      message,
      isVoice
    }
    
    return apiRequest<ChatMessageResponse>('/chat/message', {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }
}

// Wheel Service
export const wheelService = {
  spin: async (sessionId: string): Promise<WheelSpinResponse> => {
    const request: WheelSpinRequest = { sessionId }
    
    return apiRequest<WheelSpinResponse>('/wheel/spin', {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }
}

// Forms Service
export const formsService = {
  // Job Application with file upload
  submitJobApplication: async (data: JobApplicationRequestDTO): Promise<JobApplicationResponseDTO> => {
    const formData = new FormData()
    
    // Add all text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'resume') {
        // ✅ Manejar correctamente resume que puede ser null
        if (value instanceof File) {
          formData.append('resume', value)
        } else if (typeof value === 'string' && value.trim()) {
          formData.append('resume', value)
        }
        // Si es null o undefined, no agregamos el campo
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString())
      }
    })
    
    return apiRequestFormData<JobApplicationResponseDTO>('/forms/job-application', formData)
  },

  // Discount Form
  submitDiscountForm: async (data: DiscountFormRequestDTO): Promise<DiscountFormResponseDTO> => {
    return apiRequest<DiscountFormResponseDTO>('/forms/discount-form', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  // Contact Form
  submitContactForm: async (data: ContactFormRequestDTO): Promise<ContactFormResponseDTO> => {
    return apiRequest<ContactFormResponseDTO>('/forms/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  // Get forms configuration
  getFormsConfig: async (): Promise<FormsConfigResponse> => {
    return apiRequest<FormsConfigResponse>('/forms/config')
  },

  // Get available services
  getServices: async () => {
    return apiRequest('/forms/services')
  }
}

// Health Service
export const healthService = {
  check: async () => {
    return apiRequest('/health')
  }
}

// Utility function to create FormData from object
export const createFormData = (data: Record<string, any>): FormData => {
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

// Session ID generator
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Rate limit helper
export const withRateLimit = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number = 1000
): T => {
  let lastCall = 0
  
  return ((...args: Parameters<T>) => {
    const now = Date.now()
    const timeSinceLastCall = now - lastCall
    
    if (timeSinceLastCall < delay) {
      return Promise.reject(new ApiError(429, 'Too many requests. Please wait.'))
    }
    
    lastCall = now
    return fn(...args)
  }) as T
}