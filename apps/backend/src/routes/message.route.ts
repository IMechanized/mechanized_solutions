import { Express } from 'express'
import { createMessageRoomHandler, findMessageRoomHandler, getMessageRoomHandler, updateMessageHandler } from '../controller/message.controller'
import { messageValidate } from '../middlewares/message.validate'
import requireUser from '../middlewares/requireUser'


function messageRoute(app: Express) {
    // send a message routes
    app.post(
        '/api/v1/users/message/rooms',
        requireUser,
        messageValidate,
        createMessageRoomHandler
    )

    //  get all message rooms
    app.get('/api/v1/users/message/rooms', requireUser, findMessageRoomHandler)

    // get a message room by id
    app.get(
        '/api/v1/users/message/room/:roomId',
        requireUser,
        getMessageRoomHandler
    )

    // update message by room _id
    app.put(
        '/api/v1/users/message/room/:roomId',
        requireUser,
        updateMessageHandler
    )
}

export default messageRoute
