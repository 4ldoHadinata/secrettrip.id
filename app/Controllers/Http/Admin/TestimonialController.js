'use strict'

const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with testimonials
 */
class TestimonialController {
    /**
     * Show a list of all testimonials.
     * GET testimonials
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        const testimonials = await Database
            .table('testimonials')
        return view.render('admin.testimonial.index', { testimonials: testimonials })
    }

    /**
     * Render a form to be used for creating a new testimonial.
     * GET testimonials/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
        return view.render('admin.testimonial.create')
    }

    /**
     * Create/save a new testimonial.
     * POST testimonials
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response, session }) {
        let data = {
            name: request.input('name'),
            testimonial: request.input('testimonial')
        }
        const insert = await Database.table('testimonials').insert(data)
        if (insert) {
            return response.route('testimonial.index')
        }
        session.flash({ error: 'Terjadi kesalahan' })
        return response.redirect('back')
    }

    /**
     * Display a single testimonial.
     * GET testimonials/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing testimonial.
     * GET testimonials/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
        const testimonial = await Database
            .from('testimonials')
            .where('id', params.id)
        return view.render('admin.testimonial.edit', { testimonial: testimonial[0] })
    }

    /**
     * Update testimonial details.
     * PUT or PATCH testimonials/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        const data = {
            name: request.input('name'),
            testimonial: request.input('testimonial')
        }
        try {
            await Database
                .table('testimonials')
                .where('id', params.id)
                .update(data)
            return response.route('testimonial.index')
        } catch (error) {
            session.flash({ error: 'Terjadi Kesalahan' })
            return response.redirect('back')
        }
    }

    /**
     * Delete a testimonial with id.
     * DELETE testimonials/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        try {
            await Database
                .table('testimonials')
                .where('id', params.id)
                .delete()
            return response.route('testimonial.index')
        } catch (error) {
            session.flash({ error: 'Terjadi Kesalahan' })
            return response.redirect('back')
        }
    }
}

module.exports = TestimonialController