import './style.css'
import '@gwlab/mouse-follower/dist/css/mouse-follower.css'
import MouseFollower from '@gwlab/mouse-follower'
import gsap from 'gsap'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

MouseFollower.registerGSAP(gsap)
const _mouseFollower = new MouseFollower({
  className: 'mf-cursor -only-bg-exclusion',
})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <p>
      Sum of 2 + 5 is
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
