export type QuestionType = 'stars' | 'choice' | 'nps' | 'text'

export interface Question {
  id: string
  title: string
  type: QuestionType
  options?: string[]
  required: boolean
}

export const QUESTIONS: Question[] = [
  {
    id: 'satisfaccion',
    title: '¿Qué tan satisfecho está con la atención recibida?',
    type: 'stars',
    required: true,
  },
  {
    id: 'resolucion',
    title: '¿Se resolvió su consulta o problema?',
    type: 'choice',
    options: ['Sí, completamente', 'Parcialmente', 'No se resolvió'],
    required: true,
  },
  {
    id: 'tiempo_espera',
    title: '¿Cómo califica el tiempo de espera?',
    type: 'choice',
    options: ['Muy rápido', 'Rápido', 'Aceptable', 'Lento', 'Muy lento'],
    required: true,
  },
  {
    id: 'recomendacion',
    title: 'Del 0 al 10, ¿qué tan probable es que nos recomiende?',
    type: 'nps',
    required: true,
  },
  {
    id: 'comentarios',
    title: '¿Tiene algún comentario o sugerencia para mejorar?',
    type: 'text',
    required: false,
  },
]
