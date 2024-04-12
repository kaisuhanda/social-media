module.exports = {
    templateResponse: (rc, success, message, error, result) => {
        return {
            rc, success, message, error, result
        }
    }
}