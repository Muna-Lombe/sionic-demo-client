import moment from "moment"




export const momentDate = () => {
  let time = moment().toDate().toTimeString()
  let date = moment().toDate().getDate()
  let month = moment().toDate().getMonth()
  let year = moment().toDate().getFullYear()

  return {
    full:year + "-" + month + "-" + date + "," + time,
    shortDate: year + "-" + month + "-" + date,
    time: time
  }
}


export const returnOnReload = () => window.onbeforeunload = function () {
  window.setTimeout(function () {
    window.location = '-1';
  }, 0);
  window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
}