import React from 'react';
import SummaryDummyData from "./SummaryDummyData";
import Summaryitem from "./Summaryitem";

const Summarylist = () => {
    return (
            <React.Fragment>
                {
                    SummaryDummyData.map((item, index) => (
                        <Summaryitem recentItem={item} key={index}/>
                    ))
                }
            </React.Fragment>
    );
};

export default Summarylist;
