import React, {Component} from "react";
import SingleRoomAvailability from "./Components/SingleRoomAvailability.jsx"

class App extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		currentDate: new Date(),
    		rooms: [],
    		selectedRoom: "",
    		selectedTime: "",
    		user: "",
    	};
	}

	componentDidMount(){
		fetch("/rooms").then((res)=> res.json()).then(data => this.setState({
			rooms: data
		}));
	}

	bookingClickHandler(e){
		const room = e.target.id.split("-")[1];
		const time = e.target.id.split("-")[0];
		this.setState({
			selectedRoom: room,
			selectedTime: time
		})


		const day = this.state.currentDate.getFullYear() + "-" + Number(this.state.currentDate.getMonth()+1) + "-" + this.state.currentDate.getDate();
		const date = day + " " + time;

		const user = "Corrie";

		//this.saveBookingToDB(room, date, user);
	}

	convert24HrTimeStringTo12HrTimeString(str){
		const n = Number(str.split(":")[0]);
		if (n === 12) return "12:00PM";
		return n < 12 ? n + ":00" + "AM" : (n-12) + ":00" + "PM"
	}

	renderBookingConfirmation(room, date, time){
		const day = Number(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
		window.scrollTo(0,0);
		document.body.style.overflow = "hidden";

		function handleSubmit(e){
			//save booking to DB here
		}

		return (
			<div className="booking-confirmation">
				<p>You are creating a booking for <span>{room}</span> for <span>{day}</span> at <span>{this.convert24HrTimeStringTo12HrTimeString(time)}.</span></p>
				<label htmlFor="user-input">Please enter a name for the booking:</label>
				<input onChange={
					(e)=>{
						this.setState({
							user: e.target.value
						})
					}
				} id="user-input" type="text"></input>
				<div>
					<button id="submit">Create Booking</button>
					<button id="cancel" onClick={(e)=>{
						document.body.style.overflow = "unset";
						this.setState({
							selectedRoom: ""
						})
					}}>Cancel</button>
				</div>

			</div>
		);
	}

	saveBookingToDB(room, date, user){
		fetch("/bookings", {
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    method: 'POST',
	    body: JSON.stringify({
	      room: room,
	      date: date,
	      user: user
	    })
	  });
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
		 	{this.state.selectedRoom.length > 0 ? this.renderBookingConfirmation(this.state.selectedRoom, this.state.currentDate, this.state.selectedTime) : null}
		 	<div id="title">Melon Room Scheduler</div>
		 	<div id="date-changer">
		 		<button onClick={e => this.backButtonClickHandler(e)}>{"<"}</button>
		 		<div>{this.state.currentDate.toLocaleDateString()}</div>
		 		<button onClick={e => this.forwardButtonClickHandler(e)}>{">"}</button>
		 	</div>
		 	<div className ="rooms">
		 	 	{this.state.rooms.map((item, index) => <SingleRoomAvailability key={index} date={this.state.currentDate} selectedRoom={this.state.selectedRoom} selectedTime={this.state.selectedTime} room={item} bookingClickHandler={(e)=>{this.bookingClickHandler(e)}}/>)}
		 	</div>
		 </div>
		);
	}
}

export default App;