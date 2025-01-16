export const sampleChats = [{
    name: 'Didi',
    url:'https://img.lovepik.com/element/45001/3052.png_860.png',
    _id: '1',
    groupChat: false,
    members: ['1', '2'],
}, {
    name: 'Papa',
    _id: '2',
    groupChat: false,
    members: ['4', '3'],
}, {
    name: 'Mummy',
    _id: '3',
    groupChat: false,
    members: ['2', '2'],
},
//  {
//     name: 'Papa',
//     _id: '5',
//     groupChat: false,
//     members: ['4', '3'],
// }, {
//     name: 'Mummy',
//     _id: '6',
//     groupChat: false,
//     members: ['2', '2'],
// }, {
//     name: 'Papa',
//     _id: '7',
//     groupChat: false,
//     members: ['4', '3'],
// }, {
//     name: 'Mummy',
//     _id: '8',
//     groupChat: false,
//     members: ['2', '2'],
// }, {
//     name: 'Papa',
//     _id: '9',
//     groupChat: false,
//     members: ['4', '3'],
// }, {
//     name: 'Mummy',
//     _id: '10',
//     groupChat: false,
//     members: ['2', '2'],
// }, {
//     name: 'Papa',
//     _id: '11',
//     groupChat: false,
//     members: ['4', '3'],
// }, {
//     name: 'Mummy',
//     _id: '12',
//     groupChat: false,
//     members: ['2', '2'],
// }, {
//     name: 'Papa',
//     _id: '13',
//     groupChat: false,
//     members: ['4', '3'],
// }, {
//     name: 'Mummy',
//     _id: '14',
//     groupChat: false,
//     members: ['2', '2'],
// }, {
//     name: 'Papa',
//     _id: '15',
//     groupChat: false,
//     members: ['4', '3'],
// }, {
//     name: 'Mummy',
//     _id: '16',
//     groupChat: false,
//     members: ['2', '2'],
// }, {
//     name: 'Papa',
//     _id: '17',
//     groupChat: false,
//     members: ['4', '3'],
// }, {
//     name: 'Mummy',
//     _id: '18',
//     groupChat: false,
//     members: ['2', '2'],
// },
 {
    name: 'yatin',
    _id: '4',
    groupChat: false,
    members: ['3', '3'],
}
]
export const sampleUsers = [{
    name: 'Papa',
    _id: '2',
}, {
    name: 'Yatin',
    _id: '1',
}, {
    name: 'Didi',
    _id: '4',
}, {
    name: 'Mummy',
    _id: '3',
}]

export const sampleNotifications = [{
    sender: {
        name: 'Yatin',
    },
    // message:`Hey! How are you?,{name}`,
    _id: '1',
}, {
    sender: {
        name: 'Papa',
    },
    _id: '2',
}, {
    sender: {
        name: 'Didi',
    },
    _id: '4',
}, {
    sender: {
        name: 'Mummy',
    },
    _id: '3',
}]

export const sampleMessage = [{
    attachments: [],
    content: 'here yatin',
    _id: 'asdfghjkl',
    sender: {
        _id: 'user._id',
        name: 'chotabhai',
    },
    chat: 'chatId',
    createdAt: '5th feb',
},{
    attachments: [{
        public_id: 'yatin2',
        url: 'https://img.lovepik.com/element/45001/3052.png_860.png',
    },],
    content: '',
    _id: 'asdfghjkl2',
    sender: {
        _id: 'asdfghj',
        name: 'chamman2',
    },
    chat: 'chatId',
    createdAt: '5th feb',
},]

export const DashboardData={
    users:[
        {
            name:"Ramesh",
            avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
            _id:"1",
            username:"ramesh125",
            friends:10,
            groups:5,
        },{
            name:"Suresh",
            avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
            _id:"2",
            username:"suresh455",
            friends:15,
            groups:2,
        },
    ],
    chats:[{
        name:"family group",
        avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        _id:"1",
        groupChat:false,
        members:["1","2"],
        totalMembers:2,
        totalMessages:20,
        creator:{
            name:"ramesh",
            avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        },
    },{
        name:"family group",
        avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        _id:"1",
        groupChat:false,
        members:["1","2"],
        totalMembers:2,
        totalMessages:20,
        creator:{
            name:"ramesh",
            avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        },
    },{
        name:"family group",
        avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        _id:"1",
        groupChat:false,
        members:["1","2"],
        totalMembers:2,
        totalMessages:20,
        creator:{
            name:"ramesh",
            avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        },
    },],
    messages:[
        {
            attachments:[],
            content:"message is coming",
            _id:"asdfghjk",
            senders:{
                name:"ramesh",
                avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            },
            groupchat:true,
            chat:"chatId",
            createdat:"2024-02-05",
        },
        {
            attachments:[
                {
                    public_id:"something",
                    url:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
                },
            ],
            content:"message is coming part 2",
            _id:"asdfghjkasdfgh",
            senders:{
                name:"suresh",
                avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            },
            groupchat:false,
            chat:"chatId",
            createdat:"2024-02-27",
        }
    ]
}