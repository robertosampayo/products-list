import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { Link, useNavigate } from 'react-router-dom';


const EditarProducto = () => {

    const dispatch = useDispatch();
    const history = useNavigate();

    // nuevo state de producto
    const [ producto, guardarProducto] = useState({
        nombre: '',
        precio: 0,
    })

    // producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);
    
        
    // llenar el state automaticamente
    useEffect(() => {
        // producto a editar
        guardarProducto(productoeditar)
    }, [productoeditar]);
        
    if (!producto) return null;

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const submitEditarProducto = e => {
        e.preventDefault();
        dispatch (editarProductoAction(producto));
        history('/');
    }

    return producto && 

           ( <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='text-center mb-4 font-wight-bold'>
                                Editar Nuevo Producto
                            </h2>

                            <form
                                onSubmit={submitEditarProducto}
                            >
                                <div className='form-group'>
                                    <label>Nombre Producto</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Nombre del producto'
                                        name='nombre'
                                        value={producto.nombre}
                                        onChange={onChangeFormulario}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Precio Producto</label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Precio del producto'
                                        name='precio'
                                        value={producto.precio}
                                        onChange={onChangeFormulario}
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                                >
                                    Guardar
                                </button>
                            </form>

                            {/* cargando ? <p>Cargando... </p> : null */}
                            {/* error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null*/}
                        </div>

                    </div>
                </div>
            </div>
           )
     
 
}
export default EditarProducto;