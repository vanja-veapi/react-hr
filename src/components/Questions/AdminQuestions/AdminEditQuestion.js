import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';



const AdminEditQuestion = (props) => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const [text, setText] = useState('');
    const [type, setType] = useState('text');
    const [id, setId] = useState('');
   

    const submit = async () => {
        if (text !== "") {
             await axios.put(`${process.env.REACT_APP_BASEURL}/api/questions/` + location.state.id, {
                    data: {
                        text: text,
                        type: type,
                    },
                }).then((data) => {
                    navigate('/questions-admin');
                })
                
        }
    };

    const getQuestion = async (setText, setType, setId) => {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/questions/${location.state.id}`);
        setText(response.data.data.attributes.text);
        setType(response.data.data.attributes.type);
        setId(response.data.data.id);

        return response.data.data;
    };

    const getQ = useQuery(
        ['questions', setText, setType, setId],
        () => getQuestion(setText, setType, setId)
    );

    const { mutate: editQuestion } = useMutation(submit);
    

  return (
      <div className="container m-4 col-md-5">
          <h2>Edit Question</h2>
          <div className="form-group my-4">
              <label className="h6">Question text</label>
              <input placeholder='Question text' type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)}/>
          </div>

          <div>
              <div className='col-6'>
                  <div className="form-group">
                      <label className="h6">Question type</label>
                      <Form.Select onChange={(e) => setType(e.target.value)}>
                          <option>Select question type</option>
                          <option value="text">Text</option>
                          <option value="long_text">Long text</option>
                          <option value="image">Image</option>
                      </Form.Select>
                      
                  </div>
              </div>
          </div>
          <div className='d-flex justify-content-end'>
              <button value="Save" className="btn btn-primary mt-3 ml-auto basic-info text-right" onClick={() => editQuestion()}>Save</button>
          </div>
      </div>
  )
}

export default AdminEditQuestion;