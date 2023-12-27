import { IMAGE_SAVE_FAILURE,
IMAGE_SAVE_SUCCESS, IMAGE_SAVE_REQUEST } from "../actions/type";


export const uploadImageReducer = (state = {}, action) => {
    switch(action.type){
        case IMAGE_SAVE_REQUEST:
            return { loading: true };
        case IMAGE_SAVE_SUCCESS:
            return {  loading: false, success: true, ImageData: action.payload};
        case IMAGE_SAVE_FAILURE:
            return { loading: false, error: action.payload.error };
        default:
            return state;
    }
};
