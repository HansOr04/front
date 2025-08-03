// src/services/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface ChatMessageRequest {
  sessionId: string;
  message: string;
  isVoice?: boolean;
  audioData?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface ChatMessageResponse {
  id: string;
  sessionId: string;
  type: 'user' | 'assistant';
  message: string;
  timestamp: string;
  isVoice: boolean;
  audioUrl?: string;
  metadata?: Record<string, any>;
  userId?: string;
}

export interface WheelSpinResponse {
  id: string;
  sessionId: string;
  section: string;
  discountPercentage: number;
  spinAngle: number;
  spinDuration: number;
  timestamp: string;
  isWinning: boolean;
  resultMessage: string;
  discountCode?: string;
  expiresAt?: string;
  nextSpinAllowedAt?: string;
  animation?: {
    duration: number;
    rotations: number;
    finalAngle: number;
  };
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  details?: any;
}

export interface ApiSuccess<T = any> {
  success: true;
  data: T;
  message?: string;
}

export type ApiResponse<T = any> = ApiSuccess<T> | ApiError;

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}`,
          message: data.message || data.error || 'Request failed',
          details: data
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message
      };
    } catch (error) {
      return {
        success: false,
        error: 'Parse Error',
        message: 'Failed to parse response',
        details: error
      };
    }
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      
      const defaultOptions: RequestInit = {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      // Si hay FormData, quitar Content-Type para que el browser lo setee automáticamente
      if (options.body instanceof FormData) {
        delete (defaultOptions.headers as Record<string, string>)['Content-Type'];
      }

      console.log(`API Request: ${options.method || 'GET'} ${url}`);
      
      const response = await fetch(url, defaultOptions);
      return this.handleResponse<T>(response);
      
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: 'Network Error',
        message: 'Failed to connect to server',
        details: error
      };
    }
  }

  // Health Check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.makeRequest('/health', { method: 'GET' });
  }

  // Chat endpoints
  async sendChatMessage(data: ChatMessageRequest): Promise<ApiResponse<ChatMessageResponse>> {
    return this.makeRequest('/chat/message', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getChatHistory(sessionId: string, limit?: number, offset?: number): Promise<ApiResponse<{
    sessionId: string;
    messages: ChatMessageResponse[];
    totalMessages: number;
    hasMore: boolean;
  }>> {
    const params = new URLSearchParams({ sessionId });
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());

    return this.makeRequest(`/chat/history?${params}`, { method: 'GET' });
  }

  async clearChatHistory(sessionId: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.makeRequest('/chat/clear', {
      method: 'DELETE',
      body: JSON.stringify({ sessionId }),
    });
  }

  // Wheel endpoints
  async spinWheel(sessionId: string, metadata?: Record<string, any>): Promise<ApiResponse<WheelSpinResponse>> {
    return this.makeRequest('/wheel/spin', {
      method: 'POST',
      body: JSON.stringify({ 
        sessionId,
        userId: undefined,
        userIp: undefined,
        userAgent: navigator.userAgent,
        metadata 
      }),
    });
  }

  async getWheelHistory(sessionId: string): Promise<ApiResponse<WheelSpinResponse[]>> {
    return this.makeRequest(`/wheel/history?sessionId=${sessionId}`, { method: 'GET' });
  }

  // Form endpoints
  async submitDiscountForm(formData: FormData): Promise<ApiResponse<{
    submissionId: string;
    discountCode: string;
    discountPercentage: number;
    expiresAt: string;
  }>> {
    return this.makeRequest('/forms/discount-form', {
      method: 'POST',
      body: formData,
    });
  }

  async submitJobApplication(formData: FormData): Promise<ApiResponse<{
    submissionId: string;
    applicationId: string;
    status: string;
    estimatedResponseTime: string;
  }>> {
    return this.makeRequest('/forms/job-application', {
      method: 'POST',
      body: formData,
    });
  }

  async submitContactForm(data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    message: string;
    metadata?: Record<string, any>;
  }): Promise<ApiResponse<{
    submissionId: string;
    confirmationNumber: string;
    estimatedResponseTime: string;
  }>> {
    return this.makeRequest('/forms/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Utility methods
  async uploadFile(file: File, type: 'resume' | 'document' | 'image' = 'document'): Promise<ApiResponse<{
    fileId: string;
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
  }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.makeRequest('/upload', {
      method: 'POST',
      body: formData,
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;