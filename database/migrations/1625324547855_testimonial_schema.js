'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestimonialSchema extends Schema {
    up() {
        this.create('testimonials', (table) => {
            table.increments()
            table.string('name').notNullable()
            table.string('testimonial').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('testimonials')
    }
}

module.exports = TestimonialSchema