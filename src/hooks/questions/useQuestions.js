import {useQuery} from 'react-query'
import axios from 'axios'

 const getQuestions = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/questions?populate=*`);
    return response.data;
}

export default function useQuestions(){
    return useQuery(['questions'],getQuestions);
}