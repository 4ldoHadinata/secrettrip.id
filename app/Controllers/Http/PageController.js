'use strict'

const Database = use('Database')
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pages
 */
class PageController {
    async booking({ request, response, view, session }) {
        const booking = request.all()
        const price = await Database
            .from('packets')
            .select('price')
            .where('name', request.input('packet'))
        if (price.length > 0) {
            booking['price'] = price[0].price
        } else {
            booking['price'] = request.input('packet')
        }
        delete booking._csrf
        console.log(booking)
        try {
            await Database
                .table('bookings')
                .insert(booking)
            response.cookie('email', booking.email)
            return response.route('users.checkout')
        } catch (error) {
            session.put('error', error.message)
            return response.redirect('back')
        }
    }

    async checkout({ request, response, view }) {
        const price = await Database
            .from('bookings')
            .select('price')
            .where('email', request.cookie('email'))
        console.log(price)
        return view.render('users.checkout', { price: price })
    }

    async checkoutStore({ request, response, session }) {
        const image = request.file('gambar', {
            types: ['image'],
            size: '2mb'
        })
        const imageName = Math.floor(new Date() / 60)
        const name = 'images/booking/' + imageName + '-payment.' + image.extname
        await image.move('public', {
            name: name,
            overwrite: true
        })

        if (!image.moved()) {
            session.flash({ error: image.error() })
            return response.redirect('back')
        }
        try {
            await Database
                .table('bookings')
                .where('email', request.cookie('email'))
                .update({ bukti_bayar: name, status_bayar: 1 })
            session.flash({ success: 'Payment Success' })
            return response.route('users.index')
        } catch (error) {
            session.flash({ error: 'Something Wrong :( \n Try Again' })
            return response.redirect('back')
        }
    }

    async index({ request, response, view }) {
        const testimonials = await Database
            .from('testimonials')
        return view.render('users.index', { testimonials: testimonials })
    }
}

module.exports = PageController