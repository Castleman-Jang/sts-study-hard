import { useEffect, useState } from "react";

const NewestSection = ({ title }) => {
    const [board, setBoard] = useState([]);

    useEffect(() => {
        fetch('/react/admin/newest')
            .then(res => res.json())
            .then(data => {
                const filter = data.filter(item => item.boardType == (title.includes('Photo') ? 2 : 1));
                setBoard(filter);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="col-md-6">
            <div className={`h-100 p-5 rounded-3 ${title.includes('Photo') ? 'bg-light border' : 'text-bg-dark'}`}>
                <h2>{title}</h2>
                <table style={{ textAlign: 'center', width: '100%' }}>
                    <tbody>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Writer</th>
                            <th>Date</th>
                            <th>Views</th>
                        </tr>
                        {board.map(element => {
                            return (
                                <tr key={element.boardId}>
                                    <td>{element.boardId}</td>
                                    <td>{element.boardTitle}</td>
                                    <td>{element.nickName}</td>
                                    <td>{element.boardCreateDate}</td>
                                    <td>{element.boardCount}</td>
                                </tr>
                            )
                        })}

                        <tr></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default NewestSection;