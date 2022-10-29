import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Request from '../../apis/Request.js';

const Chat = ({ socket }) => {

    const request = new Request();
    const room = sessionStorage.getItem('room');
    const id = sessionStorage.getItem('user');
    const full_name = sessionStorage.getItem('full_name');
    const [currentMessage, setCurrentMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    const sendMessage = async () => {
        if(currentMessage !== '') {
            const messageData = {
                room: room,
                id: id,
                author: full_name,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage('');
            saveMessage(messageData);
        }
        
    };

    const saveMessage = async (messageData) => {
      const room = messageData.room;
      const author = messageData.author;
      const message = messageData.message;
      const time = messageData.time;
      const data = { room, author, message, time };
      await request.sendMessage(data);
    };

    async function callPage() {
      const data = { room };
      const response = await request.listMessages(data);
      if(response.status === 201){
  
        setMessageList(
          response.data.messages.map((item) => {
            return{
              id: item._id,
              author: item.author,
              time: item.time,
              message: item.message
            }
          })
        )
      }
    };

    React.useEffect(() => {
      socket.on('recieve_message', (data) => {
        setMessageList((list) => [...list, data]);
        callPage();
      })
      callPage();
    }, [socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Chat</p>
      </div>

      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
        {messageList.map((messageContent) => {
            return(
                <div className='message' id={full_name === messageContent.author ? 'you' : 'other'}>
                    <div>
                        <div className='message-content'>
                            <p>{messageContent.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id='time'>{messageContent.time}</p>
                            <p id='author'>{messageContent.author}</p>
                        </div>
                    </div>
                </div>
            )
        })}
        </ScrollToBottom>
      </div>

      <div className='chat-footer'>
        <input type='text'
               placeholder='Hey...'
               value={currentMessage}
               onChange={(e) => setCurrentMessage(e.target.value)}
               onKeyPress={(e) => {e.key === 'Enter' && sendMessage(e.target.value)}} />

        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
