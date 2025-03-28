import "../App.css";

const BanList = ({breedBan, countryBan, weightBan, lifeSpanBan, deleteFromBanList}) => {
    return (
        <div className="ban-list-box">
            <h2>Ban List</h2>
            <h3>Select an attribute to ban</h3>
            <div className="ban-section">
                <h4>Breed 🧬</h4>
                {breedBan.map((breed) => (
                    <button 
                        key={breed} 
                        className="ban-button"
                        onClick={() => deleteFromBanList("breed", breed)}
                    >
                        {breed}
                    </button>
                ))}
            </div>
            <div className="ban-section">
                <h4>Country 🌎</h4>
                {countryBan.map((country) => (
                    <button 
                        key={country} 
                        className="ban-button"
                        onClick={() => deleteFromBanList("country", country)}
                    >
                            {country}
                    </button>
                ))}
            </div>
            <div className="ban-section">
                <h4>Weight ⚖️</h4>
                {weightBan.map((weight) => (
                    <button 
                        key={weight} 
                        className="ban-button"
                        onClick={() => deleteFromBanList("weight", weight)}
                    >
                        {weight}
                    </button>
                ))}
            </div>
            <div className="ban-section">
                <h4>Lifespan ⏱️</h4>
                {lifeSpanBan.map((lifespan) => (
                    <button 
                        key={lifespan} 
                        className="ban-button"
                        onClick={() => deleteFromBanList("lifespan", lifespan)}
                    >
                            {lifespan}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BanList;