import React, { useState } from 'react'
import './Chat.css'
import { Avatar, Icon, IconButton } from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios.js';

function Chat({messages}) {
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            "name": "nakai",
            "message": input,
            "timestamp": "Just now",
            "received": false
        });


        setInput('');

    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>room name</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>

            </div>


            <div className="chat__body">
            {messages.map((message) => (
                    <p className={`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {/* {new Date().toUTCString()} */}
                        {message.timestamp}
                        </span>    
                    </p>
                ))}


            </div>


            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    type="text"
                    placeholder="Type a message"/>
                    
                    <button 
                        onClick={sendMessage}
                        type="submit">
                        Submit a message
                    </button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat
