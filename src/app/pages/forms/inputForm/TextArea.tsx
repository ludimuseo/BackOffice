import {
  ClientType,
  JourneyType,
  MedalType,
  PieceType,
  PlaceType,
  QuestionType,
  QuizType,
  StepType,
} from '@/types'

interface TextAreaType {
  id: string
  label: string
  name: string
  placeholder?: string
  rows: number
  mode?: string
  formData:
    | PlaceType
    | ClientType
    | JourneyType
    | StepType
    | PieceType
    | MedalType
    | QuizType
    | QuestionType
  language?: string
  handleInputChange: (name: string, event: string) => void
}
export default function TextArea({
  id,
  label,
  name,
  placeholder,
  rows,
  formData,
  handleInputChange,
}: TextAreaType) {
  const value = formData[name as keyof typeof formData] as unknown as string
  return (
    <div className="mt-4 flex w-full flex-col" key={id}>
      <p className="mb-2 font-inclusive text-xl">{label}</p>
      <textarea
        key={id}
        id={id}
        name={name}
        className="textarea textarea-bordered font-inclusive text-lg"
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={(e) => {
          handleInputChange(name, e.target.value)
        }}
      />
    </div>
  )
}
