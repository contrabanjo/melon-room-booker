import React, {Component} from "react";

const totalAvailableHoursArray = ["7:00AM", "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM"]

class SingleRoomAvailability extends Component{


	renderHours(){
		return (
			<div className="hours">
				{totalAvailableHoursArray.map((e, index) => {
					let hourClassName;
					if (!this.props.room.openHours.includes(e)){
						hourClassName = "unavailable"
					} else if (this.props.room.reservedHours.includes(e)) {
						hourClassName = "reserved"
					} else {
						hourClassName = e.slice(-2) === "AM" ? "AM" : "PM"
					}
					return (<div>
						<div key={index} className={hourClassName}>{e}</div>
						</div>
						)
				})}
			</div>
			);
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