import { collection, getDocs, query, where } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import Header from '@/app/components/talos/textList/Header'
import ImagePreview from '@/app/components/talos/textList/ImagePreview'
import NavigationHeader from '@/app/components/talos/textList/NavigationHeader'
import PreviewRemainingText from '@/app/components/talos/textList/PreviewRemainingText'
import TextPreview from '@/app/components/talos/textList/TextPreview'
import { CheckIcon } from '@/app/components/ui/icons/CheckIcon'
import { PencilIcon } from '@/app/components/ui/icons/PencilIcon'
import { db } from '@/firebase/firebase'
import {
  EntityWithId,
  JourneyType,
  PieceType,
  PlaceType,
  StepType,
} from '@/types'

const TextList: FC = () => {
  const [isPlacesOpen, setIsPlacesOpen] = useState<boolean>(true)
  const [isJourneysOpen, setIsJourneysOpen] = useState<boolean>(true)
  const [isStepsOpen, setIsStepsOpen] = useState<boolean>(true)
  const [isPiecesOpen, setIsPiecesOpen] = useState<boolean>(true)

  const [places, setPlaces] = useState<
    (PlaceType & { docId: string; collection: string })[]
  >([])
  const [journeys, setJourneys] = useState<
    (JourneyType & { id: string; collection: string })[]
  >([])
  const [steps, setSteps] = useState<
    (StepType & { id: string; collection: string })[]
  >([])
  const [pieces, setPieces] = useState<
    (PieceType & { id: string; collection: string })[]
  >([])

  const [activePlaceId, setActivePlaceId] = useState<string | null>(null)
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null)
  const [activeStepId, setActiveStepId] = useState<string | null>(null)
  const navigate = useNavigate()

  const [placesToCorrect, setPlacesToCorrect] = useState(0)
  const [journeysToCorrect, setJourneysToCorrect] = useState(0)
  const [stepsToCorrect, setStepsToCorrect] = useState(0)
  const [piecesToCorrect, setPiecesToCorrect] = useState(0)

  // useEffect(() => {
  //   const fetchAllCounts = async () => {
  //     try {
  //       const placesQuery = query(
  //         collection(db, 'places'),
  //         where('clientId', '==', 'rHkYsm0B5EKnI9H8gC3y')
  //       )
  //       const placesSnapshot = await getDocs(placesQuery)
  //       const placesData = placesSnapshot.docs.map((doc) => {
  //         const data = doc.data() as PlaceType
  //         return { ...data, docId: doc.id }
  //       })

  //       const placesCount = placesData.filter(
  //         (place) => !place.description.falc.status.isCertified
  //       ).length

  //       let totalJourneysToCorrect = 0
  //       let totalStepsToCorrect = 0
  //       let totalPiecesToCorrect = 0

  //       for (const place of placesData) {
  //         const journeysQuery = query(
  //           collection(db, 'journeys'),
  //           where('placeId', '==', place.id)
  //         )
  //         const journeysSnapshot = await getDocs(journeysQuery)
  //         const journeysData = journeysSnapshot.docs.map((doc) => {
  //           const data = doc.data() as JourneyType
  //           return { ...data, docId: doc.id }
  //         })
  //         totalJourneysToCorrect += journeysData.filter(
  //           (journey) => !journey.description.falc.status.isCertified
  //         ).length

  //         for (const journey of journeysData) {
  //           const stepsQuery = query(
  //             collection(db, 'steps'),
  //             where('journeyId', '==', journey.docId)
  //           )
  //           const stepsSnapshot = await getDocs(stepsQuery)
  //           const stepsData = stepsSnapshot.docs.map((doc) => {
  //             const data = doc.data() as StepType
  //             return { ...data, docId: doc.id }
  //           })
  //           totalStepsToCorrect += stepsData.filter(
  //             (step) => !step.description.falc.status.isCertified
  //           ).length

  //           for (const step of stepsData) {
  //             const piecesQuery = query(
  //               collection(db, 'pieces'),
  //               where('stepId', '==', step.docId)
  //             )
  //             const piecesSnapshot = await getDocs(piecesQuery)
  //             const piecesData = piecesSnapshot.docs.map((doc) => {
  //               const data = doc.data() as PieceType
  //               return { ...data, docId: doc.id }
  //             })
  //             totalPiecesToCorrect += piecesData.filter(
  //               (piece) => !piece.description.falc.status.isCertified
  //             ).length
  //           }
  //         }
  //       }

  //       setPlacesToCorrect(placesCount)
  //       setJourneysToCorrect(totalJourneysToCorrect)
  //       setStepsToCorrect(totalStepsToCorrect)
  //       setPiecesToCorrect(totalPiecesToCorrect)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }

  //   //void fetchAllCounts()
  // }, [])

  // Fetch places on component mount
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const q = query(
          collection(db, 'places'),
          where('clientId', '==', 'rHkYsm0B5EKnI9H8gC3y')
        )
        const querySnapshot = await getDocs(q)
        const placeData = querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          collection: 'places',
          ...(doc.data() as PlaceType),
        }))
        setPlaces(placeData)
        // Count places to correct
        const placesToCorrectCount = placeData.filter(
          (place) => !place.description.falc.status.isCertified
        ).length
        setPlacesToCorrect(placesToCorrectCount)

        await fetchJourneys(placeData[0].docId)
      } catch (error) {
        console.error('Error fetching places:', error)
      }
    }
    void fetchPlaces()
  }, [])

  // Fetch journeys for a specific place
  const fetchJourneys = async (placeId: string) => {
    try {
      const q = query(
        collection(db, 'journeys'),
        where('placeId', '==', placeId)
      )
      const querySnapshot = await getDocs(q)
      const journeyData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        collection: 'journeys',
        ...(doc.data() as JourneyType),
      }))
      setJourneys(journeyData)
      setActivePlaceId(placeId)
      const journeysToCorrectCount = journeyData.filter(
        (journey) => !journey.description.falc.status.isCertified
      ).length
      setJourneysToCorrect(journeysToCorrectCount)

      const journeysIdArray: string[] = journeyData.map((element) => element.id)

      return journeysIdArray
    } catch (error) {
      console.error('Error fetching journeys:', error)
    }
  }

  // Fetch steps for a specific journey
  const fetchSteps = async (journeyId: string) => {
    try {
      const q = query(
        collection(db, 'steps'),
        where('journeyId', '==', journeyId)
      )
      const querySnapshot = await getDocs(q)
      const stepData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        collection: 'steps',
        ...(doc.data() as StepType),
      }))
      setSteps(stepData.sort((a, b) => a.stage.stepNumber - b.stage.stepNumber))
      setActiveJourneyId(journeyId)
      const stepsToCorrectCount = stepData.filter(
        (step) => !step.description.falc.status.isCertified
      ).length
      setStepsToCorrect(stepsToCorrectCount)

      //stepData.map(element => void fetchPieces(element.id))
    } catch (error) {
      console.error('Error fetching steps:', error)
    }
  }

  // Fetch pieces for a specific step
  const fetchPieces = async (stepId: string) => {
    try {
      const q = query(collection(db, 'pieces'), where('stepId', '==', stepId))
      const querySnapshot = await getDocs(q)
      const pieceData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        collection: 'pieces',
        ...(doc.data() as PieceType),
      }))
      setPieces(pieceData)
      setActiveStepId(stepId)
      const piecesToCorrectCount = pieceData.filter(
        (piece) => !piece.description.falc.status.isCertified
      ).length
      setPiecesToCorrect(piecesToCorrectCount)
    } catch (error) {
      console.error('Error fetching pieces:', error)
    }
  }

  // Navigate to the edit page
  const handleNavigate = (
    formData: EntityWithId<PlaceType | JourneyType | StepType | PieceType>
  ) => {
    void navigate('/interface', { state: { formData } })
  }

  const sumTextToCorrect: number =
    placesToCorrect + journeysToCorrect + stepsToCorrect + piecesToCorrect

  return (
    <div className="bg-white p-6 font-sans text-[#0A184D]">
      <Header title="Liste des Textes" />
      {/* <RemainingTexts
        placesToCorrect={placesToCorrect}
        journeysToCorrect={journeysToCorrect}
        stepsToCorrect={stepsToCorrect}
        piecesToCorrect={piecesToCorrect}
      /> */}

      {/* Liste des Lieux */}
      <section aria-labelledby="places-heading">
        <div className="space-y-5">
          <NavigationHeader
            key={String(Math.random())}
            isOpen={isPlacesOpen}
            label={'Lieux'}
            openNav={() => {
              setIsPlacesOpen(!isPlacesOpen)
            }}
          />

          {isPlacesOpen &&
            places.map((place) => (
              <article
                key={place.docId}
                className="rounded-md border-2 border-[#0A184D] bg-[#F4FDFF] px-6 py-4 text-[#0A184D] shadow-lg">
                <div className="mb-2 flex items-center">
                  <h3 className="my-1 text-3xl font-bold">{place.name.fr}</h3>
                </div>
                <TextPreview description={String(place.description.falc.fr)} />

                <div className="group relative inline-flex items-center">
                  <ImagePreview
                    label={String(place.name.fr)}
                    img={place.content.image[0]}
                    id={place.docId}
                    fetch={() => void fetchJourneys(place.docId)}
                    instruction="Voir les parcours"
                  />
                  {place.description.falc.status.isCertified ? (
                    <div className="group relative inline-block">
                      <button
                        className="ml-5 flex items-center gap-1 rounded-full border-2 border-[#22891F] bg-[#22891F] px-1 py-1 font-inclusive text-xl"
                        aria-label={`Texte validé pour ${String(place.name.fr)}`}>
                        <CheckIcon className="h-8 w-8" />
                        {/* Infobulle */}
                      </button>
                      <div
                        role="tooltip"
                        className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-yellow-400 px-3 py-1 font-inclusive text-lg text-blue-950 shadow-lg group-hover:block">
                        Texte validé
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleNavigate(place)
                      }}

                      className="duration-5 ml-4 flex items-center gap-3 rounded-xl border-2 border-[#0A184D] bg-[#bfdcfe] px-2 py-1 text-xl text-[#0A184D] transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#F4FDFF] hover:text-[#0A184D]"
                      aria-label={`Corriger ${place.name.fr}`}>

                      <PencilIcon />
                      <p>Corriger</p>
                    </button>
                  )}
                  <PreviewRemainingText
                    sumTextToCorrect={sumTextToCorrect}
                    journeysToCorrect={journeysToCorrect}
                    stepsToCorrect={stepsToCorrect}
                    piecesToCorrect={piecesToCorrect}
                  />
                </div>

                {/* Liste des Parcours */}
                {activePlaceId === place.docId && (
                  <section
                    aria-labelledby={`journeys-${place.docId}-heading`}
                    className="mt-7 rounded-lg border-2 bg-[#ffffff] px-2 py-3">
                    <div className="space-y-5">
                      <NavigationHeader
                        key={place.id}
                        isOpen={isJourneysOpen}
                        label={'Parcours'}
                        openNav={() => {
                          setIsJourneysOpen(!isJourneysOpen)
                        }}
                      />
                      {isJourneysOpen &&
                        journeys.map((journey) => (
                          <article
                            key={journey.id}
                            className="m-4 rounded-xl border-2 border-[#0A184D] bg-[#F4FDFF] px-4 py-3 text-[#0A184D] shadow-md">
                            <div className="mb-4 flex items-center">
                              {' '}
                              <h5 className="mb-3 font-inclusive text-3xl">
                                {journey.name.fr}
                              </h5>
                              {journey.description.falc.status.isCertified ? (
                                <div className="group relative bottom-1 inline-block">
                                  <button
                                    className="ml-5 flex items-center gap-1 rounded-full border-2 border-[#22891F] bg-[#22891F] px-1 py-1 font-inclusive text-xl"
                                    aria-label={`Texte validé pour ${journey.name.fr}`}>
                                    <CheckIcon className="h-8 w-8" />
                                    {/* Infobulle */}
                                  </button>
                                  <div
                                    role="tooltip"
                                    className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-yellow-400 px-3 py-1 font-inclusive text-lg text-blue-950 shadow-lg group-hover:block">
                                    Texte validé
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    handleNavigate(journey)
                                  }}
                                  className="duration-5 flex items-center gap-3 rounded-xl border-2 border-[#0A184D] bg-[#bfdcfe] px-6 py-2 text-xl text-[#0A184D] transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#F4FDFF] hover:text-[#0A184D]"
                                  aria-label={`Corriger ${journey.name.fr}`}>
                                  <PencilIcon />
                                  <p>Corriger</p>
                                </button>
                              )}
                            </div>

                            {/* IMAGE */}
                            <ImagePreview
                              label={journey.name.fr}
                              id={journey.id}
                              img={journey.content.image[0]}
                              fetch={() => void fetchSteps(journey.id)}
                              instruction="Voir les étapes"
                            />

                            {/* Liste des Étapes */}
                            {activeJourneyId === journey.id && (
                              <section
                                aria-labelledby={`steps-${journey.id}-heading`}
                                className="mt-7 rounded-lg border-2 bg-[#ffffff] px-2 py-3">
                                <div className="space-y-5">
                                  <NavigationHeader
                                    key={journey.id}
                                    isOpen={isStepsOpen}
                                    label="Etapes"
                                    openNav={() => {
                                      setIsStepsOpen(!isStepsOpen)
                                    }}
                                  />
                                  {isStepsOpen &&
                                    steps.map((step) => (
                                      <article
                                        key={step.id}
                                        className="m-4 rounded-lg border-2 border-[#0A184D] bg-[#F4FDFF] p-4 shadow-lg">
                                        <h6 className="pb-4 text-2xl font-medium">
                                          Indice d'étape n°{' '}
                                          {step.stage.stepNumber} :{' '}
                                          {step.name.fr}
                                        </h6>
                                        {/* IMAGE */}
                                        <div className="flex gap-4">
                                          <ImagePreview
                                            label={step.name.fr}
                                            id={step.id}
                                            img={step.content.image[0]}
                                            fetch={() =>
                                              void fetchPieces(step.id)
                                            }
                                            instruction="Voir l'œuvre"
                                          />
                                          {step.description.falc.status
                                            .isCertified ? (
                                            <button
                                              className="flex h-16 items-center gap-2 rounded-xl bg-[#22891F] px-6 text-xl text-white"
                                              aria-label={`Texte validé pour ${step.name.fr}`}>
                                              <CheckIcon className="h-8 w-8" />
                                              <p className="text-xl">
                                                Texte validé
                                              </p>
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => {
                                                handleNavigate(step)
                                              }}
                                              className="duration-5 flex items-center gap-3 rounded-xl border-2 border-[#0A184D] bg-[#bfdcfe] px-6 py-2 text-xl text-[#0A184D] transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#F4FDFF] hover:text-[#0A184D]"
                                              aria-label={`Corriger ${step.name.fr}`}>
                                              <PencilIcon />
                                              <p>Corriger</p>
                                            </button>
                                          )}
                                        </div>

                                        {/* Liste des Œuvres */}
                                        {activeStepId === step.id && (
                                          <section
                                            aria-labelledby={`pieces-${step.id}-heading`}
                                            className="mt-7 rounded-lg border-2 bg-[#ffffff] px-2 py-3">
                                            <div className="space-y-5">
                                              <NavigationHeader
                                                key={step.id}
                                                isOpen={isPiecesOpen}
                                                label="œuvre"
                                                openNav={() => {
                                                  setIsPiecesOpen(!isPiecesOpen)
                                                }}
                                              />
                                              {isPiecesOpen &&
                                                pieces.map((piece) => (
                                                  <article
                                                    key={piece.id}
                                                    className="m-4 rounded-lg border-2 border-[#0A184D] bg-[#F4FDFF] p-4 shadow-lg">
                                                    <h6 className="mb-2 text-xl font-medium">
                                                      {piece.name.fr}
                                                    </h6>
                                                    {/* IMAGE */}
                                                    <div className="flex gap-4">
                                                      <div className="avatar">
                                                        <div className="w-16 rounded-xl">
                                                          <img
                                                            src={
                                                              piece.content
                                                                .image[0]
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      {piece.description.falc
                                                        .status.isCertified ? (
                                                        <button
                                                          className="flex h-16 items-center gap-2 rounded-xl bg-green-600 px-6 text-xl text-white"
                                                          aria-label={`Texte validé pour ${step.name.fr}`}>
                                                          <CheckIcon className="h-8 w-8" />
                                                          <p className="text-xl">
                                                            Texte validé
                                                          </p>
                                                        </button>
                                                      ) : (
                                                        <button
                                                          onClick={() => {
                                                            handleNavigate(
                                                              piece
                                                            )
                                                          }}
                                                          className="duration-5 flex items-center gap-3 rounded-xl border-2 border-[#0A184D] bg-[#bfdcfe] px-6 py-2 text-xl text-[#0A184D] transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#F4FDFF] hover:text-[#0A184D]"
                                                          aria-label={`Corriger ${place.name.fr}`}>
                                                          <PencilIcon />
                                                          <p>Corriger </p>
                                                        </button>
                                                      )}
                                                    </div>
                                                  </article>
                                                ))}
                                            </div>
                                          </section>
                                        )}
                                      </article>
                                    ))}
                                </div>
                              </section>
                            )}
                          </article>
                        ))}
                    </div>
                  </section>
                )}
              </article>
            ))}
        </div>
      </section>
    </div>
  )
}
export { TextList }
