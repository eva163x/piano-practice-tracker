import {
  createBrowserRouter,
  RouterProvider} 
  from 'react-router-dom';
  import axios from 'axios';
import HomePage from './pages/HomePage'
import './App.css'
import NewSession from './pages/NewSession';
import History from './pages/History';
import Layout from './Layout';
import Session from './pages/Session';
import NotFoundPage from './pages/NotFoundPage';

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />, //what to do if URL not in routes
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
      element: <Session />,
      loader: async function() {
        const response = await axios.get('/api/history/2025-04-22');
        const { upvotes, comments } = response.data;
        return { upvotes, comments };
      }
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
