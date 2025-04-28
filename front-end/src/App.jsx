import {
  createBrowserRouter,
  RouterProvider} 
  from 'react-router-dom';
import HomePage from './pages/HomePage'
import './App.css'
import NewSession from './pages/NewSession';
import History from './pages/History';
import Layout from './Layout';
import Session from './pages/Session';

const routes = [{
  path: '/',
  element: <Layout />,
  children: [{
      path: '/', //what URL path
      element: <HomePage /> //what component to display
    },
    {
      path: '/history', //what URL path
      element: <History /> //what component to display
    },
    {
      path: '/newsession', //what URL path
      element: <NewSession /> //what component to display
    },
    {
      path:'/history/:date', // -> /history/2020-04-03
      element: <Session />
    }]
}]
//creating router
//note-- what does it do?
const myrouter = createBrowserRouter(routes);

function App() {

  return (
   <RouterProvider router={myrouter} />
  )
}

export default App
