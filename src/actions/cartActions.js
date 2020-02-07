import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, UPDATE_CART_ICON , SIGN_UP , LOG_IN , LOG_OUT , REGISTER } from './action-types/cart-actions'

//add cart action
export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    }
}
//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}
//subtract quntity action
export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}
//add quantity action
export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id
    }
}

// send login data across all pages
export const onSendLoginUser = (id) => {
    // debugger;
    return {
        type: SIGN_UP,
        id 
    }
}

// send Register data across all pages
export const onLoggedIn = (payload , id) => {
    // debugger
    return {
        type: LOG_IN,
        payload : payload,
        id
    }
}


// send Register data across all pages
export const onSendRegisterUser = (payload ) => {

    return {
        type: REGISTER,
        payload 
    }
}



// send Register data across all pages
export const logOut = (payload) => {

    return {
        type: LOG_OUT,
        payload
    }
}

export const updateCartQuantity = (productId, quantity) => {
    return {
        type: UPDATE_CART_ICON,
        payload: {
            productId,
            quantity: quantity
        }
    }
}