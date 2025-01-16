import { User } from "../models/user.js";
import { faker } from "@faker-js/faker";

const createUser=async(numUsers)=>{
    try {
        const userArray=[]
        for(let i=0;i<numUsers;i++){
            const users = await User.create({
                name:faker.person.fullName(),
                password:"password",
                username:faker.internet.userName(),
                bio:faker.lorem.sentence(10),
                avatar:{
                    url:faker.image.avatar(),
                    public_id:faker.system.fileName(),
                }
            });
            userArray.push(users)
        }
        await Promise.all(userArray)
        console.log("User created:",numUsers)
        process.exit(1)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export {createUser}