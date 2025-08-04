import { Dispatch, SetStateAction, useState } from 'react'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { API_BASE_URL } from '@/config/config'
import { DescriptionType } from '@/types'

import { generateUniqueId } from '../services/utils/generateId'

export const useDescriptions = (
  newIdFromApi: number,
  collection: string,
  token: string,
  setCurrentStep?: Dispatch<SetStateAction<number>>,
  setMessage?: (message: { info: string; result: boolean }) => void
) => {
  const [showDescription, setShowDescription] = useState(true)
  const [descriptions, setDescriptions] = useState<DescriptionType[]>([
    {
      id: generateUniqueId(),
      collection: collection,
      collectionId: newIdFromApi,
      language: 'fr',
      order: 0,
      text: '',
      isFalc: false,
      isCertifiedFalc: false,
      isValidate: false,
      certifiedDate: null,
      certifiedBy: 0,
      image: '',
      audio: '',
    },
  ])

  const handleDescription = () => {
    //AFFICHER compossant Description
    setShowDescription(true)
    setCurrentStep?.(0)
  }

  const handleSubmitDescriptions = async (descriptions: DescriptionType[]) => {
    //ENVOIE du tableau de descriptions au serveur
    console.log('FORMPLACE descriptions: ', descriptions)

    try {
      const response: Response = await fetchWithAuth(
        `${API_BASE_URL}/places/description`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ descriptions }),
        }
      )

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${String(response.status)}`)
      }
      const newId: number = (await response.json()) as number
      console.log('newId from Server', newId)
    } catch (error) {
      console.error('Erreur:', error)
      setMessage?.({
        info: "Erreur lors de l'envoi du formulaire !",
        result: false,
      })
    }
    setMessage?.({
      info: 'Vos descriptions ont été envoyées avec succès !',
      result: true,
    })
  }

  return {
    descriptions,
    setDescriptions,
    handleDescription,
    showDescription,
    handleSubmitDescriptions,
  }
}
