'use strict'

const Schema = use('Schema')

class DriversSchema extends Schema {
  up () {
    this.create('drivers', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('cpf_number').unique().notNullable()
      table.string('drivers_license').notNullable()
      table.string('admission_date').notNullable()
      table.string('resignation_date')
      table.string('salary')
      table.string('phone_1')
      table.string('phone_2')
      table.timestamps()
    })
  }

  down () {
    this.drop('drivers')
  }
}

module.exports = DriversSchema
