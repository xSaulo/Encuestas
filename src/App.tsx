import { useState } from 'react'
import { QUESTIONS } from './questions'
import { sendSurvey } from './sendSurvey'
import QuestionInput from './components/QuestionInput'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function App() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')

  const question = QUESTIONS[step]
  const isLast = step === QUESTIONS.length - 1
  const value = answers[question.id] ?? ''
  const canContinue = !question.required || value.trim() !== ''
  const progress = ((step + (canContinue ? 1 : 0)) / QUESTIONS.length) * 100

  const setValue = (v: string) => setAnswers((a) => ({ ...a, [question.id]: v }))

  async function submit() {
    setStatus('sending')
    try {
      await sendSurvey(answers)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  function next() {
    if (!canContinue) return
    if (isLast) submit()
    else setStep((s) => s + 1)
  }

  function restart() {
    setAnswers({})
    setStep(0)
    setStatus('idle')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100 sm:p-10">
        {status === 'sent' ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
              ✓
            </div>
            <h1 className="text-2xl font-bold text-slate-800">¡Gracias por su opinión!</h1>
            <p className="mt-2 text-slate-500">Su respuesta fue enviada correctamente.</p>
            <button onClick={restart} className="mt-6 text-sm font-medium text-indigo-600 hover:underline">
              Responder de nuevo
            </button>
          </div>
        ) : (
          <>
            <header className="mb-8">
              <p className="text-sm font-medium text-indigo-600">Encuesta de Servicio al Cliente</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500">
                  {step + 1} / {QUESTIONS.length}
                </span>
              </div>
            </header>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                next()
              }}
            >
              <h2 className="mb-6 text-xl font-semibold text-slate-800 sm:text-2xl">
                {question.title}
                {question.required && <span className="text-rose-500"> *</span>}
              </h2>

              <QuestionInput key={question.id} question={question} value={value} onChange={setValue} />

              {status === 'error' && (
                <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
                  No se pudo enviar la respuesta. Verifique su conexión e inténtelo de nuevo.
                </p>
              )}

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 0 || status === 'sending'}
                  className="rounded-xl px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 disabled:invisible"
                >
                  ← Anterior
                </button>
                <button
                  type="submit"
                  disabled={!canContinue || status === 'sending'}
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === 'sending' ? 'Enviando…' : isLast ? 'Enviar' : 'Siguiente →'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
