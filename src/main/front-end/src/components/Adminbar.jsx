import { Link } from 'react-router-dom';
import style from './Adminbar.module.css';

const Adminbar = () => {
    return(
        <div className={`${style.sidebar} sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary`}>
            <div className={`${style['offcanvas-lg']} offcanvas-end bg-body-tertiary`} tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className={`${style['nav-link']} d-flex align-items-center gap-2`} to="/"> 
                                <svg className={style.bi}>
                                    <use xlinkHref="#house-fill" />
                                </svg> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`${style['nav-link']} d-flex align-items-center gap-2`} to="/members"> 
                                <svg className={style.bi}>
                                    <use xlinkHref="#people" />
                                </svg> Members
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`${style['nav-link']} d-flex align-items-center gap-2`} to="/boards">
                                <svg className={style.bi}>
                                    <use xlinkHref="#file-earmark-text" />
                                </svg> General Board
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`${style['nav-link']} d-flex align-items-center gap-2`} to="/attms">
                                <svg className={style.bi}>
                                    <use xlinkHref="#puzzle" />
                                </svg> Attachment Board
                            </Link>
                        </li>
                    </ul>

                    <hr className="my-3"/>

                    <ul className="nav flex-column mb-auto">
                        <li className="nav-item">
                            <a className={`${style['nav-link']} d-flex align-items-center gap-2`} href="http://localhost:8080/member/logout"> 
                                <svg className={style.bi}>
                                    <use xlinkHref="#door-closed" />
                                </svg> Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Adminbar;