import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('<Header >',() => {



    test('render Header', () => {


        const component = render(<Header /> , {wrapper: MemoryRouter})
        const welcomeMsg = component.getByText('CRUD - React, Redux, REST API & Axios');
    
        expect(welcomeMsg).toBeInTheDocument();
    
    });

    test('show a button to add new products', () => {

        const component = render(<Header /> , {wrapper: MemoryRouter})
    
        const addProduct = component.getByText('Agregar Producto');
    
        expect(addProduct).toBeInTheDocument();
    
    });


});

