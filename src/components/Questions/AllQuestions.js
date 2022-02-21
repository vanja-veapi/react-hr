import AdminSingleQuestion from './AdminQuestions/AdminSingleQuestion';
import Loader from "../Loader/Loader";
import useCompanyQuestions from '../../hooks/questions/useCompanyQuestions';



const AllQuestions = () => {


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
          <AdminSingleQuestion key = {index} question={question.attributes.text} index={index} id={question.id}/>
      ))}
    </div>)

}

export default AllQuestions;