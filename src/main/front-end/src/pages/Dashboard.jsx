import ChartSection from "../components/ChartSection"
import NewestSection from "../components/NewestSection";

const Dashboard = () => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Admin DashBoard</h1>
            </div>

            <ChartSection title="최근 일주일 로그인 수" type="seven"/>

            <br />

            <ChartSection title="모든 날짜 로그인 수" type="all"/>

            <br /><br />

            <div className="row align-items-md-stretch">
                <NewestSection title="The Newest Board"/>
                <NewestSection title="The Newest Photo Board"/>
            </div>
        </>
    );
}

export default Dashboard;