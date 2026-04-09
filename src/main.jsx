import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Users from './components/users/Users.jsx';
import UpdateUser from './components/UpdateUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/update/:id", // এই :id দিয়ে আমরা ডাইনামিক আইডি ধরবো
        element: <UpdateUser />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
