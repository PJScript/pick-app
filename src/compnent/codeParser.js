const codeParser = (data) => {
  if(data === '코드스테이츠'){
    return 'pt1'
  }else if(data === '바닐라코딩'){
    return 'pt2'
  }else if(data === '스파르타코딩'){
    return 'pt3'
  }else if(data === '팀노바'){
    return 'pt4'
  }else if(data === '위코드'){
    return 'pt5'
  }else if(data === '코드스쿼드'){
    return 'pt6'
  }else if(data === '알고리즘잡스'){
    return 'pt7'
  }else if(data === '부스트캠프'){
    return 'pt8'
  }else if(data === '우아한테크'){
    return 'pt9'
  }else if(data === '패스트캠퍼스'){
    return 'pt10'
  }else if(data === '서울42'){
    return 'pt11'
  }else if(data === '멋쟁이사자처럼'){
    return 'pt12'
  }else if(data === '삼성ssafy'){
    return 'pt13'
  }else{
    return ''
  }
}

export default codeParser
