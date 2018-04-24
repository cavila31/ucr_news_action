'use strict';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({debug: true});
var enrollment_calendar = require('./enrollment_calendar.json');

function beautify_obj(json_obj, start, root) {

    var answer = start.replace(/_/g, ' ') + ' ';
    if(root) {
        answer += 'has ';
    }
    for(var x in json_obj){

        answer += x.replace(/_/g, ' ') + ' ';
        if(typeof json_obj[x]=== 'object'){
            var sub_tree = beautify_obj(json_obj[x], '', false);
        }
        else {
            var date_string = new Date(json_obj[x]).toString();
            date_string = date_string.replace('00 GMT-0600 (CST)', '');
            answer += 'on ' + date_string + ', ';
        }
        if(sub_tree != undefined){
            answer += sub_tree;
            sub_tree =  undefined;
        }

    }

    return answer;
}

function get_enrollment_info(json_obj) {
    var answer = 'There are 3 periods of enrollment. They are: \n';
    var len = Object.keys(json_obj).length-1;
    var a=0;
    for (var x in json_obj) {
        answer += beautify_obj(json_obj[x], x, true);
        if (a!= len){
            answer += '\nNext we have: \n';
        }
        a++;
    }
    return answer;
}

app.intent('all_enrollment', (conv, {enrollment}) => {
    var answer = get_enrollment_info(enrollment_calendar['Enrollment']);
    console.log(answer);
    conv.close(answer);
});

exports.ucrNews = functions.https.onRequest(app);