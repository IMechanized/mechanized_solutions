import MessageModel from "../models/message.model"

// create createMessageRoom service
export async function createMessageRoom(input: any) {
    try {
        const messageRoom = await MessageModel.create(input)
        return messageRoom
    } catch (e) {
        throw e
    }
}

// find the user message services
export async function findMessageRoom(userId: string) {
    try {
        const messageRoom = await MessageModel.find({
            $or: [
                {
                    'members.buyer': `${userId}`,
                },
                {
                    'members.seller': `${userId}`,
                },
            ],
        })
            .populate('ads', ['adTitle', '_id'])
            .populate('members.buyer', ['fullName', 'avatar', '_id'])
            .populate('members.seller', ['fullName', '_id', 'avatar'])
            .lean(true)

        return messageRoom
    } catch (e) {
        throw e
    }
}

// get message room by id services
export async function getMessageRoom(roomId: string) {
    try {
        const messageRoom = await MessageModel.findById(roomId)
            .populate('ads', ['adTitle', '_id'])
            .populate('members.buyer', ['avatar', '_id'])
            .populate('members.seller', ['avatar', '_id'])
            .lean(true)
        return messageRoom
    } catch (e) {
        throw e
    }
}

// update message room services
export async function updateMessageRoom(roomId: string, input: any) {
    try {
        // push the new message to message array
        const messageRoom = await MessageModel.findByIdAndUpdate(
            roomId,
            {
                $push: {
                    messages: input,
                },
            },
            {
                new: true,
            }
        )
        return messageRoom
    } catch (e) {
        throw e
    }
}
