import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class EditBankData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    }
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  deleteTransaction(e) {
    e.preventDefault();
    let i = e.target.getAttribute('data-key');
    let currentState = this.state.records;
    let trans = this.state.records[i]._id;
    let a = this;
    axios.put('/bankRecords', {
      data: trans
    }).then(function (response) {
      currentState.splice(i, 1);
      a.setState({
        records: currentState
      })
    }).catch(function (error) {
      console.log("error: ", error);
    })
  }

  categoryChange(e) {
    e.preventDefault();
    let i = e.target.getAttribute('data-key');
    let Category = e.target.value;
    let currentState = this.state.records;
    let individState = this.state.records[i];
    console.log("individState: ", individState);
    let categState = this.state.records[i].Category = Category;
    individState.Category = categState
    let trans = this.state.records[i]._id;
    let a = this;
    axios.put('/bankRecords/change', {
      data: trans,
      Category: Category
    }).then(function (response) {
      a.setState({
        records: currentState,
      })
    }).catch(function (error) {
      console.log("error: ", error);
    })
  }

  componentDidMount() {

    fetch('/bankRecords')
      .then(response => response.json())
      .then(response => this.setState({records: response}))
    }


  render() {

    return (
        this.state.records.map((records, index) => (

          <section className="row z-depth-1" key={index}>


                <div className='col s3'>{records.TransDate} {records.PostedDate}</div>
                <div className='col s3'>{records.Description}</div>
                <div className='col s3'>{records.Amount}</div>
                <div className='col s2'>
                  <select className="browser-default " data-key={index} onChange={this.categoryChange}>
                    <label >Catigorize!</label>
                    <option  value="" disabled  selected>{records.Category}</option>
                    <option value="Bills" data-key={index}>Bills</option>
                    <option value="Groceries" data-key={index}>Groceries</option>
                    <option value="Transportation" data-key={index}>Transportation</option>
                    <option value="Entertainment" data-key={index}>Entertainment</option>
                    <option value="Clothing" data-key={index}>Clothing</option>
                    <option value="Dining Out" data-key={index}> Dining out</option>
                    <option value="Vices" data-key={index}>Vices</option>
                    <option value="Debt" data-key={index}>Debt</option>
                    <option value="Housing" data-key={index}>Housing</option>
                    <option value="Savings" data-key={index}>Savings</option>
                    <option value="Health" data-key={index}>Health</option>
                    <option value="Miscellaneous" data-key={index}>Miscellaneous</option>
                    <option value="Income" data-key={index}>Income</option>
                  </select>
                </div>



                <div className="waves-effect waves-light btn red col s1  " data-key={index} onClick={this.deleteTransaction}>Delete</div>

          </section>  ))

    );
  }
}
export default EditBankData;
