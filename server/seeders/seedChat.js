import { Chat } from "../models/chat.js"
import { Message } from "../models/message.js";
import { User } from "../models/user.js"
import { faker, simpleFaker } from "@faker-js/faker";

export const createSingleChats = async (numChats) => {
    try {
        const user = await User.find().select("_id")
        const chats = []
        for (let i = 0; i < user.length; i++) {
            for (let j = i + 1; j < user.length; j++) {
                chats.push(
                    Chat.create({
                        name: faker.lorem.words(2),
                        members: [user[i], user[j]]
                    })
                )
            }
        }
        await Promise.all(chats)
        console.log("Chats created successfully!")
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

export const groupChat = async (numChats) => {
    try {
        const user = await User.find().select("_id")
        const chatPromise = []
        for (let i = 0; i < numChats; i++) {
            const numMembers = simpleFaker.number.int({ min: 3, max: user.length })
            const members = []
            for (let i = 0; i < numMembers; i++) {
                const randomIndex = Math.floor(Math.floor(Math.random() * user.length))
                const randomUser = user[randomIndex]
                if (!members.includes(randomUser)) {
                    members.push(randomUser)
                }
                const chat = Chat.create({
                    groupChat: true,
                    name: faker.lorem.words(1),
                    members: members,
                    creator: members[0]
                })
                chatPromise.push(chat)
            }
        }
        await Promise.all(chatPromise)
        console.log("Chats created successfully!")
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export const createMessage=async(numMessages)=>{
    try {
        const users=await User.find().select("_id")
        const chats=await Chat.find().select("_id")
        const messagePromise=[]
        for(let i=0;i<numMessages;i++){
            const randomUser=users[Math.floor(Math.random()*users.length)]
            const randomChat=chats[Math.floor(Math.random()*chats.length)]
            messagePromise.push(
                Message.create({
                    chat:randomChat,
                    sender:randomUser,
                    content:faker.lorem.sentence()
                })
            )
        }
        await Promise.all(messagePromise)
        console.log("Messages created successfully")
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export const createMessageInAChat=async(chatId,numMessages)=>{
    try {
        const users=await User.find().select("_id")
        const messagePromise=[]

        for(let i=0;i<numMessages;i++){
            const randomUser=users[Math.floor(Math.random()*users.length)]
            messagePromise.push(
                Message.create({
                    chat:chatId,
                    sender:randomUser,
                    content:faker.lorem.sentence()
                })
            )
        }
        await Promise.all(messagePromise)
        console.log("Messages created successfully!")
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}