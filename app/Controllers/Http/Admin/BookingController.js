'use strict'

const Booking = use('App/Models/Booking')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bookings
 */
class BookingController {
    /**
     * Show a list of all bookings.
     * GET bookings
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        const bookings = await Database
            .table('bookings')
            // .select('bookings.*', 'customers.name')
            // .innerJoin('customers', 'customers.id', 'bookings.customer_id')
        return view.render('admin.booking.index', { bookings: bookings })
    }

    /**
     * Render a form to be used for creating a new booking.
     * GET bookings/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new booking.
     * POST bookings
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {}

    /**
     * Display a single booking.
     * GET bookings/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing booking.
     * GET bookings/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
        let id = params.id
        const booking = await Database
            .from('bookings')
            // .select('bookings.*', 'customers.name', 'packets.name as packet')
            // .innerJoin('customers', 'customers.id', 'bookings.customer_id')
            // .innerJoin('packets', 'packets.id', 'bookings.packet_id')
            .where('bookings.id', id)
        return view.render('admin.booking.edit', { booking: booking[0] })
    }

    /**
     * Update booking details.
     * PUT or PATCH bookings/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {

    }

    /**
     * Delete a booking with id.
     * DELETE bookings/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}

    async accept({ params, request, response, session }) {
        let id = params.id
        const update = await Database
            .table('bookings')
            .where('id', id)
            .update({ verified_payment: 1 })
        if (update) {
            session.flash({ success: 'Payment Verified' })
            return response.route('booking.edit', { id: id })
        }
    }
}

module.exports = BookingController