import React , { Component } from 'react' ; 
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/BackDrop/BackDrop';
import AuthContext from '../context/auth-context';
import './Cards.css';



class CardsPage extends Component {

    state = {
      creating : false,
      cards: []
    }

    constructor(props){
      super(props); 
      this.typeElRef = React.createRef();
      this.numElRef = React.createRef();
    }
    static contextType = AuthContext;

    createCardHandler = () => {
      this.setState({creating:true});
    }
     
    modalConfirmHandler = () => {
      this.setState({creating: false}); 
      const type = this.typeElRef.current.value; 
      const num = this.numElRef.current.value;

      const card = { type , num };
      console.log(card);
      const token = this.context.token;

      fetch('http://192.168.17.161:4000/card/addCard', {
        method: 'POST' ,
        body : JSON.stringify(card) ,
        headers: {
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => {
        if(res.status !== 200 && res.status !== 201 ){
            throw new Error('Failed');
        }
        return res.json();
    }).then(() => {
      this.fetchCards();
    }).catch(err => {
            console.log(err);
    });
    };
                                    
    modalCancelHandler = () => {
         this.setState({creating: false});
    }
    
    componentDidMount(){
      this.fetchCards();
    }

    fetchCards(){
      const token = this.context.token;
      fetch('http://192.168.17.161:4000/card/cards', {
        method: 'GET' ,
        headers: {
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => {
        if(res.status !== 200 && res.status !== 201 ){
            throw new Error('Failed');
        }
        return res.json();
    }).then(resData => {
      this.setState({cards: resData});
    }).catch(err => {
            console.log(err);
    });
    };

    deleteCard = (id) => {
       
      const token = this.context.token;
      fetch('http://192.168.17.161:4000/card/deleteCard/' + id, {
        method: 'DELETE' ,
        headers: {
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => {
        if(res.status !== 200 && res.status !== 201 ){
            throw new Error('Failed');
        }
        return res.json();
    }).then(resData => {
      
      const cardsRes = this.state.cards.filter((obj) => {
              return obj.id !== id; 
      });
      
      this.setState({cards: cardsRes});
    }).catch(err => {
            console.log(err);
    });
    };



    
    

    render(){
          
      const cardList = this.state.cards.map(card => {
        return (
          <li key={card.id} className="cards__list-item">
           <span>{card.type}</span> 
           <button className="btn delete" onClick={() => this.deleteCard(card.id)}>delete</button>
           <button className="btn update">update</button>
          </li>
        );
      });
  

        return(
         <React.Fragment> 
          {this.state.creating &&<Backdrop/> } 
          { this.state.creating && 
          <Modal title="Add a card" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
            <form>
               <div className="form-control">
                 <label htmlFor="type">Type</label>
                 <input type="text" ref={this.typeElRef} id="type"></input>
               </div>
               <div className="form-control">
                 <label htmlFor="num">Num</label>
                 <input type="number"  ref={this.numElRef} id="num"></input>
               </div>
            </form>
            </Modal>
          }
          <div className="cards-control">
            <button className="btn" onClick={this.createCardHandler}>Add card</button>
          </div>

          <ul className="cards__list">
              {cardList}
          </ul>
          </React.Fragment>
        );
    }
}

export default CardsPage;