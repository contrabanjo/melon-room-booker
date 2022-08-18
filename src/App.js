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

class App extends Component{
	render(){
		return (
		 <div className="App">
		 	<SingleRoomAvailability room={sampleRoom}/>
		 </div>
		);
	}
}

export default hot(module)(App);