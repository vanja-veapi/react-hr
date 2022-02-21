import SingleUserQuestion from "./SingleUserQuestion";
import Loader from "../../Loader/Loader";
import useCompanyQuestions from '../../../hooks/questions/useCompanyQuestions';



const AllUserQuestions = () => {


const Questions = useCompanyQuestions();

if(Questions.status === 'loading'){
    return <div><Loader/></div>
}
if(Questions.status === 'error'){
    return <div>Error...</div>
}

return (
   
    <div>

      {Questions.data.data.data.map((question,index) => (
          <SingleUserQuestion key = {index} question={question.attributes.text} index={index} id={question.id}/>
      ))}
    </div>)

}

export default AllUserQuestions;