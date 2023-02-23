import { ArrowRight } from "../assets";

const PinLocation = ({ location = { city: "Казань", state: "Татарстан республика" } }) => (
  <span className="pin-location p-2 flex flex-row gap-4 items-center ">

    <span className="city-region pb-2 flex flex-row gap-6 border-b-2 text-lg  ">
      {location.city + ", " + location.state}
      <span className="arrow-right w-max flex items-end">
        <ArrowRight />
      </span>
    </span>
  </span>
)

export default PinLocation;