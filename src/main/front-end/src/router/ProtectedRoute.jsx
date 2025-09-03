import { useContext, useEffect, useRef } from "react";
import { AdminContext } from "../context/AdminContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, level }) => {
    const { admin } = useContext(AdminContext);
    const location = useLocation(); // ex) /members or /boards 같이 현재의 url값을 감지한다 ? 가지고있는다 ? ? 
    const currentPath = useRef(location.pathname);
    const alertShown = useRef(false);

    useEffect(()=>{
        if(currentPath.current != location.pathname){
            alertShown.current = false;
            currentPath.current = location.pathname;
        }
    },[location.pathname])

    if (!admin) return <div>권한 확인 중...</div>;

    if (admin.isAdmin != level) { // alert창이 두 번 뜨는걸 한 번만 뜨게 바꾸는거임 
        if(!alertShown.current){ // alertShown의 현재 값을 가져온다 . 지금 기준 false를 가져옴
            alert('접근권한이 없습니다. 상위 관리자만 접근 가능한 메뉴입니다.');
            alertShown.current = true; 
        }
        return <Navigate to="/" replace/>
    }
    return children;
}

export default ProtectedRoute;