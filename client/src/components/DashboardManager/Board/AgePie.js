import React, { useEffect, useState } from 'react';
import { CChart } from '@coreui/react-chartjs'
import { getGroupByAges } from '../../../DBHandle/repoUsers';

export default function AgePie(){
    const [data, setData] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const ages = await getGroupByAges()
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
    const colors = [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FF8C00',
        '#90EE90',
        '#87CEFA',

      ];
    
      const backgroundColor = data.map((label, index) => {
        return colors[index % colors.length];
      });

    return (
            
        <CChart
            type="doughnut"
            data={{
                labels: getValuesByKey("_id"),
                datasets: [
                    {
                        backgroundColor: backgroundColor,
                        data: getValuesByKey("count"),
                    },
                ],
            }}
        />
        
    );
    
}