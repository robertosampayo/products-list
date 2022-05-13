import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITOSO, 
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_ERROR,
    
} from '../types';


// cada reducer tiene su propio state
const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoeliminar: null,
    productoeditar: null,
}

export default function (state = initialState, action ) {
    switch(action.type) {
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: true,
            }

        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [ ... state.productos, action.payload ]
            }

        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: action.payload,
            }

        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload,
            }     
        case PRODUCTO_ELIMINADO_ERROR:
        case PRODUCTO_EDITADO_ERROR:    
        case DESCARGA_PRODUCTOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            } 

        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoeliminar: action.payload,
            } 

        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoeditar: action.payload,
            } 
        case PRODUCTO_ELIMINADO_EXITOSO:
            return {
                ...state,
                productos: state.productos.filter( producto => producto.id !== state.productoeliminar),
                productoeliminar: null,
            } 

        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                productos: state.productos.map( producto => producto === action.payload ? producto = action.payload : producto ),
                productoeditar: null,
            } 
        default:
            return state;
    }
}