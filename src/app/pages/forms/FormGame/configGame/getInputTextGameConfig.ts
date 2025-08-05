import { GetInputConfigType } from '@/types'

export const getInputQuizConfig: GetInputConfigType[][] = [
  [
    {
      id: '1',
      label: 'Niveau du Quiz',
      name: 'level',
      option: ['NOVICE', 'INTERMEDIARE', 'EXPERT'],
      placeholder: 'Selectionnez le niveau du jeu',
      required: true,
      sectionLabel: 'Type de jeu',
      translate: false,
    },
    {
      id: '0',
      label: 'Titre du Quiz',
      name: 'name',
      placeholder: 'Entrez le titre du Quiz',
      required: true,
      sectionLabel: 'Titre du Quiz',
      translate: true,
      type: 'text',
    },
  ],
]

export const getInputQuestionConfig: GetInputConfigType[][] = [
  //@[
  //   {
  //     id: '71',
  //     label: 'Saisir la langue',
  //     name: 'languageCode',
  //     option: ['fr', 'en'],
  //     placeholder: 'Entrez la langue',
  //     required: true,
  //     sectionLabel: 'Option langue & lecture',
  //     translate: true,
  //   },
  //   {
  //     id: '72',
  //     label: 'Lecture Falc:',
  //     name: 'isFalc',
  //     placeholder: 'Cochez',
  //     required: true,
  //     sectionLabel: 'Lecture',
  //     translate: true,
  //     type: 'checkbox',
  //   },
  // ],
  [
    {
      id: '30',
      accessType: 'image/*',
      fileType: 'image',
      label: 'Image',
      name: 'image',
      placeholder: 'Telecharger l image du jeu',
      required: false,
      sectionLabel: 'Image & Audio',
      type: 'file',
    },

    {
      id: '13',
      accessType: 'audio/*',
      fileType: 'audio',
      label: 'Audio',
      name: 'audio',
      placeholder: 'Telecharger l audio du quiz',
      required: false,
      sectionLabel: 'Image & Audio',
      type: 'file',
    },
  ],
  [
    {
      id: '31',
      label: 'Question',
      name: 'question',
      placeholder: 'Entrez la question du quiz',
      required: false,
      rows: 1,
      sectionLabel: 'Question',
      translate: true,
      type: 'text',
    },
  ],
  [
    //REPONSE VRAI
    {
      id: '50',
      label: 'Réponse VRAIE',
      name: 'responseTrue',
      placeholder: 'Entrez la réponse VRAIE du quiz',
      required: false,
      sectionLabel: 'Réponse VRAIE',
      translate: true,
      type: 'text',
    },
    //EXPLICATION REPONSE VRAI
    {
      id: '55',
      label: 'Explication réponse VRAIE',
      name: 'explanationResponseTrue',
      placeholder: "Entrez l'explication de la réponse VRAIE",
      rows: 10,
      required: false,
      sectionLabel: 'Explication VRAIE',
      type: 'text',
    },
  ],

  [
    //REPONSE FAUSSE 1
    {
      id: '60',
      label: 'Réponse FAUSSE n°1',
      name: 'response2',
      placeholder: 'Entrez la fausse réponse n°1 du quiz',
      required: false,
      sectionLabel: 'Réponse FAUSSE n°1',
      translate: true,
      type: 'text',
    },
    //EXPLICATION REPONSE FAUSSE 1
    {
      id: '61',
      label: 'Explication FAUSSE n°1',
      name: 'explanationResponse2',
      placeholder: 'Entrez la réponse FAUSSE n°1',
      required: false,
      rows: 10,
      sectionLabel: 'ExplicationFAUSSE n°1',
      translate: true,
      type: 'text',
    },
  ],

  [
    //REPONSE FAUSSE 2
    {
      id: '62',
      label: 'Réponse FAUSSE n°2',
      name: 'response3',
      placeholder: 'Entrez la fausse réponse n°2 du quiz',
      required: false,
      sectionLabel: 'Réponse FAUSSE n°2',
      translate: true,
      type: 'text',
    },
    //EXPLICATION REPONSE FAUSSE 2
    {
      id: '63',
      label: 'Explication FAUSSE n°2',
      name: 'explanationResponse3',
      placeholder: 'Entrez la réponse FAUSSE n°2',
      required: false,
      rows: 10,
      sectionLabel: 'ExplicationFAUSSE n°2',
      translate: true,
      type: 'text',
    },
  ],
  [
    {
      id: '70',
      label: 'Valider la Question',
      name: 'name',
      placeholder: 'Entrez le titre du Quiz',
      required: true,
      sectionLabel: 'Valider',
      translate: true,
      type: 'button',
    },
  ],
]
