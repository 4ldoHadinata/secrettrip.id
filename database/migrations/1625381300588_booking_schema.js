'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookingSchema extends Schema {
    up() {
        this.create('bookings', (table) => {
            table.increments()
            table.integer('customer_id')
                .unsigned()
                .references('customers.id')
                .onDelete('CASCADE')
            table.integer('packet_id')
                .unsigned()
                .references('packets.id')
                .onDelete('CASCADE')
            table.integer('status_bayar')
            table.text('bukti_bayar')
            table.timestamps()
        })
    }

    down() {
        this.drop('bookings')
    }
}

module.exports = BookingSchema