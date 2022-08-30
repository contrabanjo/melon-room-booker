import React, {Component} from "react";

//integers representing 24hr clock hours
const globalOpen = 7;
const globalClose = 22;

const daysOfTheWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

class SingleRoomAvailability extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		selectedHour: "",
    		roomOpen: 0,
    		roomClose: 0,
    		reservedHours: []

    	};
	}

	convertNumberTo24HrTimeString(n){
		return String(n).padStart(2, "0") + ":00:00";
	}

	convert24HrTimeStringToNumber(str){
		return Number(str.slice(0,2));
	}

	convertNumberTo12HrTimeString(n){
		if (n === 12) return "12:00PM";
		return n < 12 ? n + ":00" + "AM" : (n-12) + ":00" + "PM"
	}


	setOpenHours(){
		const day = daysOfTheWeek[this.props.date.getDay()];
		fetch("/hours?" + new URLSearchParams({
			day: day,
			institution: this.props.room.institution
		})).then((res)=> res.json()).then(data => {
			this.setState({
				roomOpen: this.convert24HrTimeStringToNumber(data[0]),
				roomClose: this.convert24HrTimeStringToNumber(data[1])
			})
		});	
	}

	

	setReservedHours(){
		fetch("/bookings?" + new URLSearchParams({
			date: this.props.date.toDateString(),
			room: this.props.room.name
		})).then((res)=> res.json()).then(data => {
			const hours = data.map(d => d.date_of);
			this.setState({
				reservedHours: hours
			})
		});	
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

	componentDidMount(){
		this.setOpenHours();
		this.setReservedHours();
	}

	componentDidUpdate(prevProps){
		if (prevProps.date !== this.props.date){
			this.setOpenHours();
			this.setReservedHours();
		}
	}


	renderHours(){
		const hours = []
		for (let i = globalOpen; i < globalClose; i++){
			let hourClassName = "available";
			
			if (i < this.state.roomOpen || i > this.state.roomClose){
				hourClassName = "unavailable";
			} else if (this.state.reservedHours.includes(this.convertNumberTo24HrTimeString(i))) {
				hourClassName = "reserved";
			} else if (Number(this.state.selectedHour.split(" ")[0]) === i) {
			 	hourClassName = "selected"
			} 

			hours.push(
				<div>
					<div onClick={hourClassName === "available" || hourClassName==="selected" ? (ev)=> this.hourClickHandler(ev) : null} className={hourClassName} id={i + " " + this.props.room.name}>{this.convertNumberTo12HrTimeString(i)}</div>
				</div>
			)
		}
		return (
			<div className="hours">
				{hours}
			</div>
			);
	}

	hourClickHandler(e){
		this.setState({selectedHour: e.target.id })
		const room = this.props.room.name;

		const day = this.props.date.getFullYear() + "-" + Number(this.props.date.getMonth()+1) + "-" + this.props.date.getDate();
		const time = this.convertNumberTo24HrTimeString(e.target.id.split(" ")[0]);
		const date = day + " " + time;

		const user = "Corrie";

		this.saveBookingToDB(room, date, user);
	}

	render(){
		return (
		 <div className="single-room-availability">
		    <div className="room-name">{this.props.room.name}</div>
		 	{this.renderHours()}
		 </div>
		);
	}
}

export default SingleRoomAvailability;