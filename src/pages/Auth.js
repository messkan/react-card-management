import React, { Component } from 'react';
import './Auth.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
     
    
    state = {
        isLogin: true, 
        token: null,
        response: ''
    } 
      
    

    static contextType = AuthContext;


    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLogin : !prevState.isLogin}
        })
    }

    constructor(props){
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.firstNameEl = React.createRef();
        this.lastNameEl = React.createRef();
    }


    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        if(email.trim().length === 0 || password.trim().length === 0) 
          return; 
        
          

        let requestBody = {
            'email' : email , 
            'password' : password
        };
        
        if(this.state.isLogin){

            
            fetch('http://192.168.17.161:4000/auth/login', {
                method: 'POST' ,
                body : JSON.stringify(requestBody) ,
                headers: {
                    'Content-type' : 'application/json'
                }
            }).then(res => {
                if(res.status !== 200 && res.status !== 201 ){
                    throw new Error('Failed');
                }
                return res.json();
            }).then(resData => {
                 if(resData.token){
                  this.context.login(resData.token);
                   
                 }
             }).catch(err => {
                    console.log(err);
            });
        
        return ;
        }
      

            const firstName = this.firstNameEl.current.value;
            const lastName = this.lastNameEl.current.value;

            requestBody.firstName = firstName;
            requestBody.lastName = lastName;
           
            fetch('http://192.168.17.161:4000/auth/register' ,{
                method: 'POST' ,
                body: JSON.stringify(requestBody), 
                headers: { 
                    'Content-type' : 'application/json'
                }
            } ).then(res => {
                if(res.status !== 200 && res.status !== 201 ){
                    throw new Error('Failed');
                }
                return res.json();
            }).then(resData => {
                 
                  this.switchModeHandler(); 

                  this.state.setState({response : "<span>Account created Successfuly, thank you to login</span>"});

             }).catch(err => {
                    console.log(err);
            });
        

     

         

    }


    render() {

        return (
           <form className="auth-form" onSubmit={this.submitHandler}>
               {this.state.response}
            { !this.state.isLogin && 
              
              <React.Fragment>
              <div className="form-control">
              <label htmlFor="firstName">First name</label>
              <input type="text" id="firstName" ref={this.firstNameEl} />
              </div>
             <div className="form-control">
              <label htmlFor="lastName">Last name</label>
              <input type="text" id="lastName" ref={this.lastNameEl} />
              </div>
              </React.Fragment>
            }
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={this.emailEl} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordEl} />
            </div>

            <div className="form-actions">
                <button type="submit"  >Submit</button>
        <button type="button" onClick={this.switchModeHandler} >Switch to { this.state.isLogin ? 'Sign Up' : 'Login' }</button>  
            </div>
           </form>  
        );
    }
}

export default AuthPage;