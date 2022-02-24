import AdminSingleQuestion from './AdminQuestions/AdminSingleQuestion';
import Loader from "../Loader/Loader";
import useCompanyQuestions from '../../hooks/questions/useCompanyQuestions';
import { useMutation } from "react-query";
import axios from 'axios';



const AllQuestions = () => {


const Questions = useCompanyQuestions();

let questionArray = [];

const mutation = useMutation(async ({ id1, id2, order1, order2 }) => {
    const res1 = await axios.put(`${process.env.REACT_APP_BASEURL}/api/questions/${id1}`, {
     data: { order: Math.floor(Math.random() * 10000) }
     
        
    }).then(()=>{
      console.log("Prvi")
    })
    
    
    const res3 = await axios.put(`${process.env.REACT_APP_BASEURL}/api/questions/${id2}`, {
      data: { order: order1 },
    }).then(()=> {
      console.log("Treci");
    })
    
    
    
    const res2 = await axios.put(`${process.env.REACT_APP_BASEURL}/api/questions/${id1}`, {
       data: { order: order2 },
    }).then(()=>{
      console.log("Drugi")
    }).catch((err) =>{
      console.log(err.response.data)
    });
    
    
  });

  const orderUp = (id) => {
      let temp = {};
     const currentIndex = questionArray.map((question) => {
      return question.id;
    }).indexOf(id);
    const currentQuestion = questionArray[currentIndex];
    const previousQuestion = questionArray[currentIndex - 1];
    if(previousQuestion !== undefined){
      temp = questionArray[currentIndex];
      questionArray[currentIndex] = questionArray[currentIndex - 1];
      questionArray[currentIndex - 1] = temp;
    
    let id1 = currentQuestion.id;
    let id2 = previousQuestion.id;
    let order1 = currentQuestion.attributes.order;
    let order2 = previousQuestion.attributes.order

    mutation.mutate({
        id1 ,
        id2 ,
        order1,
        order2
    })
  }
}

const orderDown = (id) => {
  let temp = {};
  const currentIndex = questionArray.map(function (question) {
      return question.id;
    })
    .indexOf(id);
  const currentQuestion = questionArray[currentIndex];
  const nextQuestion = questionArray[currentIndex + 1];
  if (nextQuestion !== undefined) {
    temp = questionArray[currentIndex];
    questionArray[currentIndex] = questionArray[currentIndex + 1];
    questionArray[currentIndex + 1] = temp;

    let id1 = currentQuestion.id;
    let id2 = nextQuestion.id;
    let order1 = currentQuestion.attributes.order;
    let order2 = nextQuestion.attributes.order

    mutation.mutate({
      id1,
      id2,
      order1,
      order2
    });
  }
};


if(Questions.status === 'loading'){
    return <div><Loader/></div>
}
if(Questions.status === 'error'){
    return <div>Error...</div>
}
if (Questions.status === "success") {
    questionArray = Questions.data.data.data;
  }

return (
   
    <div>

      {Questions.data.data.data.map((question,index) => (
          <AdminSingleQuestion key = {index} question={question.attributes.text} orderUp={orderUp} orderDown={orderDown} index={index} id={question.id}/>
      ))}
    </div>)

}

export default AllQuestions;