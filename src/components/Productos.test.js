import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Productos from './Productos';
import reducer from "../reducers/productosReducer";
import { Provider, useSelector, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';


describe('<Productos >',() => {


    const initialState = {
        productos: [
            {
                nombre: 'Arroz chino',
                precio: '6500',
                id: 8
              },
              {
                nombre: 'Pasta alfredo',
                precio: '1300',
                id: 9
              },
              {
                nombre: 'Pasta Carbonara',
                precio: '4562',
                id: 10
              }
        ],
        error: null,
        loading: false,
        productoeliminar: null,
        productoeditar: null,
    }

    const store = createStore(reducer, initialState , compose( applyMiddleware(thunk)));

    test('render Productos with title', () => {


        const component = render(<Provider store={store}><Productos /></Provider>)
        const title = component.getByText('Listado de Productos');

    
        expect(title).toBeInTheDocument();
    
    });



});