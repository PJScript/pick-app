import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { connectSocket, getAccessToken, getChatMessage, resetChatMessage } from '../redux/actions';
import Loading from "./loading"
const HelpDesk = () => {
  let dispatch = useDispatch()
  let [textAreaHeight, setTextAreaHeight] = useState(28)
  let [chatModal, setChatModal] = useState('none')
  let [currentSocket, setCurrentSocket] = useState()
  let [inputText, setInputText] = useState('')
  let [chatQueue, setChatQueue] = useState([])
  let [userSocketId, setUserSocketId] = useState('')
  let ChatQueue = useSelector((state) => state.chatReducer.ChatQueue)


  
  const renderTooltip = props => (
    <Tooltip {...props}>도움이 필요하신가요?</Tooltip>
  );
  

  
  const test = (e) => {
    if (e.target.scrollHeight !== textAreaHeight - 2) {
      setTextAreaHeight(e.target.scrollHeight)
      setInputText(e.target.value)
    } else if (e.target.scrollHeight === e.target.scrollHeight) {
      setTextAreaHeight(e.target.scrollHeight - 24)
      setInputText(e.target.value)
    }
    else {
      return 0;
    }
  }

  const clickHelpBtn = () => {
    // alert('준비중인 기능입니다. !')
    setChatModal('flex')
    setCurrentSocket(io('https://server.bootview.info'))
    // dispatch(getChatMessage({'id':'system','inputText':'연결 되었습니다.'}))
  }
  const clickCancelBtn = () => {
    if (window.confirm('채팅을 종료 하시겠습니까?')) {
      currentSocket.disconnect()
      dispatch(resetChatMessage())
      setChatModal('none')
    } else {
      alert('채팅을 계속 유지합니다.')
    }
  }

  const clickSubmitBtn = () => {
    setInputText('')
    console.log('전송 버튼클릭됨')
    currentSocket.emit("chat", { id: currentSocket.id, inputText })
  }

  useEffect(()=>{
    if(currentSocket){
      currentSocket.emit("connectChat", { id: currentSocket.id})
      currentSocket.on("connectChat", (data) => {
        console.log(data)
        setUserSocketId(currentSocket.id)
      })
      currentSocket.on("chat", (data) => {
        console.log("채팅",data)
        console.log(chatQueue,"채팅 큐 내부")
        dispatch(getChatMessage(data.data))
      })
    }
  }, [currentSocket])
  console.log(ChatQueue,"채팅큐")
  return (
    <div className='helpDeskContainer'>
      <div className='helpDeskBox hoverGreen' data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" onClick={clickHelpBtn}>
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2.4rem" height="2.4rem" fill="currentColor" class="bi bi-headset" viewBox="0 0 16 16">
            <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
          </svg>
        </OverlayTrigger>
      </div>
      <div className='chatDropZone' style={{ display: chatModal }}>
        <div className='chatBoxHeader'>
          <div className='chatBoxHeader-left hoverGrey'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </div>
          <div className='chatBoxHeader-center'>
            <h5>BootBot</h5>
          </div>
          <div className='chatBoxHeader-right'>
            <div className='dashBtn hoverGrey'>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
              </svg>
            </div>
            <div className='cancelBtn hoverGrey' onClick={clickCancelBtn}>
              <svg className='exitBtn' xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
              </svg>
            </div>
          </div>
        </div>
        {currentSocket ? <div className='chatBoxBody'>
          {/* <div className='chatItem'>
            <div className='chatItem-left'>
              <div className='chatItem-userphoto'>
                <div></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
                <div></div>
              </div>
              <div className='chatItem-usename'>
                <h6>system</h6>
              </div>
            </div>
            <div className='chatItem-right'>
              <div></div>
              <div className='chatItem-content'>
                <h6>채팅 서버에 연결되었습니다.</h6>
              </div>
            </div>
          </div> */}
          {/*오른쪽으로 보여줘야함*/}
          {ChatQueue.map((data) => {
            if (data.id === userSocketId) {
              return (
                  <div className='MyChatItem'>
                    <div className='MyChatItem-left'></div>
                    <div className='MyChatItem-center'></div>
                    <div className='MyChatItem-right'>
                      <div></div>
                      <div className='MyChatItem-content'>
                        <h6>{data.inputText}</h6>
                      </div>
                    </div>
                  </div>
              )
            } else if(data.id === 'system'){
              <div>채팅서버에 연결되었습니다</div>
            }else {
              return(
                <div className='chatItem'>
                <div className='chatItem-left'>
                  <div className='chatItem-userphoto'>
                    <div></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                    <div></div>
                  </div>
                  <div className='chatItem-usename'>
                    <h6>상대방</h6>
                  </div>
                </div>
                <div className='chatItem-right'>
                  <div></div>
                  <div className='chatItem-content'>
                    <h6>{data.inputText}</h6>
                  </div>
                </div>
              </div>
              )
              
            }
          })}
        </div> : <div><Loading /> 연결중..</div>}
        <div className='chatBoxWrapper'>
          <div className='chatBoxInput'>
            <textarea className='chatBoxInput-textarea' value={inputText} onChange={test} style={{ width: '100%', height: `${textAreaHeight}px` }}></textarea>
            <div className='hover'>
              <svg onClick={clickSubmitBtn} xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default HelpDesk