/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const {createNewNotesHandler, getAllNotesHandler, getNoteByIdHandler, updateNotesByIdHandler, deleteNotesByIdHandler} = require('./notes');
const routes = [
  {
    method: '*',
    path: '/{any*}',
    handler: async (request, h) => {
      const response = await h.response({
        status: 'Not Found',
        message: '404 Error! Page Not Found!',
      });

      response.code(404);
      return response;
    },
  },
  {
    method: 'POST',
    path: '/notes',
    handler: createNewNotesHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNotesByIdHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotesByIdHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
];

module.exports = routes;
