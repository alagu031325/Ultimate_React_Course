// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import BackButton from "./BackButton";

import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt());

  return String.fromCodePoint(...codePoints);
}

const flagemojiToPNG = flag => {
  const countryCode = Array.from(flag, codeUnit => codeUnit.codePointAt())
    .map(char => String.fromCharCode(char - 127397).toLowerCase())
    .join("");

  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeoCodingError] = useState("");

  //use custom hook created to retrieve the global state stored in the URL
  const [lat, lng] = useUrlPosition();

  //grab createCity function from the context
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeoCodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          // console.log(data);
          if (!data.countryCode)
            throw new Error(
              `That doesn't seem to be a valid City. Please click somewhere elese in the Map 😉`
            );
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoCodingError(err.message);
          // console.log(`👾👾, ${err.message}`);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  //handler function can be an async function
  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;
    // id will automatically created by the json server
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    // console.log(newCity);

    //upload this newly created object to fake api - async function
    await createCity(newCity);

    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
        <span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
      </div>

      <div className={styles.row}>
        {/* in html the prop is 'for' and in react the prop is called htmlFor - when clicking will select the element with the same id value */}
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input id="date" onChange={e => setDate(e.target.value)} value={date} /> */}
        {/* selected is similar to the value prop */}
        <DatePicker
          id="date"
          onChange={date => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        {/* To navigate back we need to define the number of steps that we need to go back in the browser's history - '-1' navigates back */}
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
