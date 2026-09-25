import { QUESTIONS } from './questions'
import { EMAILJS, FORMSUBMIT_URL } from './config'

const STAR_LABELS = ['Muy insatisfecho', 'Insatisfecho', 'Neutral', 'Satisfecho', 'Muy satisfecho']

function formatAnswer(type: string, raw: string | undefined): string {
  const v = raw?.trim()
  if (!v) return 'Sin respuesta'
  if (type === 'stars') return `${v} de 5 (${STAR_LABELS[Number(v) - 1]})`
  if (type === 'nps') return `${v} de 10`
  return v
}

function fechaActual() {
  return new Date().toLocaleString('es-MX', { dateStyle: 'full', timeStyle: 'short' })
}

async function sendWithEmailJS(answers: Record<string, string>) {
  // Variables disponibles en la plantilla: {{fecha}}, {{satisfaccion}}, {{resolucion}},
  // {{tiempo_espera}}, {{recomendacion}}, {{comentarios}}
  const params: Record<string, string> = { fecha: fechaActual() }
  QUESTIONS.forEach((q) => (params[q.id] = formatAnswer(q.type, answers[q.id])))

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS.serviceId,
      template_id: EMAILJS.templateId,
      user_id: EMAILJS.publicKey,
      template_params: params,
    }),
  })
  if (!res.ok) throw new Error(await res.text())
}

async function sendWithFormSubmit(answers: Record<string, string>) {
  const payload: Record<string, string> = {
    _subject: 'Nueva respuesta - Encuesta de Servicio al Cliente',
    _template: 'table',
    _captcha: 'false',
    Fecha: fechaActual(),
  }
  QUESTIONS.forEach((q, i) => (payload[`${i + 1}. ${q.title}`] = formatAnswer(q.type, answers[q.id])))

  const res = await fetch(FORMSUBMIT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || String(data.success) !== 'true') throw new Error(data.message)
}

export function sendSurvey(answers: Record<string, string>) {
  const useEmailJS = EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey
  return useEmailJS ? sendWithEmailJS(answers) : sendWithFormSubmit(answers)
}
