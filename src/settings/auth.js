const auth = {
    status: false,
    checkStatus() {
        return this.status;
    },
    logout() {
        this.status = false
    },
    login() {
        this.status = true
    }
}

export default auth;