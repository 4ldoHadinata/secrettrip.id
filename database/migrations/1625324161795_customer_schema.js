'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
    up() {
        this.create('customers', (table) => {
            table.increments()
            table.string('name').notNullable()
            table.string('email').notNullable()
            table.string('phone_number').notNullable()
            table.integer('total_person').notNullable()
            table.string('status')
            table.integer('packet_id')
                .unsigned()
                .references('packets.id')
                .onDelete('CASCADE')
            table.timestamps()
        })
    }

    down() {
        this.drop('customers')
    }
}

module.exports = CustomerSchema