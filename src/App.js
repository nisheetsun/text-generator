import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import header from './header.png';



export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      lastid: null
    }
  }

  componentDidMount() {
    fetch('http://demo8488564.mockable.io/one')
      .then(response => response.json())
      .then(response => {
        let text = this.state.text
        text = text + response['next']
        this.setState({text:text, lastid: response['nextid']})
      });
  }

  api=()=>{
    fetch('http://demo8488564.mockable.io/two?lastid='+this.state.lastid)
      .then(response => response.json())
      .then(response => {
        let text = this.state.text
        text = text + ' ' +response['next']
        this.setState({text:text, lastid: response['nextid']}, ()=>{this.api()})
      });
  }

  render(){
    return (
    <div style={{backgroundColor:"#F8F9FA"}}>
        <div class="relative">
          <img src={header} alt="header" style={{width: '100%'}} />
          {/*<div style={{width:'100%'}}>*/}
            {/*<Button style={{width: 50, fontSize: 10, position: 'absolute', top:0, right:0, backgroundColor: '#1B73E8'}} onClick={()=>{this.api()}} size="sm" >Next</Button>{' '}*/}
            <div onClick={()=>{this.api()}} style={{top:7, right:35, backgroundColor: '#235bee', position:'absolute', width: 45, height: 20, fontSize: 10, color:"white", borderRadius: 3, textAlign:'center', paddingTop: 2}}>{'Start'}</div>
          {/*</div>*/}
        </div>
        {/*<div style={{width:'100%'}}>
                  <Button style={{marginLeft: "47%", width: 50, fontSize: 10}} onClick={()=>{this.api()}} size="sm" variant="outline-secondary">Next</Button>{' '}
                </div>*/}
          <div className="shadow" style={{marginTop: 10, width: 400, marginLeft: 'auto', marginRight: 'auto', backgroundColor:"#FFFFFF", fontSize: 10, paddingBottom: 400 }}>
            <div style={{marginLeft:50, marginRight: 50}}>
            <div style={{paddingTop: 60}}>
            {this.state.text}
            </div>
          </div>
          </div>
    </div>
  );
  }
}
