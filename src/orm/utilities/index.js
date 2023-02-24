import moment from "moment"

export const momentDate = () => {
  let time = moment().toDate().toTimeString()
  let date = moment().toDate().getDate()
  let month = moment().toDate().getMonth()
  let year = moment().toDate().getFullYear()
  return year + "-" + month + "-" + date + "," + time
}