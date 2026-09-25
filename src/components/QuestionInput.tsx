import type { Question } from '../questions'

interface Props {
  question: Question
  value: string
  onChange: (value: string) => void
}

const STAR_LABELS = ['Muy insatisfecho', 'Insatisfecho', 'Neutral', 'Satisfecho', 'Muy satisfecho']

function npsColor(n: number) {
  if (n <= 6) return 'border-rose-500 bg-rose-500 text-white'
  if (n <= 8) return 'border-amber-500 bg-amber-500 text-white'
  return 'border-emerald-500 bg-emerald-500 text-white'
}

export default function QuestionInput({ question, value, onChange }: Props) {
  switch (question.type) {
    case 'stars': {
      const current = Number(value) || 0
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2" role="radiogroup" aria-label={question.title}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={current === n}
                aria-label={`${n} - ${STAR_LABELS[n - 1]}`}
                onClick={() => onChange(String(n))}
                className={`rounded text-4xl transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:text-5xl ${
                  n <= current ? 'text-amber-400' : 'text-slate-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="h-5 text-sm text-slate-500">{current ? STAR_LABELS[current - 1] : ''}</p>
        </div>
      )
    }

    case 'choice':
      return (
        <div className="grid gap-2">
          {question.options!.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                value === opt
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                  : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(opt)}
                className="accent-indigo-600"
              />
              {opt}
            </label>
          ))}
        </div>
      )

    case 'nps':
      return (
        <div>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
            {Array.from({ length: 11 }, (_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange(String(n))}
                className={`rounded-lg border py-2 font-semibold transition ${
                  value === String(n) ? npsColor(n) : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Nada probable</span>
            <span>Muy probable</span>
          </div>
        </div>
      )

    case 'text':
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          maxLength={1000}
          placeholder="Escriba aquí sus comentarios (opcional)"
          className="w-full resize-none rounded-xl border border-slate-200 p-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      )
  }
}
