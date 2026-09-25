// Correo que recibirá las respuestas
export const DESTINATION_EMAIL = 'scalvo2910@gmail.com'

// EmailJS (recomendado): correo con plantilla propia en español.
// Si los tres valores están completos se usa EmailJS; si no, se usa FormSubmit.
// Estas claves son públicas por diseño, pueden ir en el código.
export const EMAILJS = {
  serviceId: '',
  templateId: '',
  publicKey: '',
}

// Respaldo sin configuración
export const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`
