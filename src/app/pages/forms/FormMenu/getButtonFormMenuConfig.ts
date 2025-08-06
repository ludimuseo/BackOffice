interface FormMenu {
  id: string
  title: string
  description: string
  alt: string
  image: string
  route: string
}

import game from '/src/assets/imgs/formMenu/icone-jeux.png'
import place from '/src/assets/imgs/formMenu/icone-lieu.png'
import step from '/src/assets/imgs/formMenu/icone-parcours.png'
import piece from '/src/assets/imgs/formMenu/icone-piece.png'
import question from '/src/assets/imgs/formMenu/icone-quiz.png'
import client from '/src/assets/imgs/formMenu/icone-utilisateur.png'
import medal from '/src/assets/imgs/formMenu/medaille-loutre.png'
import journey from '/src/assets/imgs/formMenu/parcours-outdoor.webp'

export const getButtonFormMenuConfig: FormMenu[] = [
  {
    id: '0',
    title: 'Client',
    description: 'Créer un client: entreprise, association, particulier',
    alt: 'formulaire client',
    image: client,
    route: '/form/client',
  },
  {
    id: '1',
    title: 'Lieu',
    description: 'Créer un Lieu de type Musée, Parc, Chateau, ou autre...',
    alt: 'formulaire lieu',
    image: place,
    route: '/form/place',
  },
  {
    id: '2',
    title: 'Parcours',
    description: 'Créer un parcours lié au lieu',
    alt: 'formulaire parcours',
    image: journey,
    route: '/form/journey',
  },
  {
    id: '3',
    title: 'Etape',
    description: 'Créer une étape de parcours',
    alt: 'formulaire étape',
    image: step,
    route: '/form/step',
  },
  {
    id: '4',
    title: 'Oeuvre',
    description: 'Créer une oeuvre en rapport à une étape',
    alt: 'formulaire oeuvre',
    image: piece,
    route: '/form/piece',
  },
  {
    id: '5',
    title: 'Jeu',
    description: "Créer le quiz de l'étape en ayant l'oeuvre comme thème",
    alt: 'formulaire jeu',
    image: game,
    route: '/form/game',
  },
  {
    id: '6',
    title: 'Question (Quiz)',
    description: "Créer le quiz de l'étape en ayant l'oeuvre comme thème",
    alt: 'formulaire question',
    image: question,
    route: '/form/question',
  },
  {
    id: '7',
    title: 'Médaille',
    description: "Créer une Médaille de lieu, de parcours ou d'étape",
    alt: 'formulaire médaille',
    image: medal,
    route: '/form/medal',
  },
]
