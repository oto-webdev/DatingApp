import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
    try{
        const { content, receiverId } = req.body;

        const newMessage = await Message.create({
            content,
            sender: req.user.id,
            receiver: receiverId
        })

        return res.status(200).json(newMessage);
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
};

export const getConversation = async (req, res) => {
	try{
        const { userId } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: userId },
                { sender: userId, receiver: req.user.id }
            ]
        }).sort("createdAt");

        return res.status(200).json(messages);
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
};