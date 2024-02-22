import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AddContact from './Components/AddContact/AddContact'
import ContactHome from './Components/ContactHome/ContactHome'
import MasterLayout from './Components/Shared/MasterLayout/MasterLayout'
import NotFound from './Components/Shared/NotFound/NotFound'
import { ToastContainer } from 'react-toastify'




function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (

          <MasterLayout />

      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <ContactHome /> },
        { path: "add-contact", element: <AddContact /> },
      

     
      ],
    },
 

  ]);
  return (
    <div className='wrapper'>
    
    <ToastContainer
        theme="colored"
        autoClose={2000}
        position="top-right"
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
     <RouterProvider router={routes} />
    </div>
  )
}

export default App
