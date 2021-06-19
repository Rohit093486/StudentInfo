import './Add.css';
import './Table.css';
import { Component } from "react";
import { toast } from "react-toastify";

class AddUser extends Component{
  constructor() {
    super();
    this.index = -1;
    this.studentData = localStorage.studentData ? JSON.parse(localStorage.studentData) : [];
    this.state = {      
      stdInfo: this.studentData,
      emailErr: "",
      nameErr: ""
    }
  }
  // componentDidMount() {
  //   this.refs.name.focus();
  // }

  vaild = () => {
    if (!this.refs.email.value){
      this.setState({
        emailErr: "please enter your Email",
      })
    }
    else if(!this.refs.email.value.includes("@")){
      this.setState({
         emailErr:"please enter your vaild Email"
      })
    }
    else if(!this.refs.name.value){
      this.setState({
          nameErr:"please enter your name"
      })
    }    
    else {
    return true;
}
  }

  submit = (e, index = -1) => {
    this.setState({
      nameErr:"",
      emailErr:""
  })
    e.preventDefault();    
    let stdInfo = this.state.stdInfo;
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let qualification = this.refs.qualification.value;
    let date = new Date().toDateString()
    
    if (this.vaild()) {
      if (index === -1) {
        let data = {
          name, email, qualification, date
        }
        // console.log(data);
        stdInfo.push(data);
      }
      else {
        stdInfo[index].name = name;
        stdInfo[index].email = email;
        stdInfo[index].qualification = qualification;
      }
      this.studentData = stdInfo;
      localStorage.setItem('studentData', JSON.stringify(stdInfo));
      this.index = -1;
      this.refs.myForm.reset();
      toast.success("Data Add Successfully");
    }
  }

  // Remove

  Remove = (index) => {
    let stdInfo = this.studentData;
    stdInfo.splice(index, 1);
    toast.warn("Data Remove");
    localStorage.setItem('studentData', JSON.stringify(stdInfo));
    this.studentData=stdInfo
    this.setState({
      stdInfo: stdInfo
    });
  }

  // Edit

  Edit = (index) => {
    let data = this.studentData[index];
    this.refs.name.value = data.name;
    this.refs.email.value = data.email;
    this.refs.qualification.value = data.qualification;
    this.index = index;    
  }
  
  render() {
    let stdInfo = this.state.stdInfo;
    return (
      <>
        {/* ADDForm */}

        <div class="modal fade" id="addData" tabindex="-1" aria-labelledby="exampleModalLabel" 
         aria-hidden="true" style={{background:"rgba(21, 192, 178, 0.089)"}}>
            <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">                   
                  <h5 class="modal-title" id="exampleModalLabel" style={{color:'#00bdd6fb'}}>Add New Student</h5>
                  <button type="button" class="close " data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div> 
                <div class="modal-body" >
                <form className="form" ref="myForm">
                         <div className="input_field">
                        <label>Name<span className="span">*</span> :</label>                        
                    <input type="text" ref="name" className="input" />                    
                  </div>
                  <p>{this.state.nameErr}</p>
                 
                  
          
                  <div className="input_field">
                        <label>E-mail <span className="span">*</span> :</label>                        
                    <input type="text" ref="email" className="input" />                    
                  </div>
                  <p>{this.state.emailErr}</p>
                           
          
                                      <div className="input_field">
                                          <label>Qualification :</label>                              
                                        <div className ="custom_select">
                                          <select ref="qualification">
                                              <option value=" ">Select</option>
                                              <option value="BCA">BCA</option>
                                              <option value="MCA">MCA</option>
                                              <option value="B.Tech">B.Tech</option>
                                              <option value="M.Tech">M.Tech</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="input_field input_button">
                    <button className="btn" onClick={(e) => this.submit(e,this.index)}>Sumbit</button>
                    <button className="btn"  type="reset">Reset</button>
                                       </div>
                               </form>
                </div>      
              </div>
            </div>
        </div>
        


       {/* table */}

        <div className="body">
                <div className="tabel_responsive">
            <span className="header">
            <h2>Student List</h2>
              <button className="btn-open" data-toggle="modal" data-target="#addData">
                <i class="fas fa-user-plus"></i>Add
                </button>
                    </span>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Qualification</th>
                                <th>Created On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
    
              {
                stdInfo.map((each, index) => {
                  // console.log(each);
                  return (
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{each.name}</td>
                        <td>{each.email}</td>
                        <td>{each.qualification}</td>
                        <td>{each.date}</td>
                        <td>
                          <span className="action_btn">
                            <button className="btn-edit" data-toggle="modal" data-target="#addData" onClick={() => this.Edit(index)}>Edit  <i class="fas fa-user-edit"></i></button>
                            <button onClick={()=>this.Remove(index)}>Remove <i class="fas fa-trash"></i></button>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  )
                })
              }
                           
            </table>
                </div>
                </div>                
      </>
    )
  }
}
export default AddUser;