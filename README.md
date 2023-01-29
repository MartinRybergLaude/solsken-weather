<p align="center">
   <img src="https://github.com/MartinRybergLaude/Solsken-PWA/blob/master/public/solsken.svg?raw=true" width="80" alt="">
</p>
<h1 align="center">
  Solsken
</h1>
<p align="center">
  A progressive web app to cover all your weather needs, built with ViteJS using Reactjs with Typescript.
</p>
<p align="center">
    <a href="https://solsken.app">Live</a>
  • <a href="https://play.google.com/store/apps/details?id=app.solsken.twa">Playstore</a>
  • <a href="https://mrlaude.com/blog/solsken-app">Blog post</a>
</p>

## 💡 Introduction

The goal of Solsken is to be an effective, usable cross-platform weather app with worldwide support, presenting **all** information the APIs provide. Mobile use is prioritized heavily, and the UI and UX are built to provide an experience as close to native as possible.

Solsken allows use of two different **weather providers:**

- [SMHI](https://opendata.smhi.se/) (for Fennoscandian countries)
- [YR.no](https://developer.yr.no/) (for worldwide use)

Additionally, the app employs an efficient caching system in accordance with respective weather provider's usage policy.

## ✅ Prerequisites

- Node.js
- pnpm

## 🚀 Quick start

1.  **Clone this repo**

    Use git to clone this repo, or download it.

    ```shell
    # Clone the repo to a local directory
    git clone https://github.com/MartinRybergLaude/Solsken-web.git
    ```

2.  **Install**

    Open cmd, terminal or powershell in the cloned direcory and install

    ```shell
    cd Solsken-web
    pnpm i
    ```

3.  **Start the app**

    Start the app on `http://localhost:5173`

    ```shell
    pnpm dev
    ```

## 🧐 Technologies

- Vite.js
- React.js
- Typescript
- PostCSS
- CSS modules
- Framer Motion
- SWR

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
