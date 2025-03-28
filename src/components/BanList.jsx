import "../App.css";

const BanList = ({breedBan, countryBan, weightBan, lifeSpanBan}) => {
    return (
        <div className="ban-list-box">
            <h2>Ban List</h2>
            <h3>Select an attribute to ban</h3>
            <div>
                <h4>Breed 🧬</h4>
                {breedBan.map((breed) => (
                    <div key={breed} className="ban-badge">
                        <p>{breed}</p>
                    </div>
                ))}
            </div>
            <div>
                <h4>Country 🌎</h4>
                {countryBan.map((country) => (
                    <div key={country} className="ban-badge">
                        <p>{country}</p>
                    </div>
                ))}
            </div>
            <div>
                <h4>Weight ⚖️</h4>
                {weightBan.map((weight) => (
                    <div key={weight} className="ban-badge">
                        <p>{weight}</p>
                    </div>
                ))}
            </div>
            <div>
                <h4>Lifespan ⏱️</h4>
                {lifeSpanBan.map((lifespan) => (
                    <div key={lifespan} className="ban-badge">
                        <p>{lifespan}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BanList;