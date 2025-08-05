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

  {
    id: '1',
    title: 'DOCUMENTATION',
    ariaLabel: 'Accéder à documentation pour developpeurs',
    subTitle: 'Documentation accessibilité développeur',
    image: 'ACCESSIBILITY',
    imageAlt: 'null',
    role: ['OWNER', 'DEVELOPPER'],
    route: '/accessibilitydoc',
  },
]
