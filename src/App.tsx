// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import {Sum} from "./Sum";
import { CareTaker } from './Memento';


class App extends React.Component {
  private sumRef = React.createRef<Sum>();
  private careTaker = new CareTaker();

  reset = () => {
    if(this.sumRef && this.sumRef.current) {
      this.careTaker.addMemento(this.sumRef.current.save());
      this.sumRef.current.reset();
    }
  };

  undo = () => {
    if(this.sumRef && this.sumRef.current) {
      this.sumRef.current.restore(this.careTaker.getMemento());
    }
  };

  public render() {
  return (
    <div className="App">
      <div className="App-intro">
        <Sum ref={this.sumRef}/>
        <button onClick={this.reset} style={{marginRight: '10px'}}>reset</button>
        <button onClick={this.undo} >undo</button>
      </div>
    </div>
  );
  }
}

export default App;