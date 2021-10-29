import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingPackages from './Components/BookingPackages/BookingPackages';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Packages from './Components/Packages/Packages';
import NotFound from './Components/NotFound/NotFound';
import AboutUs from './Components/AboutUs/AboutUs';
import Contact from './Components/Contact/Contact';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Switch>

          <Route exact path='/'>
            <Home></Home>
          </Route>

          <Route path='/home'>
            <Home></Home>
          </Route>

          <Route path='/packages'>
            <Packages></Packages>
          </Route>

          <Route path='/bookingpackages'> 
            <BookingPackages></BookingPackages>
          </Route>

          <Route>
            <AboutUs></AboutUs>
          </Route>

          <Route>
            <Contact></Contact>
          </Route>

          <Route path='/login'>
            <Login></Login>
          </Route>

          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
