
class Request {

// url in get(url) is the url that the request is trying to hit on the api side e.g /api/channels.
// This will come from wherever we are using Request.get or Request.post etc.
    get(url) {
        return fetch("http://localhost:8080" + url)
        .then(res => res.json());
    }

    post(url, payload){
        return fetch("http://localhost:8080" + url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
    }

}

export default Request;