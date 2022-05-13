import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA
} from '../types';


// Muestra alerta
export function mostrarAlerta(alerta) {
    console.log(alerta);
    return (dispatch) => {
        dispatch( crearAlerta(alerta))
    }
}

const crearAlerta = alerta =>({
    type: MOSTRAR_ALERTA,
    payload: alerta,
})



// Ocultar alerta
export function ocultarAlerta(alerta) {
    return (dispatch) => {
        dispatch( ocultarAlertaError())
    }
}

const ocultarAlertaError = () =>({
    type: OCULTAR_ALERTA,
})
