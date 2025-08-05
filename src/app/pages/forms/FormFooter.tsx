import React, { FormEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router'

import { ArrowLeftIcon } from '@/app/components'
import { ArrowRightIcon } from '@/app/components/ui/icons/ArrowRightIcon'
import { CheckIcon } from '@/app/components/ui/icons/CheckIcon'
import { MessageType } from '@/types'

interface FormFooterProps {
  title: string
  message: MessageType
  handleDescription?: () => void
  showDescription: boolean
  currentStep: number
  step: number
  handlePrevStep: () => void
  handleNextStep: () => void
  handleSubmit: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void
  icon?: React.JSX.Element
}

const FormFooter = ({
  title,
  message,
  handleDescription,
  showDescription,
  currentStep,
  step,
  handlePrevStep,
  handleNextStep,
  handleSubmit,
  icon,
}: FormFooterProps) => {
  const navigate = useNavigate()

  console.log('FORMFOOTER showDescription: ', showDescription)

  return (
    <div className="dark:border-strokedark dark:bg-boxdark mt-5 flex flex-col rounded-sm px-20">
      <div className="flex flex-row justify-center">
        {message.result ? (
          <button
            className="mx-8 mb-8 mt-8 flex justify-center rounded-xl bg-blue-900 p-3 font-bold text-white hover:bg-opacity-100"
            onClick={() => {
              if (!showDescription && title !== 'Formulaire Client') {
                handleDescription?.()
              } else {
                void navigate('/form')
              }
            }}>
            {!showDescription && title !== 'Formulaire Client' ? (
              icon && icon
            ) : (
              <></>
            )}
            {!showDescription && title !== 'Formulaire Client' ? (
              <p className="ml-2 flex items-center font-inclusive text-xl">
                Ajouter les descriptions
              </p>
            ) : (
              <p className="font-inclusive text-xl">Retour au Menu</p>
            )}
          </button>
        ) : currentStep < step - 1 ? (
          <>
            {currentStep > 0 && (
              <div className="mr-10">
                <button
                  className="btn btn-primary font-inclusive text-xl"
                  onClick={handlePrevStep}>
                  <ArrowLeftIcon className="w-8" />
                  {`Précédent`}
                </button>
                <br />
              </div>
            )}
            <button
              className="btn btn-primary font-inclusive text-xl"
              onClick={handleNextStep}>
              {`Suivant `}
              <ArrowRightIcon className="w-8" />
            </button>
          </>
        ) : (
          <div className="flex flex-row">
            <button
              className="btn btn-primary mr-10 font-inclusive text-xl"
              onClick={handlePrevStep}>
              <ArrowLeftIcon className="w-8" />
              {`Précédent`}
            </button>
            <br />
            <button
              className="btn btn-secondary"
              onClick={(event) => {
                handleSubmit(event)
              }}>
              <p className="font-inclusive text-xl">Valider</p>
              <CheckIcon className="h-7 w-7" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormFooter
