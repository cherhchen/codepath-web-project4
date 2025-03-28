import "../App.css";

const PrevImageList = ({prevImages}) => {
    return (
        <div className="prev-cat-box">
            <h2>Who have we seen so far?</h2>
            {prevImages.map((image) => (
                <img
                    key={image}
                    src={image}
                    alt="cat pic"
                    className="prev-cat-image"
                />
            ))}
        </div>
    );
}

export default PrevImageList;