
import React, { useEffect, useState } from 'react';
import { CChart } from '@coreui/react-chartjs'
import { getTopBorrowedBooks } from '../../../DBHandle/repoBorrowBooks';
import { getForumActivity } from '../../../DBHandle/repoMessages';

export default function ForumMsgsTransfer(){
    const [data, setData] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const ages = await getForumActivity()
            setData(ages)
        }
        fetchData()
    },[])
    
    const getValuesByKey = (key)=>{
        let values = []
        data.map((result, index)=>{
            values.push(result[key])
        })
        return values
    }
    
    return (
            
        <CChart
            type="line"
            data={{
                labels: getValuesByKey("month"),
                datasets: [
                    {
                        label: 'NO. Messages Sent',
                        backgroundColor: "rgba(151, 187, 205, 0.2)",
                        borderColor: "rgba(151, 187, 205, 1)",
                        pointBackgroundColor: "rgba(151, 187, 205, 1)",
                        pointBorderColor: "#fff",
                        data: getValuesByKey("countMsgs"),
                    },
                ],
            }}
        />
        
    );
    
}
