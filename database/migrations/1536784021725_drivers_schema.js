'use strict'

const Schema = use('Schema')

class DriversSchema extends Schema {
  up () {
    this.create('drivers', (table) => {
      table.increments()
      table.string('uuid').notNullable().unique()
      table.string('name').notNullable()
      table.string('cpf_number').unique().notNullable()
      table.string('drivers_license').notNullable()
      table.date('admission_date')
      table.date('resignation_date')
      table.double('salary')
      table.string('phone_1')
      table.string('phone_2')
      //table.enum('status',['active', 'inactive']).notNullable()
      table.boolean('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('drivers')
  }
}

module.exports = DriversSchema
