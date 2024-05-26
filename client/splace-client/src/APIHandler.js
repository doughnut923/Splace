

//upload location to the database
//add the location to Locaitons DB
//add the locationID to Users DB
async function postLocation(title, desc, coordinates, imageData, userID) {
    const LocationResponse = await fetch(`${process.env.SERVER_URL}/location/?title=${title}&desc=${desc}&coordX=${coordinates[0]}&coordY=${coordinates[1]}`, {
        method: "POST",
        body: imageData,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    });

    const updateUserLocations = await fetch(`${process.env.SERVER_URL}/user/addLocationToUser/?id=${userID}&newLocation=${LocationResponse._id}`);

}

//return all locations by a user from the database and should be stored as as state
async function getLocationsByUser(userID) {
    var locationIDs;
    var locations = []
    const data = await fetch(`http://localhost:8000/user/?id=${userID}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    });

    const user = await data.json();

    locationIDs = user.locations;
    
    if(!locations)
        return;

    for await (const location of locationIDs) {
        try{
            const locationData = await fetch(`http://localhost:8000/location/?id=${location}`);
            const locationInfo = await locationData.json();
            locations.push(locationInfo);
        }catch(error){
            console.log(error);
            break;
        }
    }

    return locations;
}

//return userID if correct password of user & username(returned value used to access postLocation and getLocations in App.js)
async function checkUserPassword(username, password) {
    const data = await fetch(`http://localhost:8000/user/checkpassword/?username=${username}&password=${password}`,
        {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer"
        }
    );
    const login = await data.json();
    if (login.login_status == "Success") {
        console.log("Logged: " + login.id);
        return {
            status: 1,
            id: login.id
        };
    }
    return {
        status: 0,
        id: null
    };
}


export {getLocationsByUser, postLocation, checkUserPassword}