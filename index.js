'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');
var enrollment_calendar = require('./enrollment_calendar.json'); 

function get_json_formatted(json){
		for (var key in json.Enrrollment.Ordinary_Enrollment.Pre_Enrollment) {
			console.log(key + " -> " + json[key]);
			if(json[key] == null){
				json[key] = new Date(json[key]);
				console.log(key + " -> " + json[key]);
			}
	}
}
function get_enrollment_calendar (){

	console.log("Hello, World!");
	for (var key in enrollment_calendar.School_Calendar) {
        console.log(key + " -> " + enrollment_calendar[key]);
	}
}

get_json_formatted(enrollment_calendar)