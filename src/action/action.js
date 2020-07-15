export const changeName = nama => dispatch => {
    dispatch({
        type: 'CHANGE_NAME',
        payload: nama
    });
};