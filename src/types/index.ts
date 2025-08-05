import type { StateAlert } from '@service/redux/slices/reducerAlert'
import type { StateAuth } from '@service/redux/slices/reducerAuth'
import type { StateDictionnary } from '@service/redux/slices/reducerDictionary'
import type { StateTheme } from '@service/redux/slices/reducerTheme'
import { Timestamp } from 'firebase/firestore'
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactElement,
} from 'react'

/* Redux Root State */
export interface State {
  auth: StateAuth
  theme: StateTheme
  alert: StateAlert
  dictionary: StateDictionnary
}

/* USER */
export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  REFERENT = 'REFERENT',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export interface User {
  //id: string
  pseudo: string
  name?: string
  firstname?: string
  email: string
  role: UserRole
  token: string
  //password: string
}

/* WORDPASS */
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface UserSettings {
  isContrast: boolean
  isFalc: boolean
  avatar: string
  language: string
  isTutorial: boolean
}

/* THEME */
export enum Theme {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  SYSTEM = 'SYSTEM',
}

export type SvgProps = ComponentProps<'svg'>

export type InputProps = {
  uid: string
  label: string
  errors: string[]
  icon?: ReactElement
  insideForm: boolean
} & ComponentPropsWithoutRef<'input'>

export type DropdownProps = {
  uid: string
  label: string
  insideForm?: boolean
  errors: string[]
  options?: string[]
  placeholder?: string
} & ComponentPropsWithoutRef<'select'>

/* ON_SUBMIT_FORM_MESSAGE */
export interface MessageType {
  info: string
  result: boolean
}

/* FORMDATA */
export interface FormDataType {
  id: number
  clientID: number
  medalId: number
  name: string
  image: string
  type: string
  address: string
  city: string
  country: string
  postal: string
  location_required: boolean
  lat: number
  lon: number
  isActive: boolean
  isPublished: boolean
  [key: string]: string | boolean | number
}

export type InputValue = string | boolean | number

export interface GetInputConfigType {
  accessType?: string
  fileType?: string
  id: string
  label: string
  language?: string
  isLocationRequired?: boolean
  mode?: string
  name: string
  option?: string[]
  placeholder?: string
  required: boolean
  rows?: number | undefined
  rightSideVisible?: boolean | undefined
  section?: string
  sectionLabel: string
  translate?: boolean
  type?: string
}

/* TYPE FOR TALOS */
export type EntityWithId<T> = T & { id: string; collection: string }

/* TYPE GENERIQUE */

export type T = Record<
  string,
  | string
  | Address
  | Compagny
  | Contact
  | Status
  | Name
  | Image
  | Coords
  | DescriptionType
  | Standard
  | Falc
  | Audio
  | Content
  | Stage
  | Response
  | Explanation
>

interface Contact {
  name: string
  email: string
  tel: string
  note: string
}

interface Address {
  address: string
  postal: string
  city: string
  country: string
}
interface Compagny {
  name: string
  siret: string
  tva: string
  type: string
  website: string
}

interface Status {
  isActive: boolean //ACTIVER/DESACTIVER LE CLIENT
  isPublished?: boolean
}

interface Name {
  fr: string
  en: string
}
interface Coords {
  lat: number
  lon: number
  isLocationRequired: boolean
}
interface Standard {
  fr: string
  en: string
}

interface Falc {
  fr: string
  en: string
  falcCertified?: string
  userId?: string
  status?: CertifiedTxt
}
interface CertifiedTxt {
  isValidate: boolean
  isCertified: boolean
  certifiedDate: Timestamp | null
  isCorrected: boolean
}
interface Audio {
  standard: {
    fr: string
    en: string
  }
  falc: {
    fr: string
    en: string
    falcCertified?: string
    userId?: string
  }
}
interface Image {
  image: string
}
interface Content {
  image: string[]
  type?: string
  level?: string
}
interface Response {
  responseTrue: {
    standard: Standard
    falc: Falc
  }
  response1: {
    standard: Standard
    falc: Falc
  }
  response2: {
    standard: Standard
    falc: Falc
  }
}
interface Explanation {
  responseTrue: {
    standard: Standard
    falc: Falc
  }
  response1: {
    standard: Standard
    falc: Falc
  }
  response2: {
    standard: Standard
    falc: Falc
  }
}
interface Stage {
  stepNumber: number
}

/* CLIENT */
export interface ClientTypeApi {
  id?: number
  name?: string
  company: {
    name: string
    siret: string
    tva: string
    type: string
    website: string
  }
  address: {
    address: string
    postal: string
    city: string
    country: string
  }
  contact: {
    name: string
    email: string
    tel: string
    note: string
  }
  status: {
    isActive: boolean //ACTIVER/DESACTIVER LE CLIENT
  }
}

export interface ClientType {
  [key: string]: string | number | boolean
  id: number
  name: string
  siret: string
  tva: string
  type: string
  website: string
  address: string
  postal: string
  city: string
  country: string
  contact: string
  email: string
  tel: string
  note: string
  isActive: boolean //ACTIVER/DESACTIVER LE CLIENT
}

export interface PlaceType {
  id: number
  clientId: number
  medalId: number
  image: string
  type: string
  address: string
  city: string
  country: string
  postal: string
  location_required: boolean
  lat: number
  lon: number
  name: string
  isActive: boolean
  isPublished: boolean
}
export interface JourneyType {
  id: number
  placeId: number
  medalId: number
  duration: number
  image: string
  type: string
  address: string
  city: string
  country: string
  postal: string
  location_required: boolean
  lat: number
  lon: number
  name: string
  isActive: boolean
  isPublished: boolean
}

export interface StepType {
  id: number
  journeyId: number
  medalId: number
  name: string
  image: string
  address: string
  city: string
  country: string
  postal: string
  lat: number
  lon: number
  location_required: boolean
  stepNumber: number
  isActive: boolean
  isPublished: boolean
}
export interface PieceType {
  id: number
  stepId: number
  name: string
  image: string
  isActive: boolean
  isPublished: boolean
}

/* DESCRIPTION */

export interface DescriptionType {
  collection: string
  collectionId: number
  id: string
  language: string
  order: number
  text: string
  isFalc: boolean
  isCertifiedFalc: boolean
  isValidate: boolean
  certifiedDate: Date | null
  certifiedBy: number
  image: string
  audio: string
}

export interface QuizType {
  id: number
  stepId: number
  level: string
  name: string
  isActive?: string
}
export interface QuestionType {
  id: number
  stepId: number
  image: string
  audio: string
  level: string
  languageCode: string
  question: string
  responseTrue: string
  response2: string
  response3: string
  explanationResponseTrue: string
  explanationResponse2: string
  explanationResponse3: string
  isValidate: boolean
  certifiedBy: number
  isFalc: boolean
  isCertifiedFalc?: boolean
}

export interface MedalType {
  id: number
  name: string
  image: string
  type: string //medaille de type lieu parcours ou etape
  level: string
}
