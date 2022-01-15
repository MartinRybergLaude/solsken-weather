<p align="center">
   <img src="https://github.com/MartinRybergLaude/Solsken-PWA/blob/master/public/logo512.png?raw=true" width="64" title="hover text">
</p>
<h1 align="center">
  Solsken PWA
</h1>
<p align="center">
  A progressive web app to cover all your weather needs, built with React using Typescript.
</p>
<p align="center">
    <a href="https://solsken.app">Website</a>
  • <a href="https://play.google.com/store/apps/details?id=app.solsken.twa">Playstore</a>
  • <a href="https://mrlaude.com/work/solsken">Case study</a>
</p>

## Introduction

The goal of Solsken is to be an effective, usable cross-platform weather app with worldwide support, presenting **all** information the APIs provide. Mobile use is prioritized heavily, and the UI and UX are built to provide an experience as close to native as possible. 

Solsken allows use of two different **weather providers:** 
- [SMHI](https://opendata.smhi.se/) (for Fennoscandian countries)
- [YR.no](https://developer.yr.no/) (for worldwide use)
 
Additionally, the app employs an efficient caching system in accordance with respective weather provider's usage policy.

## 📄 Prerequisites

- NodeJS
- yarn

## 🚀 Quick start

1.  **Clone this repo**

    Use git to clone this repo, or download it.

    ```shell
    # Clone the repo to a local directory
    git clone https://github.com/MartinRybergLaude/Solsken-web.git
    ```

2.  **Install**

    Add a .env file in the root directory and add this to it:

    ```shell
    REACT_APP_VERSION=$npm_package_version
    REACT_APP_NAME=$npm_package_name
    ```

    Then open cmd, terminal or powershell in the cloned direcory and install

    ```shell
    cd Solsken-web
    yarn
    ```

3.  **Start the app**

    Start the app on `http://localhost:8000`

    ```shell
    yarn start
    ```

## 🧐 Technologies

- React
- Typescript
- Sass
- CSS-modules
- Framer Motion

## 📁 Directory structure

- Package by feature as far as possible

## 📑 Code conventions

- Functional components
- Props & state interface above components
- Async/await preferred

## 📑 Git conventions

- Commit messages are written in <a href="https://en.wikipedia.org/wiki/Imperative_mood">imperative mood</a>
- Commit messages follow the following structure:
  Type: Short title
  Optional explanatory body
- Micro-commits are preferred
