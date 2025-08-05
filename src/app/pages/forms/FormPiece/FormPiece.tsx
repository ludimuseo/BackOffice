/* eslint-disable react-hooks/exhaustive-deps */
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { ClientResponse } from '@/api/fetchClient'
import { fetchWithAuth } from '@/api/fetchWithAuth'
import { PlaceIcon } from '@/app/components'
import { getDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { useAppSelector } from '@/app/hooks'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { API_BASE_URL } from '@/config/config'
import {
  ClientType,
  JourneyType,
  MedalType,
  MessageType,
  PieceType,
  PlaceType,
  State,
  StepType,
} from '@/types'
import { isTokenExpired } from '@/utils/auth'

import Form from '../Form'
import { getInputPieceConfig } from './configPiece/getInputPieceConfig'

export interface PlaceResponse {
  places: PlaceType[]
}

const FormPiece: FC = () => {
  const title = 'Formulaire Oeuvre'
  const collection = 'pieces'
  const navigate = useNavigate()
  const [client, setClient] = useState<ClientType[]>([])
  const [place, setPlace] = useState<PlaceType[]>([])
  const [journey, setJourney] = useState<JourneyType[]>([])
  const [steps, setSteps] = useState<StepType[]>([])
  const [medal, setMedal] = useState<MedalType[]>([])
  const [showDescription, setShowDescription] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState<number>()
  const [selectedPlaceId, setSelectedPlaceId] = useState<number>()
  const [selectedJourneyId, setSelectedJourneyId] = useState<number>()
  const [newIdFromApi, setNewIdFromApi] = useState<number>()
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [formData, setFormData] = useState<PieceType>({
    id: 0,
    stepId: 0,
    name: '',
    image: '',
    isActive: false,
    isPublished: false,
  })
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)
  const getInput = !showDescription ? getInputPieceConfig : getDescriptionConfig

  const {
    step,
    setStep,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
  } = useTimelineStep()

  const handleDescription = () => {
    //AFFICHER Descritpion
    setShowDescription(true)
    setCurrentStep(0)
  }

  const handleArrowLeft = () => {
    void navigate(-1)
  }

  //soumission des informations
  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (isTokenExpired(token)) {
      alert("Une erreur c'est produite, reconnectez-vous")
      void navigate('/auth/signin')
      return
    }

    //FETCH des donnees a l'API et recuperer l'ID
    if (showDescription) {
      setMessage((prev) => ({
        ...prev,
        ['info']: 'Vos descriptions ont été envoyées avec succès !',
        ['result']: true,
      }))
    } else {
      setMessage((prev) => ({
        ...prev,
        ['info']: 'Votre formulaire a été envoyé avec succès !',
        ['result']: true,
      }))
    }

    try {
      const response: Response = await fetchWithAuth(
        `${API_BASE_URL}/piece/create`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ piece: formData }),
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
        result: true,
      })
    }
  }

  const handleInputChange = (
    name: string,
    value: string | boolean //Ajout du type boolean pour les cases à cocher
  ) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
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
    formUpload.append('destination', 'Place') // ou journey, step, etc.

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [fileType]: name,
      }
    })

    try {
      const response: Response = await fetchWithAuth(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formUpload, // Attention : pas de Content-Type ici, FormData le gère
      })

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

  const handleSelectMedal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setFormData((prev) => {
      return {
        ...prev,
        ['medalId']: selectedValueToNumber,
      }
    })
  }

  const handleSelectJourney = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setSelectedJourneyId(selectedValueToNumber)
  }

  const handleSelectStep = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setFormData((prev) => {
      return {
        ...prev,
        ['stepId']: selectedValueToNumber,
      }
    })
  }

  useEffect(() => {
    setStep(getInput.length)
    setMessage({
      info: '',
      result: false,
    })
  }, [getInput])

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response: Response = await fetchWithAuth(
          `${API_BASE_URL}/clients/list`,
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
        setSteps([])
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
        setSteps([])
        console.log('ERROR fetching journeys: ', error)
      }
    }
    void fetchJourney()
  }, [selectedPlaceId])

  useEffect(() => {
    const fetchStep = async () => {
      if (!selectedJourneyId) return
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
        const stepData = (await response.json()) as StepType[]
        console.log('From PIECE fecth stepsData: ', stepData)
        setSteps(stepData)
      } catch (error) {
        setSteps([])
        console.log('ERROR fetching steps: ', error)
      }
    }

    void fetchStep()
  }, [selectedJourneyId])

  useEffect(() => {
    const fetchMedals = async () => {
      try {
        const response: Response = await fetchWithAuth(
          `${API_BASE_URL}/medals/list`,
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
        const data = (await response.json()) as MedalType[]
        const medalData = data
        setMedal(medalData)
      } catch (error) {
        console.log('ERROR fetching clients: ', error)
      }
    }
    void fetchMedals()
  }, [])

  useEffect(() => {
    setStep(getInput.length)
    setCurrentStep(0)
  }, [getInput])

  console.log('FORMDATA:', formData)

  return (
    <>
      <Form
        title={title}
        collection={collection}
        icon={<PlaceIcon />}
        client={client}
        place={place}
        journey={journey}
        medal={medal}
        stepData={steps}
        isAssociated={formData.stepId !== 0}
        handleSelectClient={handleSelectClient}
        handleSelectMedal={handleSelectMedal}
        handleSelectPlace={handleSelectPlace}
        selectedClientId={selectedClientId}
        selectedPlaceId={selectedPlaceId}
        selectedJourneyId={selectedJourneyId}
        newIdFromApi={newIdFromApi}
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
        handleSelectStep={handleSelectStep}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handleFileUpload={(file, fileType, name, event) => {
          void handleFileUpload(file, fileType, name, event)
        }}
        handleDescription={handleDescription}
        handleSelectJourney={handleSelectJourney}
      />
    </>
  )
}

export { FormPiece }
