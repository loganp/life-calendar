import React, { useState }from "react";
import { Link, Outlet } from "react-router-dom";
import { publish, display } from "./services/CommentService";

export type ExpectancyProps = {
  weeksLeft: number,
  weeks: string[],
  getSearchClick: () => void,
}

export function Profile(props: ExpectancyProps) {
  let {weeksLeft, getSearchClick} = props;

  const [submitted, setSubmitted] = useState(false);
  
  const getExpectancy = () => {
    setSubmitted(true);
    getSearchClick();
  }

  const resetPage = () => {
    setSubmitted(false);
  }

  const weeks: string[] = []
  for (let i = 0; i< weeksLeft; i++) {
    weeks.push(" ");
  }

  var renderBoxes = weeks.map(item =>  <div className="boxes"> {item} </div>);

  return (
    <div>
      {/* If submitted show expected output*/}
      {submitted ? (
        <>
          <p>Weeks left is: {weeksLeft}</p>
            <p>Visual Representation:</p>
            <div className="display">
              <div className="boxContainer">
                {renderBoxes}
              </div>
              <div className="button">
              <button onClick={resetPage}>
                Reset
              </button>
            </div>
          </div>
        </>
      ):(
        <>
        {/* Else, if no data has been sent, show form */}
          <SearchDataForm getExpectancy={getExpectancy} />
        </>
      )}
    </div>
    
  )
}

export const SearchDataForm = ({getExpectancy}) => {
  return (
    <div className="formContainer">
      <div className="form">
          <div>
            <label htmlFor="age">Age: </label> 
            <input
              type="text"
              id="age"
              required
              name="age"
              />
            <br />

            <label htmlFor="sex">Sex: </label>
            <select name="sex" id="sex">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <br />

            <label htmlFor="ethnicity">Ethnicity: </label>
            <select name="eth" id="eth">
              <option value="hispanic">Hispanic</option>
              <option value="amerInAlaska">Non-Hispanic American Indian or Alaska Native</option>
              <option value="asian">Non-Hispanic Asian</option>
              <option value="black">Non-Hispanic Black</option>
              <option value="white">Non-Hispanic White</option>
            </select>
            <br />
            <button onClick={getExpectancy}> Search! </button>
        </div>
      </div> 
    </div>
  )
}

const initialCommentState = {
  name: "",
  comment: "",
  date: "",
};

export type CommentExpectancyProps = {
}

export function Comments(){

  const [comment, setComment] = useState(initialCommentState);
  const [returnedComments, setRetCom] = useState(initialCommentState);
  const [submittedComments, setSubmitComment] = useState(false);

  const postComment = () => {
    setSubmitComment(true);
    publish(comment);
  }

  const getComments = () => {
    display()
    .then(res => {
      //console.log("name? or com?", res.name, res.comment)
      setRetCom(res);
    });
  }

  const handleInputChange = event => {
    const {name, value} = event.target;
    setComment( {...comment, [name]: value});
  }

  //var renderComments = returnedComments.map(item => <div> {item} </div>)

  return (
    <div>
      {submittedComments ? (
        <>
          <button onClick={getComments}>Comments?</button>
          <p>the Comments:</p>
          <br /> 
          {/*<p>Returned Comments: {returnedComments}</p>*/}
          <p>Name: {returnedComments[0].name}</p>
          <p>Comment: {returnedComments[0].comment}</p>
        </>
      ):(
        <CommentForm postComment={postComment} handleInputChange={handleInputChange} comment={comment}/> 
      )}
 
    </div>
  )
}


export const CommentForm = ({postComment, handleInputChange, comment}) => {
  return (
    <div>
      <div>
        <h2>Submit a Comment</h2>
        <form>
          <p>
            Name: 
            <input 
            type="text"
            id="name"
            required
            onChange={handleInputChange} 
            name="name"
            value={comment.name}
            />
          </p>
          <p>
            Comment:
            <input 
            type="text"
            id="comment"
            required
            onChange={handleInputChange} 
            name="message"
            value={comment.message}
            />

          </p>
          {/*<p><input type="submit" value="Comment" /></p>*/}
        <button onClick={postComment}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export const Header = () => {
  return (
  <div>
    <div className="header">
      <h1> Life Calendar </h1>
      <h3> How much longer do you have? </h3>
      <Link to="/">Dashboard</Link>
      <br />
      <Link to="/comments">Comments</Link>
      <Outlet />
    </div>
  </div>
  );
}