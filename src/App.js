import React, {Component} from "react";
import SingleRoomAvailability from "./Components/SingleRoomAvailability.jsx"

import {hot} from "react-hot-loader";

const sampleRoom = {
		name: "Black Oak Room",
		openHours: ["10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM"],
		reservedHours: ["11:00AM"],
		currentBookings: [{
			hour: "11:00AM",
			name: "Twilight Sparkle"
		}]
}

const sampleRoom2 = {
		name: "Las Trampas",
		openHours: ["7:00AM", "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM"],
		reservedHours: ["8:00AM"],
		currentBookings: [{
			hour: "8:00AM",
			name: "Fluttershy"
		}]
}

const sampleRoom3 = {
		name: "Study Room - 1st Floor",
		openHours: ["10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM"],
		reservedHours: ["4:00PM"],
		currentBookings: [{
			hour: "4:00PM",
			name: "Rainbow Dash"
		}]
}

const sampleRoom4 = {
		name: "Study Room - 2nd Floor",
		openHours: ["12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM"],
		reservedHours: ["12:00PM"],
		currentBookings: [{
			hour: "12:00PM",
			name: "Rarity"
		}]
}

const allRooms = [sampleRoom, sampleRoom2, sampleRoom3, sampleRoom4]

class App extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		currentDate: new Date()
    	};
	}

	backButtonClickHandler(e){

	}

	forwardButtonClickHandler(e){

	}

	render(){
		return (
		 <div className="App">
		 	<div id="title">Melon Room Scheduler</div>
		 	<div id="date-changer">
		 		<button>{"<"}</button>
		 		<div>{this.state.currentDate.toLocaleDateString()}</div>
		 		<button>{">"}</button>
		 	</div>
		 	<div className ="rooms">
		 	 	{allRooms.map((item, index) => <SingleRoomAvailability key={index} room={item}/>)}
		 	</div>
		 </div>
		);
	}
}

export default hot(module)(App);