import { useEffect, useState } from 'react';
import './MembersManagement.css'

const MembersManagement = () => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch('/react/admin/members') // 모든 member 조회, 단 자기 정보는 가져오지 않는다.
            .then(res => res.json())
            .then(data => setMembers(data))
            .catch(err => console.log(err))
    });

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Members</h1>
                <div>
                    <span className="info">* 더블클릭을 하면 수정 칸으로 바뀝니다</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="info">* 수정 후 엔터를 누르면 수정이 완료됩니다</span>
                </div>
            </div>

            <div className="bd-example">
                <table className="table table-hover" style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>NICKNAME</th>
                            <th>EMAIL</th>
                            <th>GENDER</th>
                            <th>AGE</th>
                            <th>PHONE</th>
                            <th>ADDRESS</th>
                            <th>ENROLL</th>
                            <th>STATUS</th>
                            <th>ADMIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.nickName}</td>
                                    <td>{item.email == null ? '-' : item.email}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.age}</td>
                                    <td>{item.phone == null ? '-' : item.phone}</td>
                                    <td>{item.address == null ? '-' : item.address}</td>
                                    <td>{item.enrollDate}</td>
                                    <td>
                                        <div className={item.memberStatus == 'Y' ? 'select' : ''}>Y</div>
                                        <div className={item.memberStatus == 'N' ? 'select' : ''}>N</div>
                                    </td>
                                    <td>
                                        <div className={item.isAdmin != 'N' ? 'select' : ''}>Y</div>
                                        <div className={item.isAdmin == 'N' ? 'select' : ''}>N</div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default MembersManagement;