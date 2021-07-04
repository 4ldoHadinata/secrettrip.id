'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
    /**
     * Show a list of all users.
     * GET users
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view, session }) {
        const users = await User.all()
        console.log(session.get('login'))
        return view.render('users.index', { users: users.rows })
    }

    async loginPage({ response, view, session }) {
        if (session.get('login')) {
            return response.route('users.index')
        } else {
            return view.render('admin.login')
        }
    }

    async login({ request, response, session }) {
        const { username, password } = request.all()
        const check = await User.findBy('username', username)
        if (check) {
            if (Hash.verify(password, check.password)) {
                session.put('login', true)
                session.put('id', check.id)
                return response.redirect('users')
            } else {
                session.flash({ error: 'password salah' })
                return response.redirect('back')
            }
        } else {
            session.flash({ error: 'username salah' })
            return response.redirect('back')
        }
    }

    async logout({ response, session }) {
        await session.clear()
        return response.route('login')
    }

    /**
     * Render a form to be used for creating a new user.
     * GET users/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
        return view.render('users.create')
    }

    /**
     * Create/save a new user.
     * POST users
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {}

    /**
     * Display a single user.
     * GET users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing user.
     * GET users/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update user details.
     * PUT or PATCH users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a user with id.
     * DELETE users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

module.exports = UserController