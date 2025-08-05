import { UserIcon } from '@component'
import { useAppSelector } from '@hook'
import { FC, type FormEvent, MouseEvent, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { useFormMessage } from '@/app/hooks/useFormMessage'
import { useInputChange } from '@/app/hooks/useInputChange'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { API_BASE_URL } from '@/config/config'
import { ClientType, State } from '@/types'

import Form from '../Form'
import { getInputClientConfig } from './configClient/getInputClientConfig'

const FormClient: FC = () => {
  const navigate = useNavigate()
  const { message, setMessage } = useFormMessage()

  const initialClientData: ClientType = {
    id: 0,
    name: '',
    siret: '',
    tva: '',
    type: 'ENTREPRISE',
    website: '',
    address: '',
    postal: '',
    city: '',
    country: '',
    email: '',
    tel: '',
    note: '',
    isActive: true,
  }

  const { formData, handleInputChange } =
    useInputChange<ClientType>(initialClientData)

  const { token } = useAppSelector((state: State) => state.auth)

  const { step, setStep, currentStep, handleNextStep, handlePrevStep } =
    useTimelineStep()

  const handleArrowLeft = () => {
    void navigate(-1)
  }

  //soumission des informations FIREBASE
  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    try {
      const response: Response = await fetchWithAuth(
        `${API_BASE_URL}/clients/create`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${String(response.status)}`)
      }

      setMessage(() => ({
        info: 'Votre formulaire a été envoyé avec succès !',
        result: true,
      }))
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({
        info: "Erreur lors de l'envoi du formulaire",
        result: false,
      })
    }
  }

  const getInput = getInputClientConfig

  useEffect(() => {
    setStep(getInput.length)
  }, [getInput, setStep])

  console.log('formData:', formData)

  return (
    <Form
      title={'Formulaire Client'}
      icon={<UserIcon />}
      handleArrowLeft={handleArrowLeft}
      getInput={getInput}
      currentStep={currentStep}
      step={step}
      message={message}
      handleSubmit={(event) => void handleSubmit(event)}
      formData={formData}
      handleInputChange={(name, value) => {
        handleInputChange(name, value)
      }}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
    />
  )
}

export { FormClient }
