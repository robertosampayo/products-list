import Header from './components/Header';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Header />

          <div className='container' >
              <Routes>
                <Route exact path='/' element={<Productos />} ></Route>
                <Route exact path='/productos/nuevo' element={<NuevoProducto />} ></Route>
                <Route exact path='/productos/editar/:id' element={<EditarProducto />} ></Route>

              </Routes>
          </div>
          </Router>
      </Provider>
  );
}

export default App;
