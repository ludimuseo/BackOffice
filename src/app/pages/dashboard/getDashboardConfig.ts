export interface DashboardConfig {
  id: string
  title: string
  ariaLabel: string
  subTitle: string
  image: string
  imageAlt: string
  role: string[]
  route: string
}

export const getDashboardConfig: DashboardConfig[] = [
  {
    id: '0',
    title: 'CREATION DE PARCOURS',
    ariaLabel: 'Accéder à la création de parcours',
    subTitle: 'Créer les parcours et jeux pas à pas.',
    image: 'DEDALE_MOBILE',
    imageAlt: 'Formulaires',
    role: ['OWNER', 'ADMIN', 'SUPERADMIN', 'DEVELOPPER'],
    route: '/form',
  },
  // {
  //   id: '2',
  //   title: 'LISTES',
  //   ariaLabel: 'CONSULTER LES CLIENTS',
  //   subTitle: 'Accéder a la liste des clients',
  //   image: 'LISTS',
  //   imageAlt: 'Liste clients',
  //   role: ['OWNER', 'ADMIN', 'SUPERADMIN', 'DEVELOPPER'],
  //   route: '/clientsList',
  // },
  // {
  //   id: '1',
  //   title: 'INTERFACE TALOS',
  //   ariaLabel: "Accéder à l'interface Talos",
  //   subTitle: 'Correction et lecture de texte.',
  //   image: 'TALOS',
  //   imageAlt: 'Talos',
  //   role: ['OWNER', 'SUPERADMIN', 'DEVELOPPER', 'REFERENT', 'CORRECTOR'],
  //   route: '/talos',
  // },
  {
    id: '3',
    title: 'DOCUMENTATION',
    ariaLabel: 'Accéder à documentation pour developpeurs',
    subTitle: 'Documentation accessibilité développeur',
    image: 'ACCESSIBILITY',
    imageAlt: 'null',
    role: ['OWNER', 'DEVELOPPER'],
    route: '/accessibilitydoc',
  },
]
