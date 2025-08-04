// src/forms/index.ts

// Exportar todos los formularios desde un solo lugar
export { FormField } from '../components/forms/FormField'
export { JobApplicationForm } from '../components/forms/JobApplicationForm'
export { DiscountForm } from '../components/forms/DiscountForm'

// Re-exportar también desde components para mantener compatibilidad
export { FormField as ComponentFormField } from '../components/forms/FormField'
export { JobApplicationForm as ComponentJobApplicationForm } from '../components/forms/JobApplicationForm'
export { DiscountForm as ComponentDiscountForm } from '../components/forms/DiscountForm'