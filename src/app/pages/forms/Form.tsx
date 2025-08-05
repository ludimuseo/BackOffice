import React, { FormEvent, MouseEvent } from 'react'

import Description from '@/app/components/description/Description'
import ClientDropdownList from '@/app/components/forms/dropdownLists/ClientDropdownList'
import JourneyDropdownList from '@/app/components/forms/dropdownLists/JourneyDropdwonList'
import MedalDropdownList from '@/app/components/forms/dropdownLists/MedalDropdownList'
import PlaceDropdownList from '@/app/components/forms/dropdownLists/PlaceDropdownList'
import StepDropdownList from '@/app/components/forms/dropdownLists/StepDropdownList'
import {
  ClientType,
  DescriptionType,
  GetInputConfigType,
  JourneyType,
  MedalType,
  MessageType,
  PieceType,
  PlaceType,
  QuestionType,
  QuizType,
  StepType,
} from '@/types'

import FormFooter from './FormFooter'
import FormHeader from './FormHeader'
import InputArea from './InputArea'
import Timeline from './Timeline'

interface FormProps {
  medal?: MedalType[]
  client?: ClientType[]
  place?: PlaceType[]
  journey?: JourneyType[]
  stepData?: StepType[]
  isAssociated?: boolean //id associé au formulaire en creation
  newIdFromApi?: number
  selectedClientId?: number
  selectedPlaceId?: number
  selectedJourneyId?: number
  showDescription?: boolean
  title: string
  collection?: string
  icon: React.JSX.Element
  handleArrowLeft: () => void
  attributedMedal?: {
    id: string
    name: string
    image: string
    description: string
  }
  handleAttributeMedal?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  medalsData?: { id: string; name: string; image: string }[] | undefined
  getInput: GetInputConfigType[][]
  currentStep: number
  step: number
  message: MessageType
  handleDescription?: () => void
  handlePrevStep: () => void
  handleNextStep: () => void
  handleSubmit: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void
  formData:
    | PlaceType
    | ClientType
    | JourneyType
    | StepType
    | PieceType
    | MedalType
    | QuizType
    | QuestionType
  handleInputChange: (name: string, value: string | boolean) => void
  handleFileUpload?: (
    file: File,
    fileType: string,
    name: string,
    event: MouseEvent<HTMLButtonElement>
  ) => void
  handleSelectMedal?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSelectClient?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSelectPlace?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSelectJourney?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSelectStep?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSubmitDescriptions?: (descriptions: DescriptionType[]) => void
  handleSubmitQuestion?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Form = ({
  medal,
  client,
  place,
  journey,
  stepData,
  isAssociated,
  selectedClientId,
  selectedPlaceId,
  selectedJourneyId,
  showDescription,
  newIdFromApi,
  title,
  collection,
  icon,
  handleArrowLeft,
  getInput,
  currentStep,
  step,
  message,
  handleSubmit,
  formData,
  handleInputChange,
  handleDescription,
  handlePrevStep,
  handleNextStep,
  handleFileUpload,
  handleSelectMedal,
  handleSelectClient,
  handleSelectPlace,
  handleSelectJourney,
  handleSelectStep,
  handleSubmitDescriptions,
  handleSubmitQuestion,
}: FormProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 p-14 sm:grid-cols-1">
      <FormHeader title={title} icon={icon} handleSubmit={handleArrowLeft} />
      <MedalDropdownList
        title={title}
        medal={medal}
        handleSelectMedal={handleSelectMedal}
      />
      <ClientDropdownList
        title={title}
        client={client}
        handleSelectClient={handleSelectClient}
      />
      <PlaceDropdownList
        selectedClientId={selectedClientId}
        handleSelectPlace={handleSelectPlace}
        place={place}
      />
      <JourneyDropdownList
        title={title}
        selectedPlaceId={selectedPlaceId}
        handleSelectJourney={handleSelectJourney}
        journey={journey}
      />
      <StepDropdownList
        title={title}
        handleSelectStep={handleSelectStep}
        selectedJourneyId={selectedJourneyId}
        steps={stepData}
      />

      {/* Timeline */}

      {isAssociated ||
      title === 'Formulaire Client' ||
      title === 'Formulaire Médaille' ? (
        <Timeline
          getInput={getInput}
          currentStep={currentStep}
          step={step}
          message={message}
        />
      ) : (
        <></>
      )}

      {/* InputArea */}

      {isAssociated ||
      title === 'Formulaire Client' ||
      title === 'Formulaire Médaille' ? (
        !showDescription ? (
          <InputArea
            message={message}
            getInput={getInput}
            currentStep={currentStep}
            formData={formData}
            handleSubmit={(event) => {
              handleSubmit(event)
            }}
            handleInputChange={(name, value) => {
              handleInputChange(name, value)
            }}
            handleFileUpload={(file, fileType, name, event) => {
              handleFileUpload?.(file, fileType, name, event)
            }}
            handleSubmitButton={handleSubmitQuestion}
          />
        ) : (
          <Description
            handleSubmitDescriptions={(descriptions) => {
              handleSubmitDescriptions?.(descriptions)
            }}
            getInput={getInput}
            currentStep={currentStep}
            newIdFromApi={newIdFromApi ?? 0}
            collection={collection ?? ''}
          />
        )
      ) : (
        <></>
      )}

      {/* FormFooter */}

      {isAssociated ||
      title === 'Formulaire Client' ||
      title === 'Formulaire Médaille' ? (
        <FormFooter
          title={title}
          message={message}
          handleDescription={handleDescription}
          showDescription={showDescription ?? false}
          currentStep={currentStep}
          step={step}
          handlePrevStep={() => {
            handlePrevStep()
          }}
          handleNextStep={handleNextStep}
          handleSubmit={(event) => {
            handleSubmit(event)
          }}
          icon={
            <div className="flex flex-row items-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#4285F4" />
                <path
                  d="M12 6L14 10H18L15 13L17 17L12 15L7 17L9 13L6 10H10L12 6Z"
                  fill="white"
                />
              </svg>
            </div>
          }
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default Form
