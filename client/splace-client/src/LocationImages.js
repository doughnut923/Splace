import * as React from 'react';
import { useState } from 'react';

function LocationImages() {

    const [currentImage, setCurrentImages] = useState([
        {
            imageurl: "https://t3.ftcdn.net/jpg/02/65/23/70/360_F_265237090_Muthvb72m2POYFjyx7F5UCQLh9JdBtKN.jpg",
            id: 1
        },
        {
            imageurl: "https://t3.ftcdn.net/jpg/02/65/23/70/360_F_265237090_Muthvb72m2POYFjyx7F5UCQLh9JdBtKN.jpg",
            id: 2
        }
    ]);

    return (
        <div className='image-section'>
            <div className='image-wrap'>
                {currentImage.map((image) => {
                    return (
                        <img key={image.id} src={image.imageurl}></img>
                    );
                })}
            </div>
        </div>
    );
}

export default LocationImages;