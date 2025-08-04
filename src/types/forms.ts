// src/types/forms.ts

// Form validation and UI types

export type FormFieldType = 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'boolean' | 'file' | 'date' | 'url';

export interface FormFieldProps {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  maxLength?: number;
  accept?: string; // for file inputs
  multiple?: boolean;
  disabled?: boolean;
  error?: string;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
}

export interface FormState<T = any> {
  values: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
  touched: Record<string, boolean>;
}

export interface FormHookReturn<T = any> {
  formState: FormState<T>;
  handleChange: (name: string, value: any) => void;
  handleBlur: (name: string) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => (e: React.FormEvent) => Promise<void>;
  reset: () => void;
  setFieldError: (name: string, error: string) => void;
  setFieldValue: (name: string, value: any) => void;
}

// Specific form value types
export interface JobApplicationFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  position: string;
  experience: string;
  skills: string;
  education: string;
  availability: string;
  portfolio: string;
  coverLetter: string;
  salary: string;
  relocate: boolean;
  remoteWork: boolean;
  startDate: string;
  references: string;
  linkedIn: string;
  github: string;
  resume: File | null;
  additionalInfo: string;
  agreedToTerms: boolean;
}

export interface DiscountFormValues {
  identificacion: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  serviceInterest: string;
  companyName: string;
  companySize: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  wheelResultId: string;
  discountCode: string;
  referralSource: string;
  agreeToMarketing: boolean;
  agreedToTerms: boolean;
}

export interface ContactFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  company: string;
  agreedToTerms: boolean;
}

// Form validation rules
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface FormValidationSchema {
  [fieldName: string]: ValidationRule;
}

// Form options for select fields
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export const SERVICE_OPTIONS: SelectOption[] = [
  { value: 'web-development', label: 'Desarrollo Web' },
  { value: 'mobile-development', label: 'Desarrollo Mobile' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'consulting', label: 'Consultoría Tech' },
  { value: 'design', label: 'Diseño UX/UI' },
  { value: 'marketing', label: 'Marketing Digital' },
  { value: 'other', label: 'Otro' }
];

export const COMPANY_SIZE_OPTIONS: SelectOption[] = [
  { value: '1-10', label: '1-10 empleados' },
  { value: '11-50', label: '11-50 empleados' },
  { value: '51-200', label: '51-200 empleados' },
  { value: '201-1000', label: '201-1000 empleados' },
  { value: '1000+', label: 'Más de 1000 empleados' }
];

export const BUDGET_OPTIONS: SelectOption[] = [
  { value: 'less-than-5k', label: 'Menos de $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-50k', label: '$15,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: 'more-than-100k', label: 'Más de $100,000' },
  { value: 'not-sure', label: 'No estoy seguro' }
];

export const TIMELINE_OPTIONS: SelectOption[] = [
  { value: 'asap', label: 'Lo antes posible' },
  { value: '1-month', label: '1 mes' },
  { value: '2-3-months', label: '2-3 meses' },
  { value: '3-6-months', label: '3-6 meses' },
  { value: 'more-than-6-months', label: 'Más de 6 meses' },
  { value: 'flexible', label: 'Flexible' }
];

export const REFERRAL_SOURCE_OPTIONS: SelectOption[] = [
  { value: 'google', label: 'Google' },
  { value: 'social-media', label: 'Redes sociales' },
  { value: 'referral', label: 'Referencia' },
  { value: 'advertising', label: 'Publicidad' },
  { value: 'event', label: 'Evento' },
  { value: 'other', label: 'Otro' }
];