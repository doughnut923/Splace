import * as React from "react"

function LocationTitle(){

     var title = "題目";


    function getTitle(){
        return title;
    }

    return (
        <>
            <h1 className="location-title">{getTitle()}</h1>
        </>
    );
}

export default LocationTitle;