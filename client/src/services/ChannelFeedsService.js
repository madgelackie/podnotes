
class Request {

// url in get(url) is the url that the request is trying to hit on the api side e.g /api/channels.
// the url in fetch(url) is this same url
    get(url) {
        return fetch("http://localhost:8080" + url)
        .then(res => res.json());
    }

    post(payload){
        return fetch("http://localhost:8080/api/channels", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
    }

}

export default Request;