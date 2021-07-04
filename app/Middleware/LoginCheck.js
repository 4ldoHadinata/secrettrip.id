'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class LoginCheck {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({ request, session, response }, next) {
        if (session.get('login')) {
            await next()
        } else {
            return response.route('login')
        }
        // call next to advance the request
    }
}

module.exports = LoginCheck