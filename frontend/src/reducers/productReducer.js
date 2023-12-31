import {ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUC_DETAILS_REQUEST,
    PRODUC_DETAILS_SUCCESS,
    PRODUC_DETAILS_FAIL,
    CLEAR_ERRORS}
     from"../constants/productConstants"


    export const productsReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
            case ALL_PRODUCT_SUCCESS:
                return {
                    loading: false,
                    products: action.payload.products,
                    productsCount: action.payload.productsCount,
                };
            case ALL_PRODUCT_FAIL:
                return{
                    loading: false,
                    error: action.payload,
                }

            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null,
                }
            default:
                return state;
    }
}

    export const productsDetailsReducer = (state = { product: [] }, action) => {

    switch (action.type) {
        case PRODUC_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
            case PRODUC_DETAILS_SUCCESS:
                return {
                    loading: false,
                    product: action.payload,
                };
            case PRODUC_DETAILS_FAIL:
                return{
                    loading: false,
                    error: action.payload,
                }

            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null,
                }
            default:
                return state;
    }
}