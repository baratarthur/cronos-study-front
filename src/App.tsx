import { DisciplinesList } from './components/molecules/disciplines-list/disciplines-list'
import { ToastContainer } from 'react-toastify'

import { TodaysTopics } from './components/molecules/todays-topics/todays-topics'

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  

  return (
    <article>
      <header>
        <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"/>
        <h1>Cronos Study</h1>
      </header>
      <div className='body'>
        <DisciplinesList />
        <TodaysTopics />
      </div>
    </article>
  )
}

export default App
