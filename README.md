# Project Dedale [BackOffice]

## Description

> Back-office of the mobile application: "**Dédale**"

## About

> [@Dédale][UrlPj] Project By the association:
> [_Ludi Museo_](https://www.ludimuseo.fr/lassociation/) (French URL)

[UrlPj]: https://github.com/ludimuseo/backoffice/

## Team! 🥇

| ~                                                                                                            | Contributors               |
| ------------------------------------------------------------------------------------------------------------ | -------------------------- |
| <img src="https://avatars.githubusercontent.com/u/128374528?v=4" width="50" alt="@A-Fidele avatar" />        | [@A-Fidele][User01]        |
| <img src="https://avatars.githubusercontent.com/u/167294285?v=4" width="50" alt="@Maeva-RODRIGUES avatar" /> | [@Maeva-RODRIGUES][User02] |
| <img src="https://avatars.githubusercontent.com/u/91600327?v=4" width="50" alt="@Eternal-Grace avatar" />    | [@Eternal-Grace][User03]   |
| <img src="https://avatars.githubusercontent.com/u/13797688?v=4" width="50" alt="@Okkunsama avatar" />        | [@Okkunsama][User04]       |
| <img src="https://avatars.githubusercontent.com/u/128263899?v=4" width="50" alt="@Lily87280 avatar" />       | [@Lily87280][User05]       |
| <img src="https://avatars.githubusercontent.com/u/151648856?v=4" width="50" alt="@Mouad-Maataoui avatar" />  | [@Mouad-Maataoui][User06]  |

[User01]: https://github.com/A-Fidele/
[User02]: https://github.com/Maeva-RODRIGUES/
[User03]: https://github.com/Eternal-Grace/
[User04]: https://github.com/okkunsama/
[User05]: https://github.com/Lily87280/
[User06]: https://github.com/Mouad-Maataoui/

## Install

1 - Execute git clone script:

```sh
git clone git@github.com:ludimuseo/backoffice.git
```

2 - Do not forget to switches to your developpment branch

- `git branch -a` => To view all branches
- `git checkout [BRANCH NAME]` => To enter an existing branch
- `git checkout -b [BRANCH NAME]` => To create and enter a **NEW** branch

3 - Install all dependancies at the root of the project

```sh
yarn install
```

~this~ (this also updates yarn locally to version @4.5.1)

> Note: ⚠️ If an error occurs, please refer to the official documentation at
> [yarnpkg.com > installation](https://yarnpkg.com/getting-started/install).

4 - Generate a `.env.development` or `.env` file at the root of the project.

```sh
echo "NODE_ENV=\"development\"" >> .env.development
```

5 - Inside the file, add the following environment variables then set their
values :

```env
NODE_ENV="development"

VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_MEASURE_ID=""
VITE_FIREBASE_MSID=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
```

6 - 🎉 DONE! You can now launch the project:

```sh
yarn dev --open
```
