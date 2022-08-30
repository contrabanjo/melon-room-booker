import React, {Component} from "react";
import SingleRoomAvailability from "./Components/SingleRoomAvailability.jsx"

class App extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		currentDate: new Date(),
    		rooms: []
    	};
	}

	componentDidMount(){
		fetch("/rooms").then((res)=> res.json()).then(data => this.setState({
			rooms: data
		}));
	}


	backButtonClickHandler(e){
		const dateCopy = new Date(this.state.currentDate);
		dateCopy.setDate(dateCopy.getDate()-1)
		this.setState({
			currentDate: dateCopy
		})
	}

	forwardButtonClickHandler(e){
		const dateCopy = new Date(this.state.currentDate);
		dateCopy.setDate(dateCopy.getDate()+1)
		this.setState({
			currentDate: dateCopy
		});
	}

	render(){
		return (
		 <div className="App">
		 	<div id="title">Melon Room Scheduler</div>
		 	<div id="date-changer">
		 		<button onClick={e => this.backButtonClickHandler(e)}>{"<"}</button>
		 		<div>{this.state.currentDate.toLocaleDateString()}</div>
		 		<button onClick={e => this.forwardButtonClickHandler(e)}>{">"}</button>
		 	</div>
		 	<div className ="rooms">
		 	 	{this.state.rooms.map((item, index) => <SingleRoomAvailability key={index} date={this.state.currentDate} room={item}/>)}
		 	</div>
		 </div>
		);
	}
}

export default App;