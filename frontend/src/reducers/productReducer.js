import {ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS}
     from"../constants/productConstants"


export const productReducer = ((state = { products: [] }),(actions) => {

    switch (actions.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            }
            case ALL_PRODUCT_SUCCESS:
                return{
                    loading:false,
                    product: actions.payload.products,
                    productsCount: actions.payload.productsCount
                }
            case ALL_PRODUCT_FAIL:
                return{
                    loading:false,
                    product: actions.payload.productsCount,
                }
                default:
                    return state;
    }
})