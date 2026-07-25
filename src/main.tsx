import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.tsx'
import { Provider } from 'react-redux'
import {store} from "./redux/Store.ts"
import { Authprovider } from './pages/context/Contextapi.tsx'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <StrictMode>
      <Authprovider>
            <App />

      </Authprovider>
  </StrictMode>,
  </Provider>
 
)
