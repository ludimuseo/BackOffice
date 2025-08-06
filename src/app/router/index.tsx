import { createBrowserRouter, Navigate } from 'react-router-dom'

import LayoutAuth from '@/app/layouts/LayoutAuth'
import LayoutDefault from '@/app/layouts/LayoutDefault'
import RouteAuth from '@/app/middleware/RouteAuth'
import RouteGuest from '@/app/middleware/RouteGuest'
import PageError from '@/app/pages/PageError'

type ModuleKeys = keyof typeof modules

const modules = {
  Signin: () => import('@/app/pages/auth/Signin'),
  Dashboard: () => import('@/app/pages/dashboard'),
  User: () => import('@/app/pages/user'),
  UserProfile: () => import('@/app/pages/user/Profile'),
  FAQ: () => import('@/app/pages/faq'),
  UserSettings: () => import('@/app/pages/user/Settings'),
  UserCreate: () => import('@/app/pages/user/Create'),
  FormMenu: () => import('@/app/pages/forms/FormMenu/FormMenu'),
  TextList: () => import('@/app/pages/talos/TextList'),
  ValidateText: () => import('@/app/pages/talos/ValidateText'),
  TalosHome: () => import('@/app/pages/talos/TalosHome'),
  TalosInterface: () => import('@/app/pages/talos/TalosInterface'),
  ClientsList: () => import('@/app/pages/users'),
  AccessibilityDoc: () => import('@/app/pages/documentaion/AccessibilityDoc'),
  FormClient: () => import('@/app/pages/forms/FormClient/FormClient'),
  FormPlace: () => import('@/app/pages/forms/FormPlace/FormPlace'),
  FormJourney: () => import('@/app/pages/forms/FormJourney/FormJourney'),
  FormStep: () => import('@/app/pages/forms/FormStep/FormStep'),
  FormPiece: () => import('@/app/pages/forms/FormPiece/FormPiece'),
  FormGame: () => import('@/app/pages/forms/FormGame/FormGame'),
  FormQuestion: () => import('@/app/pages/forms/FormQuestion/FormQuestion'),
  FormMedal: () => import('@/app/pages/forms/FormMedal/FormMedal'),
  Users: () => import('@/app/pages/users'),
  UserEdit: () => import('@/app/pages/users/Edit'),
  Places: () => import('@/app/pages/places'),
  Contributors: () => import('@/app/pages/contributors/Contributor'),
}

const lazyLoad = (key: keyof typeof modules, exportName: string) => ({
  async lazy() {
    const component = await modules[key]()
    return { Component: component[exportName as keyof typeof component] }
  },
})

const authRoutes = [
  { path: '/auth/signin', ...lazyLoad('Signin', 'AuthSignIn') },
]

const defaultRoutes: [string, ModuleKeys, string][] = [
  ['/', 'Dashboard', 'Dashboard'],
  ['/user', 'User', 'User'],
  ['/user/profile', 'UserProfile', 'UserProfile'],
  ['/faq', 'FAQ', 'FAQ'],
  ['/user/settings', 'UserSettings', 'UserSettings'],
  ['/user/create', 'UserCreate', 'UserCreate'],
  ['/form', 'FormMenu', 'FormMenu'],
  ['/textList', 'TextList', 'TextList'],
  ['/validateText', 'ValidateText', 'ValidateText'],
  ['/talos', 'TalosHome', 'TalosHome'],
  ['/interface', 'TalosInterface', 'TalosInterface'],
  ['/clientsList', 'ClientsList', 'ClientsList'],
  ['/accessibilitydoc', 'AccessibilityDoc', 'AccessibilityDoc'],
  ['/form/client', 'FormClient', 'FormClient'],
  ['/form/place', 'FormPlace', 'FormPlace'],
  ['/form/journey', 'FormJourney', 'FormJourney'],
  ['/form/step', 'FormStep', 'FormStep'],
  ['/form/piece', 'FormPiece', 'FormPiece'],
  ['/form/game', 'FormGame', 'FormGame'],
  ['/form/question', 'FormQuestion', 'FormQuestion'],
  ['/form/medal', 'FormMedal', 'FormMedal'],
  ['/users', 'Users', 'Users'],
  ['/users/:id', 'UserEdit', 'UserEdit'],
  ['/places', 'Places', 'Places'],
  ['/contributors', 'Contributors', 'Contributors'],
]
const mappedRoutes = defaultRoutes.map(([path, key, exportName]) => ({
  path,
  ...lazyLoad(key, exportName),
}))

const routes = [
  {
    id: 'root',
    errorElement: <PageError />,
    children: [
      {
        element: (
          <RouteAuth role={null}>
            <LayoutDefault />
          </RouteAuth>
        ),
        children: mappedRoutes,
      },
      {
        element: (
          <RouteGuest>
            <LayoutAuth />
          </RouteGuest>
        ),
        children: [
          {
            path: '/auth/',
            element: <Navigate to={{ pathname: '/auth/signin' }} />,
          },
          ...authRoutes,
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routes, {
  hydrationData: {},
})

export { router }
