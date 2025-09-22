import { useEffect, useState } from 'react';
// import './MembersManagement.css' // 전역 css 구문 (어디에서도 적용되는 css구문이라는말 )
import common from './PagesCommon.module.css';
import style from './MembersManagement.module.css';

const MembersManagement = () => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch('/react/admin/members') // 모든 member 조회, 단 자기 정보는 가져오지 않는다.
            .then(res => res.json())
            .then(data => setMembers(data))
            .catch(err => console.log(err))
    }, []);

    const [duplicate, setDuplicate] = useState(false);

    //                   value, 'name' , item
    const renderCell = (value, field, member) => {
        const isEditing = editingCell?.memberId == member.id && editingCell?.field == field; // editingCell이 있어? 있으면 memberId를 꺼내라 

        if (isEditing) {
            if (field == 'email') {
                const safeEditValue = (editValue == '-' || !editValue) ? '@naver.com' : editValue;
                const emailSplit = safeEditValue.split('@');
                const emailId = emailSplit[0] || '';
                const emailDomain = emailSplit[1] || 'naver.com';

                return (
                    <>
                        <input
                            type="text"
                            value={emailId}
                            onChange={e => setEditValue(e.target.value + '@' + emailDomain)}
                            onKeyUp={handleKeyPress}
                            autoFocus
                            size="5"
                        />
                        @
                        <select value={emailDomain} onChange={e => setEditValue(emailId + '@' + e.target.value)}>
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="nate.com">nate.com</option>
                            <option value="hanmail.net">hanmail.net</option>
                        </select>
                    </>
                );
            } else if (field == 'gender') {
                return (
                    <>
                        <label>
                            <input
                                type="radio"
                                name={`gender-${member.id}`}
                                value="M"
                                checked={editValue == 'M'}
                                onChange={e => setEditValue(e.target.value)}
                                onKeyUp={handleKeyPress}
                            /> M
                        </label>&nbsp;
                        <label>
                            <input
                                type="radio"
                                name={`gender-${member.id}`}
                                value="F"
                                checked={editValue == 'F'}
                                onChange={e => setEditValue(e.target.value)}
                                onKeyUp={handleKeyPress}
                            /> F
                        </label>&nbsp;
                    </>
                );

            } else if (field == 'age') {
                return (
                    <input
                        type="number"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyUp={handleKeyPress}
                        autoFocus
                        min="0"
                        max="100"
                        size="5"
                    />
                )
            } else if (field == 'isAdmin') {
                return (
                    <>
                        <label>
                            <input
                                type="radio"
                                name={`admin-${member.id}`}
                                value='1'
                                checked={editValue == '1'}
                                onChange={e => setEditValue(e.target.value)}
                                onKeyUp={handleKeyPress}
                            /> 상위
                        </label>&nbsp;
                        <label>
                            <input
                                type="radio"
                                name={`admin-${member.id}`}
                                value='2'
                                checked={editValue == '2'}
                                onChange={e => setEditValue(e.target.value)}
                                onKeyUp={handleKeyPress}
                            /> 하위
                        </label>&nbsp;
                        <label>
                            <input
                                type="radio"
                                name={`admin-${member.id}`}
                                value='N'
                                checked={editValue == 'N'}
                                onChange={e => setEditValue(e.target.value)}
                                onKeyUp={handleKeyPress}
                            /> X
                        </label>&nbsp;
                    </>
                )
            }

            return (
                <input type="text"
                    value={editValue ? editValue : ''}
                    onChange={e => setEditValue(e.target.value)}
                    autoFocus
                    size="12"
                    onKeyUp={handleKeyPress}
                    className={duplicate ? 'vibration' : ''}
                />
            );
        }
        return <span onDoubleClick={() => handleDoubleClick(member, field, value)}>
            {field =='isAdmin' ? (value == '1' ? '상위' : (value =='2' ? '하위' : '-')) : value || '-'}
            </span>
    }

    const [editingCell, setEditingCell] = useState(); // "누구의 정보"인지를 담을거임, "어떤 필드"인지 저장
    const [editValue, setEditValue] = useState(); // 수정할 데이터 저장
    const editableColumns = ['name', 'nickName', 'email', 'gender', 'age', 'phone', 'address', 'isAdmin'];
    const handleDoubleClick = (member, field, value) => {
        if (!editableColumns.includes(field)) {
            alert('수정할 수 없는 항목입니다');
            return;
        }
        setEditingCell({ memberId: member.id, field });
        setEditValue(value);
    }

    useEffect(() => {
        document.body.addEventListener('click', handleBodyClick);

        // cleanup과정 (handleBodyClick 함수에 걸린 이벤트리스너를 지우는거임)
        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        }
    }, [editingCell]) // useEffect에서는 의존성 주입을 잘 해야한대 

    const handleBodyClick = e => {
        if (e.target.tagName != 'INPUT' && e.target.tagName != 'SELECT' && editingCell) {
            cancelEdit();
        }
    }

    const cancelEdit = () => {
        setEditValue('');
        setEditingCell(null);
    }

    const handleKeyPress = e => {
        if (e.key == 'Enter') {
            saveEdit();
        }
    }

    const saveEdit = () => {
        if (!editingCell) return;

        fetch('/react/admin/members', {
            method: 'put',
            headers: { 'content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ // 보낼 데이터를 JSON형식으로 보내줘야함. 
                val: editValue,
                col: editingCell.field,
                id: editingCell.memberId
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data == -1) {
                    setDuplicate(true);
                    setTimeout(() => setDuplicate(false), 400);
                } else if (data == 1) {
                    setMembers(prev => prev.map(member =>
                        member.id == editingCell.memberId
                            ? { ...member, [editingCell.field]: editValue }
                            : member
                    ));
                    cancelEdit();
                } else {
                    alert('수정을 실패했습니다.');
                    cancelEdit();
                }
            })
            .catch(err => console.log(err));
    }

    const handleStatusToggle = (member, field, value) => {
        fetch('/react/admin/members', {
            method: 'put',
            headers: { 'content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
                id: member.id,
                col: field,
                val: value
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data == 1) {
                    setMembers(prev => prev.map(m =>
                        m.id == member.id
                            ? { ...m, [field]: value }
                            : m
                    ))
                } else {
                    alert('상태변경을 실패하여 페이지가 새로고침 됩니다.')
                    location.reload();
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Members</h1>
                <div>
                    <span className={style.info}>* 더블클릭을 하면 수정 칸으로 바뀝니다</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="info">* 수정 후 엔터를 누르면 수정이 완료됩니다</span>
                </div>
            </div>

            <div className="bd-example">
                <table className={`table table-hover ${common.table}`} style={{ textAlign: 'center' }}>
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
                                    <td>{renderCell(item.id, 'id', item)}</td>
                                    <td>{renderCell(item.name, 'name', item)}</td>
                                    <td>{renderCell(item.nickName, 'nickName', item)}</td>
                                    <td>{renderCell(item.email, 'email', item)}</td>
                                    <td>{renderCell(item.gender, 'gender', item)}</td>
                                    <td>{renderCell(item.age, 'age', item)}</td>
                                    <td>{renderCell(item.phone, 'phone', item)}</td>
                                    <td>{renderCell(item.address, 'address', item)}</td>
                                    <td>{renderCell(item.enrollDate, 'enrollDate', item)}</td>
                                    <td>
                                        <div
                                            className={item.memberStatus == 'Y' ? common.select : ''}
                                            onClick={() => item.memberStatus == 'N' ? handleStatusToggle(item, 'memberStatus', 'Y') : null}
                                            style={{ cursor: 'pointer' }}
                                        >Y</div>
                                        <div
                                            className={item.memberStatus == 'N' ? common.select : ''}
                                            onClick={() => item.memberStatus == 'Y' ? handleStatusToggle(item, 'memberStatus', 'N') : null}
                                        >N</div>
                                    </td>
                                    <td>{renderCell(item.isAdmin, 'isAdmin', item)}</td>
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