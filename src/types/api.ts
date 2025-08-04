// src/types/api.ts

// Request/Response Types matching your backend DTOs

// Job Application Types
export interface JobApplicationRequestDTO {
  sessionId?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  position: string;
  experience?: string;
  skills?: string;
  education?: string;
  availability?: string;
  portfolio?: string;
  coverLetter?: string;
  salary?: string;
  relocate?: boolean;
  remoteWork?: boolean;
  startDate?: string;
  references?: string;
  linkedIn?: string;
  github?: string;
  resume?: File | string | null; // ✅ Permitir null
  additionalInfo?: string;
  agreedToTerms: boolean;
}

export interface JobApplicationResponseDTO {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: 'received' | 'processing' | 'reviewed' | 'accepted' | 'rejected';
    submittedAt: string;
    processingTime?: number;
    resumeAnalysis?: {
      matchScore?: number;
      experienceLevel?: string;
      keySkills?: string[];
    };
    nextSteps?: string[];
  };
}

// Discount Form Types
export interface DiscountFormRequestDTO {
  sessionId?: string;
  identificacion: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  serviceInterest: string;
  companyName?: string;
  companySize?: string;
  budget?: string;
  timeline?: string;
  projectDescription?: string;
  wheelResultId?: string;
  discountCode?: string;
  referralSource?: string;
  agreeToMarketing?: boolean;
  agreedToTerms: boolean;
}

export interface DiscountFormResponseDTO {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: 'received' | 'processing' | 'contacted' | 'converted';
    submittedAt: string;
    discount?: {
      percentage: number;
      validUntil: string;
      code: string;
    };
  };
}

// Contact Form Types
export interface ContactFormRequestDTO {
  fullName: string;
  email: string;
  phoneNumber?: string;
  subject: string;
  message: string;
  company?: string;
  agreedToTerms: boolean;
}

export interface ContactFormResponseDTO {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: 'received';
    submittedAt: string;
  };
}

// Chat Types
export interface ChatMessageRequest {
  sessionId: string;
  message: string;
  isVoice?: boolean;
}

export interface ChatMessageResponse {
  success: boolean;
  data: {
    id: string;
    response: string;
    timestamp: string;
    audioUrl?: string;
  };
}

// Wheel Types
export interface WheelSpinRequest {
  sessionId: string;
}

export interface WheelSpinResponse {
  success: boolean;
  data: {
    id: string;
    section: string;
    discountPercentage: number;
    isWinning: boolean;
    resultMessage: string;
    spinDuration: number;
  };
}

// API Error Response
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  details?: any;
}

// Form Configuration
export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'boolean' | 'file';
  required: boolean;
  maxLength?: number;
  pattern?: string;
  options?: string[];
}

export interface ServiceOption {
  id: string;
  name: string;
  category: string;
  description?: string;
  basePrice?: number;
  features?: string[];
}

export interface FormsConfigResponse {
  success: boolean;
  data: {
    jobApplication: {
      fields: FormField[];
      maxFileSize: number;
      allowedFileTypes: string[];
    };
    discountForm: {
      fields: FormField[];
      services: ServiceOption[];
    };
    validation: {
      rateLimit: {
        windowMs: number;
        maxRequests: number;
      };
      fileUpload: {
        maxSize: number;
        allowedTypes: string[];
      };
    };
  };
}