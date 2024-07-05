import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import QnaInsertContainer from '../../containers/board/QnaInsertContainer'
import styles from '../css/qnaInsert.module.css'


const Insert = () => {
  return (
    <>
        <MainLayout>
          <span className={styles.title} style={{textAlign:'center'}}>
            <h1 className={styles.doHyeonRegular}>무엇이든 물어보세요!</h1>
            <p>운영원칙에 위배되는 글은 관리자에 의해 무통보 삭제될 수 있습니다.
            </p>
          </span>
          <QnaInsertContainer status={'답변 대기'} />
        </MainLayout>
    </>
  )
}

export default Insert