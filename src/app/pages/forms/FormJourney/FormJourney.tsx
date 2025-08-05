/* eslint-disable react-hooks/exhaustive-deps */
import { JourneyIcon } from '@component'
import { useAppSelector } from '@hook'
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { ClientResponse } from '@/api/fetchClient'
import { fetchWithAuth } from '@/api/fetchWithAuth'
import { getDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { API_BASE_URL } from '@/config/config'
import {
  ClientType,
  JourneyType,
  MedalType,
  MessageType,
  PlaceType,
  State,
} from '@/types'

import Form from '../Form'
import { PlaceResponse } from '../FormPiece/FormPiece'
import { getInputJourneyConfig } from './configJourney/getInputJourneyConfig'

const FormJourney: FC = () => {
  const title = 'Formulaire Parcours'
  const collection = 'journeys'
  const navigate = useNavigate()
  const [showDescription, setShowDescription] = useState(false)
  const [client, setClient] = useState<ClientType[]>([])
  const [place, setPlace] = useState<PlaceType[]>([])
  const [selectedClientId, setSelectedClientId] = useState<number>()
  const [selectedPlaceId, setSelectedPlaceId] = useState<number>()
  const [newIdFromApi, setNewIdFromApi] = useState<number>()
  const [medal, setMedal] = useState<MedalType[]>([])
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)

  const [formData, setFormData] = useState<JourneyType>({
    id: 0,
    placeId: 0,
    medalId: 0,
    duration: 0,
    name: '',
    address: '',
    city: '',
    country: '',
    postal: '',
    image: '',
    type: 'MUSEUM',
    location_required: false,
    lat: 0,
    lon: 0,
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
        `${API_BASE_URL}/journeys/create`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ journey: formData }),
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

  const handleSelectClient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setSelectedClientId(selectedValueToNumber)
  }

  const handleDescription = () => {
    //AFFICHER Descritpion
    setShowDescription(true)
    setCurrentStep(0)
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
    formUpload.append('destination', 'Journey') // ou journey, step, etc.

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [fileType]: name,
      }
    })

    try {
      if (!token) {
        alert("Une erreur c'est produite, reconnectez-vous")
        void navigate('/auth/signin')
        return
      }

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

  const handleSelectPlace = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setSelectedPlaceId(selectedValueToNumber)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        ['placeId']: selectedValueToNumber,
      }
    })
  }

  const handleSelectMedal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        ['medalId']: selectedValueToNumber,
      }
    })
  }

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
        console.log('ERROR fetching places: ', error)
      }
    }
    void fetchPlace()
  }, [selectedClientId])

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

  const getInput = !showDescription
    ? getInputJourneyConfig
    : getDescriptionConfig

  useEffect(() => {
    setStep(getInput.length)
    setMessage({
      info: '',
      result: false,
    })
  }, [getInput])

  console.log('FormDataJourney:', { ...formData })

  return (
    <>
      <Form
        client={client}
        place={place}
        medal={medal}
        isAssociated={formData.placeId !== 0}
        handleSelectClient={handleSelectClient}
        handleSelectPlace={handleSelectPlace}
        handleSelectMedal={handleSelectMedal}
        selectedClientId={selectedClientId}
        selectedPlaceId={selectedPlaceId}
        newIdFromApi={newIdFromApi}
        title={title}
        collection={collection}
        icon={<JourneyIcon />}
        handleArrowLeft={handleArrowLeft}
        getInput={getInput}
        currentStep={currentStep}
        step={step}
        message={message}
        showDescription={showDescription}
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
    </>
  )
}

export { FormJourney }
