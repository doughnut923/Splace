import axios from "axios"

const headers: HeadersInit = {
    "Content-Type": `multipart/form-data;`,
    Accept: "multipart/form-data",
  };
  
  export const axiosInstance = axios.create({
    baseURL: "https://localhost:5000",
    headers,
  });

//upload location to the database
//add the location to Locaitons DB
//add the locationID to Users DB

type LocationData = {
    coordinates: [number, number],
    title: string,
    description: string,
    imageAddr: string,
    _id: string
}


async function postLocation(title : string, desc : string, coordinates : [number, number], imageData : File, userID : string) {
    console.log("Posting Location!");

    var formData = new FormData();

    if (!imageData) {
        console.error("No Image!");
        return 0;
    }

    console.log(imageData)

    formData.append("image", imageData)

    const LocationResponse = await fetch(`http://localhost:8000/location/?title=${title}&desc=${desc}&coordX=${coordinates[0]}&coordY=${coordinates[1]}`, {
        method: "POST",
        body: formData,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    });

    var LocationResponseJson : LocationData = await LocationResponse.json();


    const updateUserLocations = await fetch(`http://localhost:8000/user/addLocationToUser/?id=${userID}&newLocation=${LocationResponseJson._id}`,
        { method: "PUT" }
    );

}

//return all locations by a user from the database and should be stored as as state
async function getLocationsByUser(userID): Promise<LocationData[] | null> {
    var locationIDs : string[];
    var locations : LocationData[]  = []
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

    if (!locations)
        return null;

    for await (const location of locationIDs) {
        try {
            const locationData  = await fetch(`http://localhost:8000/location/?id=${location}`);
            const locationInfo : LocationData = await locationData.json();
            locations.push(locationInfo);
        } catch (error) {
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


export { getLocationsByUser, postLocation, checkUserPassword, LocationData}