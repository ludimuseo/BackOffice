interface FormMenu {
  id: string
  title: string
  description: string
  alt: string
  image: string
  route: string
}

const client = '/src/assets/imgs/formMenu/icone-utilisateur.png'

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
    image: '/src/assets/imgs/formMenu/icone-lieu.png',
    route: '/form/place',
  },
  {
    id: '2',
    title: 'Parcours',
    description: 'Créer un parcours lié au lieu',
    alt: 'formulaire parcours',
    image: '/src/assets/imgs/formMenu/icone-parcours.png',
    route: '/form/journey',
  },
  {
    id: '3',
    title: 'Etape',
    description: 'Créer une étape de parcours',
    alt: 'formulaire étape',
    image: '/src/assets/imgs/formMenu/icone_etape.png',
    route: '/form/step',
  },
  {
    id: '4',
    title: 'Oeuvre',
    description: 'Créer une oeuvre en rapport à une étape',
    alt: 'formulaire oeuvre',
    image: '',
    route: '/form/piece',
  },
  {
    id: '5',
    title: 'Jeu',
    description: "Créer le quiz de l'étape en ayant l'oeuvre comme thème",
    alt: 'formulaire jeu',
    image: '/src/assets/imgs/formMenu/icone-jeux.png',
    route: '/form/game',
  },
  {
    id: '6',
    title: 'Question (Quiz)',
    description: "Créer le quiz de l'étape en ayant l'oeuvre comme thème",
    alt: 'formulaire question',
    image: '',
    route: '/form/question',
  },
  {
    id: '7',
    title: 'Médaille',
    description: "Créer une Médaille de lieu, de parcours ou d'étape",
    alt: 'formulaire médaille',
    image: '',
    route: '/form/medal',
  },
]
