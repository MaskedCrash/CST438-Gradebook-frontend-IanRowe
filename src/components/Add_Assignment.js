import React  from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js';



class Add_Assignment extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			courseId:0, 
			name:'', 
			date:''
		};
    };
 
	handleIdChange = (event) => {
		this.setState( {courseId: event.target.value});
	}
	
	handleNameChange = (event) => {
		this.setState({name: event.target.value});
	}
	
	handleDateChange = (event) => {
		this.setState({date: event.target.value});
    }
	//Pull the Lever, Kronk.
	//But in all seriousness, this is the "go" button.
	assignmentButtonPushed = (event) => {
		event.preventDefault();
		//Forces them to put something in. Lazy fellas.
		
		console.log("Add_Assignment.assignmentButtonPushed");
		const token = Cookies.get('XSRF-TOKEN');
		
		//Cart over the data
		//Reminder: URL should look like this ish /assignment?assignmentName="+assignment.getName()+"&dueDate=2021-09-01&courseID="+TEST_COURSE_ID
		
		var courseId = this.state.courseId;
        var name = this.state.name;
        var date = this.state.date
		fetch(`${SERVER_URL}/assignment?assignmentName=` + name + `&dueDate=` + date + `&courseID=` + courseId,
        {
          method: 'POST',
          headers: { 'X-XSRF-TOKEN': token }
        })
		.then(res => {
			if (res.ok) {
			  toast.success("A new Assignment has been added", {
				  position: toast.POSITION.BOTTOM_LEFT
			  });
			  console.log("A new Assignment has been added");
			} else {
				toast.error("Error, course not added", {
				position: toast.POSITION.BOTTOM_LEFT
					});
				console.error('Error Status =' + res.status);
			}})
			.catch(err => {
				toast.error("Error, course not added", {
					position: toast.POSITION.BOTTOM_LEFT
				});
				console.error(err);
			})
	
		}
		
		
	
  
   
  render() {
		
         return (
             <div>
            <div className="App">
             <h4>Please Fill out the following form to submit a new Assignment </h4>
             
             <form onSubmit={this.assignmentButtonPushed}>
                <p>Enter the Assignment Name</p>
                <input name='assignmentName' onChange={this.handleNameChange} />
                <p>Enter the due Date</p>
                <input type="date" name='dueDate' onChange={this.handleDateChange}  />
                <p>Enter the Course ID</p>
                <input variant="outlined" type="number" name='courseId' onChange={this.handleIdChange}/>
                <input type="submit" name="submit"/>
            </form>
             
            
             <ToastContainer autoClose={1500} /> 
             </div>
             </div>
             
         )
     }
}  

export default Add_Assignment;