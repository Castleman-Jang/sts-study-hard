import { useEffect, useState } from 'react';
import style from './AttmsManagement.module.css';
const AttmsManagement = () => {

    const [boards,setBoards] = useState([]);
    const [attms,setAttms]=useState([]);
    const [pageInfo, setPageInfo]=useState(null);
    const [searchParams, setSearchParams]=useState(null);

    useEffect(()=>{
        fetchBoards(currentPage);
    },[currentPage])

    const fetchBoards = page => {
        fetch('/react/admin/attms')
        .then(res=>res.json())
        .then(data=>{
            setBoards(data.list);
            setAttms(data.aList);
        })
        .catch(err=>console.log(err))
    }


    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Attachment</h1>
            </div>

            <div className="row g-4 py-1 row-cols-lg-3">
                <div th:each="b : ${list}">
                    <div className="content" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable">
                        <input type="hidden" className="no" th:value="${b.boardId}"/>
                            <div className="imgsDiv">
                                {/* 첨부파일 미리보기 */}
                            </div>
                            <h3 className="fs-2 text-body-emphasis">{/*<!-- 제목 -->*/}</h3>
                            <p style={{height: '50px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical'}}>{/*<!-- 내용 -->*/}</p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                </svg> <span className={`${style['attm-info']}`} writer>{/*<!-- 글쓴이 -->*/}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-event" viewBox="0 0 16 16">
                                    <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                </svg> <span className="attm-info createDate">{/*<!-- 작성일자 -->*/}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg> <span className='attm-info count'>{/*<!-- 조회수 -->*/}</span>
                            </p>
                    </div>
                    <button th:className="|${b.status == 'Y' ? 'btn btn-primary' : 'btn btn-dark'} changeState|" th:text="${b.status == 'Y' ? '게시 중' : '게시 중단'}"></button>
                </div>
            </div>

            <nav aria-label="Standard pagination example" style={{float: 'right'}}>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" th:href="@{${loc}(page=${pi.currentPage-1})}" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item" th:each="p : ${#numbers.sequence(pi.startPage, pi.endPage)}">
                        <a className="page-link" th:href="@{${loc}(page=${p})}" th:text="${p}"></a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" th:href="@{${loc}(page=${pi.currentPage+1})}" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>


            <div className="modal show" id="exampleModalCenteredScrollable" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalCenteredScrollableTitle"></h1>
                            <div className="modal-body" style={{textAlign: 'right', fontSize: '14px'}}></div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body"></div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">게시글 올리기</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AttmsManagement;