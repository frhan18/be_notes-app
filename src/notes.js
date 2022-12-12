/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const {nanoid} = require('nanoid');
const notes = [];


const createNewNotesHandler = async (request, h) => {
  const payload = request.payload;
  const {title, tags, body} = payload;
  const id = nanoid();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  if (title.length < 1) {
    const response = await h.response({
      status: 'Fails',
      message: 'Title Cannot Be Empty!',
    });
    response.code(500);
    return response;
  }

  const newNote = {
    id, title, tags, body, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id);

  if (isSuccess) {
    const response = await h.response({
      status: 'Success',
      message: 'Successfuly Add New Notes',
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }
};

const getAllNotesHandler = async (request, h) => {
  if (notes.length < 1) {
    const response = await h.response({
      status: 'Fails',
      message: 'Data Not Found',
    });
    response.code(500);
    return response;
  }

  const response = await h.response({
    status: 'Success',
    message: 'Get All Notes',
    data: {
      notes,
    },

  });
  console.log(notes);
  response.code(200);
  return response;
};

const getNoteByIdHandler = async (request, h) => {
  // const params = request.params;
  const {id} = request.params;

  if (!id) {
    const response = await h.response({
      status: 'Fails',
      message: 'Data Not Found',
    });

    response.code(404);
    return response;
  }

  const note = notes.filter((n) => n.id === id)[0];


  if (note !== undefined) {
    return {
      status: 'Success',
      data: {
        note,
      },
    };
  } else {
    const response = await h.response({
      status: 'Fails',
      message: 'Data Not Found',
    });

    response.code(404);
    return response;
  }
};

const updateNotesByIdHandler = async (request, h) => {
  const payload = request.payload;
  const params = request.params;

  const {id} = params;
  if (!id) {
    const response = await h.response({
      status: 'Fails',
      message: 'Data Not Found',
    });

    response.code(404);
    return response;
  }
  const {title, tags, body} = payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title, tags, body, updatedAt,
    };

    const response = await h.response({
      status: 'Success',
      message: 'Notes Updated',
    });

    response.code(200);
    return response;
  } else {
    const response = await h.response({
      status: 'Fails',
      message: 'Failed to update record. ID not found',
    });

    response.code(404);
    return response;
  }
};

const deleteNotesByIdHandler = async (request, h) => {
  const params = request.params;
  const {id} = params;

  if (id === undefined) {
    const response = await h.response({
      status: 'Fails',
      message: 'Data Not Found',
    });

    response.code(404);
    return response;
  }

  const index = notes.filter((note) => note.id === id);
  if (index !== - 1) {
    notes.splice(index, 1);
    const response = await h.response({
      status: 'Success',
      message: 'Deleted Notes',
    });

    response.code(200);
    return response;
  } else {
    const response = await h.response({
      status: 'Fails',
      message: 'Failed to update record. ID not found',
    });

    response.code(404);
    return response;
  }
};


module.exports = {createNewNotesHandler, getAllNotesHandler, getNoteByIdHandler, updateNotesByIdHandler, deleteNotesByIdHandler};
