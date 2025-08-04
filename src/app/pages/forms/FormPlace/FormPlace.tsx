/* eslint-disable react-hooks/exhaustive-deps */
import { PlaceIcon } from '@component'
import { useAppSelector } from '@hook'
import { FC, FormEvent, MouseEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { getDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { useClients } from '@/app/hooks/useClients'
import { useDescriptions } from '@/app/hooks/useDescriptions'
import { useFileUpload } from '@/app/hooks/useFileUpload'
import { useFormMessage } from '@/app/hooks/useFormMessage'
import { useInputChange } from '@/app/hooks/useInputChange'
import { useMedals } from '@/app/hooks/useMedals'
import { useSelectHandlers } from '@/app/hooks/useSelect'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { API_BASE_URL } from '@/config/config'
import { PlaceType, State } from '@/types'
import { FormDataType } from '@/types/index'

import Form from '../Form'
import { getInputPlaceConfig } from './configPlace/getInputPlaceConfig'

const FormPlace: FC = () => {
  const navigate = useNavigate()
  const title = 'Formulaire Lieu'
  const collection = 'places'
  const [newIdFromApi, setNewIdFromApi] = useState<number>(2)
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)
  const { data: clients } = useClients(token)
  const { data: medals } = useMedals(token)

  const initialPlaceData: FormDataType = {
    clientID: 0,
    lat: 0,
    lon: 0,
    id: 0,
    medalId: 0,
    name: '',
    image: 'image.png',
    type: 'MUSEUM',
    address: '',
    city: '',
    country: '',
    postal: '',
    location_required: false,
    isActive: false,
    isPublished: false,
  }

  const { message, setMessage } = useFormMessage()
  const {
    step,
    setStep,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
  } = useTimelineStep()

  const { handleDescription, showDescription, handleSubmitDescriptions } =
    useDescriptions(newIdFromApi, collection, token, setCurrentStep, setMessage)

  const { formData, setFormData, handleInputChange } =
    useInputChange<FormDataType>(initialPlaceData)

  const getInput = useMemo(() => {
    return showDescription ? getDescriptionConfig : getInputPlaceConfig
  }, [showDescription])

  const handleArrowLeft = () => {
    void navigate(-1)
  }

  const { handleSelectClient, handleSelectMedal } =
    useSelectHandlers(setFormData)

  const { handleFileUpload } = useFileUpload(token, setFormData)

  //soumission des informations
  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!token) {
      alert("Une erreur c'est produite, reconnectez-vous")
      void navigate('/auth/signin')
      return
    }

    //FETCH des donnees a l'API et recuperer l'ID
    if (showDescription) {
      //Envois des DATA au serveur
      setMessage(() => ({
        info: 'Vos descriptions ont été envoyées avec succès !',
        result: true,
      }))
    } else {
      setMessage(() => ({
        info: 'Votre formulaire a été envoyé avec succès !',
        result: true,
      }))
    }

    try {
      const response: Response = await fetchWithAuth(`${API_BASE_URL}/places`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ place: formData }),
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${String(response.status)}`)
      }
      const newId: number = (await response.json()) as number
      setNewIdFromApi(newId) // recupere l'Id du nouveau place créé
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({
        info: "Erreur lors de l'envoi du formulaire",
        result: false,
      })
    }
  }

  useEffect(() => {
    setStep(getInput.length)
    setCurrentStep(0)
    //reinitialiser le footer
    setMessage({
      info: '',
      result: false,
    })
  }, [getInput])

  console.log('FORMPLACE formData: ', formData)

  return (
    <Form
      client={clients}
      medal={medals}
      isAssociated={formData.clientId !== 0}
      handleSelectClient={handleSelectClient}
      handleSelectMedal={handleSelectMedal}
      newIdFromApi={newIdFromApi}
      title={title}
      collection={collection}
      icon={<PlaceIcon />}
      handleArrowLeft={handleArrowLeft}
      getInput={getInput}
      currentStep={currentStep}
      step={step}
      message={message}
      showDescription={showDescription}
      handleSubmit={(event) => {
        void handleSubmit(event)
      }}
      formData={formData as unknown as PlaceType}
      handleInputChange={(name, value) => {
        handleInputChange(name, value)
      }}
      handleDescription={handleDescription}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
      handleFileUpload={(file, fileType, name, event) => {
        void handleFileUpload(file, fileType, name, event)
      }}
      handleSubmitDescriptions={(descriptions) => {
        void handleSubmitDescriptions(descriptions)
      }}
    />
  )
}
export { FormPlace }
