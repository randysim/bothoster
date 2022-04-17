let session = {
    username: "",
    token: ""
}

let Session = {
    getData() {
        return session;
    },
    setData(data) {
        session = data;
    }
}

export default Session;