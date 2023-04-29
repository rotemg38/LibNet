
import React, { useEffect, useState } from 'react';
import { CChart } from '@coreui/react-chartjs'
import { getTopBorrowedBooks } from '../../../DBHandle/repoBorrowBooks';

export default function TopBorrowedBooks(){
    const [data, setData] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const ages = await getTopBorrowedBooks()
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
            type="bar"
            data={{
                labels: getValuesByKey("bookName"),
                datasets: [
                    {
                        label: 'Borrowes Number',
                        backgroundColor: '#f87979',
                        data: getValuesByKey("count"),
                    },
                ],
            }}
            labels="books"
        />
        
    );
    
}
