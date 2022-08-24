import React, {Component} from "react";

const totalAvailableHoursArray = ["7:00AM", "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM"]

const daysOfTheWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

const local12hourstrings = ["12:00AM", "1:00AM", "2:00AM", "3:00AM", "4:00AM", "5:00AM", "6:00AM", "7:00AM", "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM", "10:00PM", "11:00PM"]


class SingleRoomAvailability extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		selectedHour: "",
    		openHours: [],
    		reservedHours: []
    	};
	}
	setOpenHours(){
		const day = daysOfTheWeek[this.props.date.getDay()];
		fetch("/hours?" + new URLSearchParams({
			day: day,
			institution: this.props.room.institution
		})).then((res)=> res.json()).then(data => {
			const open = Number(data[0].slice(0,2));
			const close = Number(data[1].slice(0,2));
			const hours = [];
			for (let i=open; i<close; i++){
				hours.push(local12hourstrings[i])
			}
			this.setState({
				openHours: hours
			})
		});	
	}

	componentDidMount(){
		this.setOpenHours();
		//TODO get reservations
	}

	componentDidUpdate(prevProps){
		if (prevProps.date !== this.props.date){
			this.setOpenHours();
		}
		// //TODO get reservations
	}


	renderHours(){
		return (
			<div className="hours">
				{totalAvailableHoursArray.map((e, index) => {
					let hourClassName;
					if (!this.state.openHours.includes(e)){
						hourClassName = "unavailable"
					} else if (this.state.reservedHours.includes(e)) {
						hourClassName = "reserved"
					} else if (this.state.selectedHour.split(" ")[0] === e) {
						hourClassName = "selected"
					} else {
						hourClassName = "available"
					}
					return (<div key={index}>
						<div  onClick={(e)=> this.hourClickHandler(e)} className={hourClassName} id={e + " " + this.props.room.name}>{e}</div>
						</div>
						)
				})}
			</div>
			);
	}

	hourClickHandler(e){
		this.setState({selectedHour: e.target.id })
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