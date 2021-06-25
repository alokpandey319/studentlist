
import React, { Component } from "react";
import "./Css/Dashboard.css";
import Addpage from "./Addpage";
import axios from "axios";
class Dashboard extends Component{
  constructor(props){

   super(props)
   this.state={

    studentdata:[]
  }
   this.getStudentList()
   console.log(props);
  }
  
  

 getStudentList = () => {
    axios.get("http://localhost:5000/").then((res) => {
      this.setState({studentdata:res.data});
    });
  };

  componentDidMount(){
    //hide add form
  document.querySelector(".overlay")?.addEventListener("click", function (e) {
    if (
      e.target.className.includes("close-btn") ||
      e.target.className.includes("overlay")
    )
      document.querySelector(".overlay")?.classList.add("hidden");
  });
  }


  

  //show add form
     showdashboard = () => {
    const form = document.querySelector(".overlay");
    document.querySelector(".overlay")?.classList.remove("hidden");
    form.querySelector('input[name=name]').value = null;
    form.querySelector('input[name=email]').value = null;
    form.querySelector('input[name=id]').value = null;
    form.querySelector('input[name=qualification]').value = null;
    document.querySelector(".overlay").querySelector('button[type=submit]').textContent = 'Submit';

  };


  

  //delete data
   studentdelete = (id) => {
    document.querySelector(".delete-overlay").classList.remove("hidden");
    axios
      .delete("http://localhost:5000/", {
        data: {
          id,
        },
      })
      .then(
        (res) => {
          this.getStudentList();
          console.log(res.data.message);
          document.querySelector(".delete-overlay").classList.add("hidden");
        },
        (err) => {
          console.log(err);
        }
      );
  };
 
//edit data
   studentedit = (id) => {
    document.querySelector(".overlay")?.classList.remove("hidden");
    const form = document.querySelector("form");
    const student = (this.state.studentdata.find(student => student.id === id));

    form.querySelector('input[name=name]').value = student.name;
    form.querySelector('input[name=email]').value = student.email;
    form.querySelector('input[name=id]').value = student.id;
    form.querySelector('input[name=qualification]').value = student.qualification;
    form.querySelector('button[type=submit]').textContent = 'edit';
    

  }

render(){
return(
    <div className="Main">
      <div className="delete-overlay hidden">
        <p>Deleting Student Data...</p>
      </div>
      <div className="overlay hidden">
        <Addpage state={this}></Addpage>
      </div>
      <div className="Header">
        <div>
          <b>Student List</b>
        </div>
        <div className="btn-Add">
          <button onClick={this.showdashboard}>
            <i className="fas fa-user-plus"></i>Add
          </button>
        </div>
      </div>
      <div>
        <div>
          <div className="Main-table">
            <div className="table-header table-row">
              <p>S.No</p>
              <p>Name</p>
              <p>Email</p>
              <p>Qualification</p>
              <p>Created On</p>
              <p>Action</p>
            </div>
            <div className="table-content">
              {this.state.studentdata.map((student, index) => {
                const date = new Date(student.createdon);
                return (
                  <div className="table-row">
                    <p>{index + 1}</p>
                    <p>{student.name} </p>
                    <p>{student.email}</p>
                    <p>{student.qualification}</p>
                    <p>
                      {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                    </p>
                    <p>
                      <div>
                        <button className="btn" onClick={this.studentedit.bind(null, student.id)}>
                          <i className="fas fa-user-edit"></i>
                        </button>
                        <button
                          className="btn"
                          onClick={this.studentdelete.bind(null, student.id)}
                        >
                          <i className=" icon-delete fas fa-user-slash"></i>
                        </button>
                      </div>
                    </p>
                  </div>
                );
              })}
              <p>
                {this.state.studentdata.length === 0 ? "  No Student Records found." : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}
export default Dashboard;