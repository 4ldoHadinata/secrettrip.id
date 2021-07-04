'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PacketSchema extends Schema {
    up() {
        this.create('packets', (table) => {
            table.increments()
            table.string('name').notNullable()
            table.text('description').notNullable()
            table.integer('price').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('packets')
    }
}

module.exports = PacketSchema