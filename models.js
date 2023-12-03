import mongoose, { Schema, Types } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    chats: {
        type: Types.ObjectId,
        ref: 'Chat'
    },
    messages: {
        type: Types.ObjectId,
        ref: 'Message'
    },
    seenMessages: {
        type: Types.ObjectId,
        ref: 'Message'
    }

}, {
    timestamps: true
});

const ChatSchema = new Schema({
    members: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Types.ObjectId,
        ref: 'Message'
    }]
}, {
    timestamps: true
});

const MessageSchema = new Schema({
    text: String,
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: Types.ObjectId,
        ref: 'Chat'
    },
    seenBy: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
});



export const Chat = mongoose.model('Chat', ChatSchema);
export const Message = mongoose.model('Message', MessageSchema);
export const User = mongoose.model('User', UserSchema);