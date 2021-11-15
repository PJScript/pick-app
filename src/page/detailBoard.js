import React from 'react'
import { useSelector } from 'react-redux'
import BoardImageMaker from '../compnent/boardImageMaker'
const DetailBoardPage = () => {
  let reviewArr = useSelector((state) => state.reviewReducer)
  // console.log(reviewArr.Reviews[localStorage.no_].title,"여기")
  console.log(localStorage.no_,"여기")
  let reverse = [...reviewArr.Reviews].reverse()
  console.log(reverse,"리버스")
  console.log(reviewArr.Reviews,"원본")
  console.log(reverse[localStorage.no_-1].title,"여기2")
  return (
    <div className="detailPage container">
      <div className="detailPageItem">
        <BoardImageMaker />
        <div className="detailPage_contentBox">
          <div className="detailPage_conetntBox_title">
            <div><h4>{reverse[localStorage.no_-1].title}</h4></div>
          </div>
          <div className="detailPage_conetntBox_content">
            <div dangerouslySetInnerHTML={{ __html: reverse[localStorage.no_ - 1].content }}></div>
          </div>
          <div className="detailPage_contentBox_title_toolBox">
            <div className="detailPage_toolBox_item">
            <div className="item _1 hover"> 수정 </div>
              <div className="item _2 hover"> 삭제 </div>
            </div>
            <div className="detailPage_toolBox_item">
              <div className="item _3 hover">추천</div>
              <div className="item _4 hover">비추천</div>
            </div>
            <div className="detailPage_toolBox_item">
              <div className="item _5">조회수 0</div>
              <div className="item _6">댓글 0</div>
            </div>
          </div>
        </div>
        <div className="detailPage_commentBox">
          <h5>댓글</h5>
          <div className="detailPage_commentList_Wrapper">
            <ul className="detailPage_commentList_Inner">
              <li>
                <div  className="detailPage_comment">
                  <div className='detailPage_profileImg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                  </div>
                  <div className='detailPage_profileBox'>
                    <div>
                      <span>10Lv </span>
                      <span>이승철</span>
                      <span> o신고</span>
                    </div>
                    <div className='comment'>
                      <div>노래 좋네요</div>
                    </div>
                    <div className="recomment hover">댓글</div>
                  </div>
                </div>
              </li>
              <li>
                <div  className="detailPage_comment">
                  <div className='detailPage_profileImg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                  </div>
                  <div className='detailPage_profileBox'>
                    <div>
                      <span>20Lv </span>
                      <span>이선희</span>
                      <span> o신고</span>
                    </div>
                    <div className='comment'>
                      <div>좋은 글 이네요</div>
                    </div>
                    <div className="recomment hover">댓글</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailBoardPage