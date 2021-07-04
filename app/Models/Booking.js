'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Booking extends Model {
    customers() {
        return this.hasMany('App/Models/Customer')
    }
}

module.exports = Booking