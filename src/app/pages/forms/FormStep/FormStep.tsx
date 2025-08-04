/* eslint-disable react-hooks/exhaustive-deps */
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { ClientResponse } from '@/api/fetchClient'
import { fetchWithAuth } from '@/api/fetchWithAuth'
import { getDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { useAppSelector } from '@/app/hooks'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { API_BASE_URL } from '@/config/config'
import {
  ClientType,
  JourneyType,
  MessageType,
  PlaceType,
  State,
  StepType,
} from '@/types'

import Form from '../Form'
import { PlaceResponse } from '../FormPiece/FormPiece'
import { getInputStepConfig } from './configStep/getInputTextStepConfig'

const FormStep: FC = () => {
  const title = 'Formulaire Etape'
  const collection = 'steps'
  const navigate = useNavigate()
  const [client, setClient] = useState<ClientType[]>([])
  const [place, setPlace] = useState<PlaceType[]>([])
  const [journey, setJourney] = useState<JourneyType[]>([])
  const [showDescription, setShowDescription] = useState(false)
  const [newIdFromApi, setNewIdFromApi] = useState<number>()
  const [selectedClientId, setSelectedClientId] = useState<number>()
  const [selectedPlaceId, setSelectedPlaceId] = useState<number>()
  const [selectedJourneyId, setSelectedJourneyId] = useState<number>()
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)
  const [formData, setFormData] = useState<StepType>({
    id: 0,
    journeyId: 0,
    medalId: 0,
    name: '',
    image: 'image.png',
    address: '',
    city: '',
    country: '',
    postal: '',
    location_required: false,
    lat: 0,
    lon: 0,
    stepNumber: 1, //initialisé a 1
    isActive: false,
    isPublished: false,
  })

  const {
    step,
    setStep,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
  } = useTimelineStep()
  const getInput = !showDescription ? getInputStepConfig : getDescriptionConfig

  const handleArrowLeft = () => {
    void navigate(-1)
  }

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
      const response: Response = await fetchWithAuth(
        `${API_BASE_URL}/steps/create`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ step: formData }),
        }
      )

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${String(response.status)}`)
      }
      const newId: number = (await response.json()) as number
      setNewIdFromApi(newId) // recupere l'Id du nouveau place créé

      console.log('newId from Server', newId)
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({
        info: "Erreur lors de l'envoi du formulaire",
        result: false,
      })
    }
  }

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleDescription = () => {
    //AFFICHER Descritpion
    setShowDescription(true)
    setCurrentStep(0)
  }

  const handleSelectClient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setSelectedClientId(selectedValueToNumber)
  }

  const handleSelectPlace = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setSelectedPlaceId(selectedValueToNumber)
  }

  const handleSelectJourney = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setSelectedJourneyId(selectedValueToNumber)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        ['journeyId']: selectedValueToNumber,
      }
    })
  }

  const handleFileUpload = async (
    file: File,
    fileType: string,
    name: string,
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()
    const formUpload = new FormData()
    // Ajout des données dans formUpload
    formUpload.append('file', file) // le fichier image à uploader
    formUpload.append('type', 'image') // type : image ou audio
    formUpload.append('destination', 'Step') // ou journey, step, etc.

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [fileType]: name,
      }
    })

    try {
      const response: Response = await fetchWithAuth(
        'https://dev.ludimuseo.fr:4000/api/upload',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formUpload, // Attention : pas de Content-Type ici, FormData le gère
        }
      )

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status.toString()}`)
      }
      const data: unknown = await response.json()
      console.log('Fichier uploadé avec succès :', data)
    } catch (error) {
      console.error("Erreur lors de l'upload :", error)
      throw error
    }
  }

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response: Response = await fetchWithAuth(
          `https://dev.ludimuseo.fr:4000/api/clients/list`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${String(response.status)}`)
        }
        const data = (await response.json()) as ClientResponse
        const clientData = data.clients
        const filteredClientIsActive = clientData.filter(
          (item) => item.isActive
        )
        setClient([...filteredClientIsActive])
      } catch (error) {
        console.log('ERROR fetching clients: ', error)
      }
    }
    void fetchClients()
  }, [])

  useEffect(() => {
    const fetchPlace = async () => {
      if (!selectedClientId) return
      try {
        const response: Response = await fetchWithAuth(
          `${API_BASE_URL}/places/list/${selectedClientId.toString()}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${String(response.status)}`)
        }
        const data = (await response.json()) as PlaceResponse
        const placeData = data.places
        setPlace(placeData)
      } catch (error) {
        setPlace([])
        setJourney([])
        console.log('ERROR fetching places: ', error)
      }
    }
    void fetchPlace()
  }, [selectedClientId])

  useEffect(() => {
    const fetchJourney = async () => {
      if (!selectedPlaceId) return
      try {
        const response: Response = await fetchWithAuth(
          `${API_BASE_URL}/journeys/getAllJourneysByPlaceId/${selectedPlaceId.toString()}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${String(response.status)}`)
        }
        const data = (await response.json()) as JourneyType[]
        const journeyData = data
        console.log('From fecth journeyData: ', journeyData)
        setJourney(journeyData)
      } catch (error) {
        setJourney([])
        console.log('ERROR fetching places: ', error)
      }
    }
    void fetchJourney()
  }, [selectedPlaceId])

  useEffect(() => {
    //recup de le nombre de step pour initialisé le numero de step
    if (!selectedJourneyId) return
    const countStepNumber = async () => {
      try {
        const response: Response = await fetchWithAuth(
          `${API_BASE_URL}/steps/find/${selectedJourneyId.toString()}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${String(response.status)}`)
        }
        const data = (await response.json()) as JourneyType[]
        const stepsData = data
        const totalSteps = stepsData.length + 1
        setFormData((prev) => {
          return {
            ...prev,
            ['stepNumber']: totalSteps,
          }
        })
      } catch (error) {
        console.log('ERROR fetching steps: ', error)
      }
    }

    void countStepNumber()
  }, [selectedJourneyId])

  useEffect(() => {
    setStep(getInput.length)
    setMessage({
      info: '',
      result: false,
    })
  }, [getInput])

  // console.log('FormData:', { ...formData })
  console.log('token: ', token)

  return (
    <Form
      client={client}
      place={place}
      journey={journey}
      isAssociated={formData.journeyId !== 0}
      selectedClientId={selectedClientId}
      selectedPlaceId={selectedPlaceId}
      newIdFromApi={newIdFromApi}
      handleSelectClient={handleSelectClient}
      handleSelectPlace={handleSelectPlace}
      handleSelectJourney={handleSelectJourney}
      title={title}
      collection={collection}
      icon={<></>}
      handleArrowLeft={handleArrowLeft}
      getInput={getInput}
      currentStep={currentStep}
      step={step}
      message={message}
      handleSubmit={(event) => {
        void handleSubmit(event)
      }}
      formData={formData}
      handleInputChange={(name, value) => {
        handleInputChange(name, value)
      }}
      handleDescription={handleDescription}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
      handleFileUpload={(file, fileType, name, event) => {
        void handleFileUpload(file, fileType, name, event)
      }}
    />
  )
}

export { FormStep }
