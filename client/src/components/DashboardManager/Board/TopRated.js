
import React, { useEffect, useState } from 'react';
import { CChart } from '@coreui/react-chartjs'
import { getTopRatedBooks } from '../../../DBHandle/repoRatings';

export default function TopRatedBooks(){
    const [data, setData] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const ratings = await getTopRatedBooks()
            setData(ratings)
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
                        label: 'Avarage Rating',
                        backgroundColor: '#4BC0C0',
                        data: getValuesByKey("averageRating"),
                    },
                ],
            }}
            labels="books"
        />
        
    );
    
}
