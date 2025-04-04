export interface User {
  id: string
  pseudo: string
  name: string
  firstname: string
  email: string
  role: 'SUPERADMIN' | 'ADMIN' | 'REFERENT' | 'CONTRIBUTOR'
  token: string
  password: string
}

export const getSelectConfig = [
  {
    id: '00',
    label: 'SUPERADMIN',
    section: 'profile',
    field: 'role',
  },
  {
    id: '01',
    label: 'ADMIN',
    section: 'profile',
    field: 'role',
  },
  {
    id: '02',
    label: 'REFERENT',
    section: 'profile',
    field: 'role',
  },
  {
    id: '03',
    label: 'CORRECTOR',
    section: 'profile',
    field: 'role',
  },
]

export const getInputConfig = [
  {
    id: 10,
    label: 'Pseudo:',
    section: 'profile',
    field: 'pseudo',
    placeholder: "Entre le pseudo de l'utilisateur",
    type: 'text',
    maxLength: 50,
  },
  {
    id: 11,
    label: 'E-mail:',
    section: 'profile',
    field: 'email',
    placeholder: "Entre l'e-mail de l'utilisateur",
    type: 'text',
    // eslint-disable-next-line no-useless-escape
    pattern: '[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+',
  },
  {
    id: 12,
    label: 'Prénom:',
    section: 'profile',
    field: 'firstname',
    placeholder: "Entre le prenom de l'utilisateur",
    type: 'text',
    maxLength: 50,
  },
  {
    id: 13,
    label: 'Nom:',
    section: 'profile',
    field: 'name',
    placeholder: "Entre le nom de l'utilisateur",
    type: 'text',
    maxLength: 50,
  },
  {
    id: 14,
    label: 'Mot de passe:',
    section: 'profile',
    field: 'password',
    placeholder: "Entre le mot de passe de l'utilisateur",
    type: 'password',
    minLength: 6,
    maxLength: 50,
  },
  {
    id: 15,
    label: 'Confirmer le mot de passe',
    section: 'profile',
    field: 'confirmedPassword',
    placeholder: 'Confirmer le mot de passe',
    type: 'password',
    minLength: 6,
    maxLength: 50,
  },
]
