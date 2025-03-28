import { useState } from "react";
import "./App.css";
import axios from "axios";
import BanList from "./components/BanList";
import PrevImageList from "./components/PrevImageList";

const ACCESS_KEY = import.meta.env.VITE_CAT_API_ACCESS_KEY;

function App() {
  const [breedBan, setBreedBan] = useState(new Set());
  const [weightBan, setWeightBan] = useState(new Set());
  const [countryBan, setCountryBan] = useState(new Set());
  const [lifeSpanBan, setLifeSpanBan] = useState(new Set());
  const [prevImages, setPrevImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [breedName, setBreedName] = useState("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [weight, setWeight] = useState("");
  const [country, setCountry] = useState("");
  const [madeFetch, setMadeFetch] = useState(false);

  const makeQuery = async () => {
    let query = `https://api.thecatapi.com/v1/images/search?api_key=${ACCESS_KEY}&has_breeds=${true}`;
    console.log(query);
    let data;
    do {
      data = await callAPI(query);
    } while (
      breedBan.has(data.breeds[0]?.name) ||
      countryBan.has(data.breeds[0]?.origin) ||
      weightBan.has(data.breeds[0]?.weight?.imperial) ||
      lifeSpanBan.has(data.breeds[0]?.life_span)
    );
    setCurrentImage(data["url"]);
    setPrevImages((images) => [...images, data["url"]]);

    const breedInfo = data.breeds[0];
    setBreedName(breedInfo.name);
    setWeight(breedInfo.weight.imperial);
    setLifeSpan(breedInfo.life_span)
    setCountry(breedInfo.origin);
    setMadeFetch(true);
  };

  const callAPI = async (query) => {
    const response = await axios.get(query).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered and Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      return null;
    });
    const data = response["data"][0];
    console.log(data);
    return data;
  };

  const addToBanList = (category, item) => {
    if (category == "breed")
      setBreedBan((prevSet) => new Set([...prevSet, item]));
    else if (category == "country")
      setCountryBan((prevSet) => new Set([...prevSet, item]));
    else if (category == "weight")
      setWeightBan((prevSet) => new Set([...prevSet, item]));
    else if (category == "lifespan")
      setLifeSpanBan((prevSet) => new Set([...prevSet, item]));
  }

  const deleteFromBanList = (category, item) => {
    if (category == "breed") {
      setBreedBan(prev => {
        const newBreedBan = new Set(prev);
        newBreedBan.delete(item);
        return newBreedBan;
      })
    }
    else if (category == "country") {
      setCountryBan(prev => {
        const newCountryBan = new Set(prev);
        newCountryBan.delete(item);
        return newCountryBan;
      })
    }
    else if (category == "weight") {
      setWeightBan(prev => {
        const newWeightBan = new Set(prev);
        newWeightBan.delete(item);
        return newWeightBan;
      })
    }
    else if (category == "lifespan") {
      setLifeSpanBan(prev => {
        const newLifeSpanBan = new Set(prev);
        newLifeSpanBan.delete(item);
        return newLifeSpanBan;
      })
    }
  }

  return (
    <div className="box">
      <div>
        <PrevImageList prevImages={prevImages}/>
      </div>
      <div>
        <div>
          <h1>Veni Vici!</h1>
          <h2>Discover cats from your wildest dreams!</h2>
        </div>
        {madeFetch ? (
          <div className="ban-button-box">
            <button className="ban-button" onClick={() => addToBanList("breed", breedName)}>{breedName}</button>
            <button className="ban-button" onClick={() => addToBanList("country", country)}>{country}</button>
            <button className="ban-button" onClick={() => addToBanList("weight", weight)}>{weight} lbs</button>
            <button className="ban-button"onClick={() => addToBanList("lifespan", lifeSpan)}>{lifeSpan} years</button>
          </div>
        ) : (
          <></>
        )}
        <div>
          {madeFetch ? (
            <img className="cat-image" src={currentImage} alt="cat picture" />
          ) : (
            <></>
          )}
        </div>
        <button onClick={makeQuery} className="discover-button">Discover 🔀</button>
      </div>
      <div>
          <BanList 
            breedBan={[...breedBan]}
            countryBan={[...countryBan]}
            weightBan={[...weightBan]}
            lifeSpanBan={[...lifeSpanBan]}
            deleteFromBanList={deleteFromBanList}
          />
      </div>
    </div>
  );
}

export default App;
