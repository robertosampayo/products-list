import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Actions de Redux
import { crearNuevoProductoActions } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions';

const NuevoProducto = () => {

    // state del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    const history = useNavigate();

    // utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alertas.alerta);

    // mandar llamar el action de productoAction
    const agregarProducto = producto => dispatch( crearNuevoProductoActions(producto) );


    // cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        // validar formulario   
        if (nombre.trim === '' || precio <= 0) {

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch (mostrarAlerta(alerta));

            return;
        }
        // si no hay errores
        dispatch( ocultarAlerta() );

        // crear el nuevo producto
        agregarProducto({
            nombre, precio
        });

        history('/');
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-wight-bold'>
                            Agregar Nuevo Producto
                        </h2>
                        { alerta ? <p className={alerta.classes}>{alerta.msg}</p>: null}
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Nombre del producto'
                                    name='nombre'
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Precio Producto</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Precio del producto'
                                    name='precio'
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            >
                                Agregar
                            </button>
                        </form>

                        { cargando ? <p>Cargando... </p> : null}
                        { error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;