import React from 'react'
import { useState } from 'react'
const InputModal = () => {
  let [title, setTitle] = useState('')
  let [content, setContent] = useState('')
  

  const inputTitle = async (e) => {
    localStorage.inputTitle = e.target.value
    console.log(e.target.value)
  }
  const inputReview = async (e) => {
    localStorage.inputReview = e.target.value
    console.log(e.target.value)
  }
  const submit = async (e) => {
    console.log(e)
  }
  return (
    <div>
      <h5 type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="title">작성하기</h5>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">평점을 남겨주세요!</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked></input>
                <label class="form-check-label" for="flexCheckDefault">
                  익명으로 쓰기
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label" for="flexCheckChecked">
                  무분별한 비방, 비교, 욕설은 삭제 될 수 있습니다.
                </label>
              </div>
            </div>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">짧은 후기를 남겨주세요!</h5>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label" >제목</label>
                  <input type="text" class="form-control" id="recipient-name" placeholder='제목' onChange={inputTitle}></input>
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label" >후기</label>
                  <textarea class="form-control" id="message-text" placeholder='입력한 내용은 임시 저장 됩니다. * 새로고침 시 사라짐 *' onChange={inputReview}></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="button" class="btn btn-primary" onClick={submit}>작성완료</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default InputModal