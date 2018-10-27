'use strict'

const Schema = use('Schema')

class DriversSchema extends Schema {
  up () {
    this.create('drivers', (table) => {
      table.increments()
      table.string('uuid', 50).notNullable().unique()
      table.string('name', 60).notNullable()
      table.string('cpf_number', 15).unique().notNullable()
      table.string('drivers_license', 2).notNullable()
      table.date('admission_date', 10)
      table.date('resignation_date', 10)
      table.date('driversLicense_validate', 10)
      table.string('phone_1', 17)
      table.string('phone_2', 17)
      table.boolean('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('drivers')
  }
}

module.exports = DriversSchema
