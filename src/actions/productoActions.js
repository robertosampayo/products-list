import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITOSO,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_EDITADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function crearNuevoProductoActions(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() );
        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto);

            //Si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto));

            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            );
        } catch (error) {
            // Si hay un error cambiar el state
            dispatch( agregarProductoError(true));

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo',
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    action: true
})

// si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado,
});

// Funcion que descarga los productos de  la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargarProductosExitosa(respuesta.data) );
        } catch (error) {
            dispatch( descargarProductosError() )
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true,
})

const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos,
})

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true,
})

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id) );

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito());

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'El producto fue eliminado correctamente.',
                'success'
            )
        } catch (error) {
            dispatch( eliminarProductoError() );
        }
    }
}

export const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id,
})

export const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITOSO
})

export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true,
})

// Colocar producto en edicion

export const obtenerProductoEditar = (producto) => {
    return (dispatch) => {
            dispatch( obtenerProductoEditarAction(producto))
        }
};

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto() );

        try {
            const resultado = await clienteAxios.put(`/productos/${producto.id}`, producto);
            if (resultado) {
               dispatch( editarProductoExito(producto));
            }
        } catch (error) {
            dispatch( editarProductoError() );
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

export const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true,
})