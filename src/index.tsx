import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import App from './App'
import './styles.css'

const rootElement: HTMLElement | null = document.getElementById('root')
if (rootElement) {
  const root: Root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
