import {Routes,Route,Outlet} from 'react-router-dom';
import Authentication from './routes/authentication/authentication';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';




const Shop = () => {
  return (
    <div>
      <div>
        <h1>I am the shop bar</h1>
      </div>
      <Outlet/>
    </div>
  )
}

const App=()=> {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
         <Route index={true} element={<Home/>}/>
         <Route path='shop' element={<Shop/>}/>
         <Route path='auth' element={<Authentication/>}/>
      </Route> 
    </Routes>
  )
}

export default App;
