import React from "react";
const SingleUserQuestion = (props) => {


    return (
        <>
            <div>
                <h6>{props.question}</h6>
                <div className="mt-2">
                    <input type="text" className="form-control mb-3" />
                </div>
            </div>
        </>
    )
}

export default SingleUserQuestion;