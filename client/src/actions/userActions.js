import axios from 'axios';
// import toastr from 'toastr';
import actionTypes from './actionTypes';

const getAllUsersSuccess = payload => ({
  type: actionTypes.GET_ALL_USERS_SUCCESS,
  payload
});
const getAllUsers = () => dispatch => axios
  .get('api/users')
  .then((res) => {
    dispatch(getAllUsersSuccess(res.data));
  })
  .catch((err) => {
  });
const searchUserSuccess = payload => ({
  type: actionTypes.SEARCH_USER_SUCCESS, payload
});

const searchUser = payload => dispatch => axios
  .get(`api/search/users/?q=${payload}`)
  .then((res) => {
      console.log('dfdfdfdfd')
      console.log(res.data);
    dispatch(searchUserSuccess(res.data));
  });

// const getDocumentSuccess = payload => ({
//   type: actionTypes.GET_DOCUMENT_SUCCESS, payload
// });
// const getDocumentFailure = payload => ({
//   type: actionTypes.GET_MY_DOCUMENTS_FAILURE, payload
// });

// const getDocument = payload => dispatch => axios
//   .get(`api/documents/${payload}`)
//   .then((res) => {
//     dispatch(getDocumentSuccess(res.data));
//   })
//   .catch((error) => {
//     dispatch(getDocumentFailure(error.response.data));
//   });
// const updateDocumentSuccess = payload => ({
//   type: actionTypes.UPDATE_DOCUMENT_SUCCESS, payload
// });
// const updateDocumentFailure = payload => ({
//   type: actionTypes.DELETE_DOCUMENT_SUCCESS, payload
// });
// const updateDocument = payload => dispatch => axios
//   .put(`api/documents/${payload.id}`, payload)
//   .then((res) => {
//     toastr.success(res.data.msg);
//     dispatch(updateDocumentSuccess(res.data));
//   }).catch((error) => {
//     toastr.error(error.response.data.msg);
//     dispatch(updateDocumentFailure(error.response.data));
//   });

const deleteUserSuccess = payload => ({
  type: actionTypes.DELETE_USER_SUCCESS, payload
});
// const deleteDocumentFailure = payload => ({
//   // type: actionTypes.DELETE_DOCUMENT_, payload
// });
const deleteUser = payload => dispatch => axios
 .delete(`api/users/${payload}`)
 .then((res) => {
   dispatch(deleteUserSuccess(res.data));
 }).catch((error) => {
 });
export {
  getAllUsers,
  deleteUser,
  searchUser
};

