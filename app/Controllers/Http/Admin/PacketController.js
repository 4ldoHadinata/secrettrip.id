'use strict'

const Packet = use('App/Models/Packet')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with packets
 */
class PacketController {
    /**
     * Show a list of all packets.
     * GET packets
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        const packets = await Packet.all()
        return view.render('admin.packet.index', { packets: packets.rows })
    }

    /**
     * Render a form to be used for creating a new packet.
     * GET packets/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
        return view.render('admin.packet.create')
    }

    /**
     * Create/save a new packet.
     * POST packets
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        const { data } = request.all()
    }

    /**
     * Display a single packet.
     * GET packets/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing packet.
     * GET packets/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
        const packet = await Database
            .from('packets')
            .where('id', params.id)
        return view.render('admin.packet.edit', { packet: packet[0] })
    }

    /**
     * Update packet details.
     * PUT or PATCH packets/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response, session }) {
        const data = {
            name: request.input('name'),
            price: request.input('price')
        }
        try {
            await Database
                .table('packets')
                .where('id', params.id)
                .update(data)
            return response.route('packet.index')
        } catch (error) {
            session.flash({ error: 'Something Wrong! :( \n ' + error.message + '' })
            return response.redirect('back')
        }
    }

    /**
     * Delete a packet with id.
     * DELETE packets/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

module.exports = PacketController