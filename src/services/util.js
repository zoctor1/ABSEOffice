
export class ResponseWrapper {
    constructor(response, data = {}, message) {
        this.data = data
        this.status = response.status
        this.statusMessage = _getStatusMessage(this.status)
        this.message = message || null
    }
}

export class ErrorWrapper extends Error {
    constructor(error, message) {
        super()
        this.name = 'ErrorWrapper'
        this.stack = new Error().stack
        this.status = error.response ? error.response.status : false
        this.statusMessage = _getStatusMessage(this.status)
        this.message = _getResponseErrorMessage(message)
    }
}
function _getStatusMessage(status) {
    let message = ''
    switch (status) {
        case 200:
            message = 'All done. Request successfully executed'
            break
        case 201:
            message = 'Data successfully created'
            break
        case 400:
            message = 'Bad Request'
            break
        case 401:
            message = 'Need auth'
            break
        case 404:
            message = 'Not found'
            break
        case 503:
            message = 'Service Unavailable'
            break
        default:
            message = 'Something wrong. Client default error message'
            break
    }
    return message
}
function _getResponseErrorMessage(error) {
    return '_getResponseErrorMessage can\'t handle error'
}