import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const ReviewPatchModal = () => {
  let history = useHistory()
  let MyReviews = useSelector((state) => state.authReducer.MyReviews)
  let [prevTitle, setPrevTitle] = useState('')
  let [prevContent, setPrevContent] = useState('')


const reviewPatch = (e) => {
  
  let parseNumber = parseInt(e.nativeEvent.path[3].cells[0].innerText)
  

  console.log(MyReviews[parseNumber-1],"선택한 리뷰")
  setPrevTitle(MyReviews[parseNumber-1].title)
  setPrevContent(MyReviews[parseNumber-1].content)
  console.log(parseNumber,"클릭한 넘버")

}
const inputTitle = (e) => {
  setPrevTitle(e.target.value)
}
console.log(prevTitle,"타이틀")
console.log(prevContent,"콘텐츠")
useEffect(()=>{
  console.log('상태변경됨')
},[prevContent,prevTitle])
return (
  <>
  test
  </>
  )
}

export default ReviewPatchModal