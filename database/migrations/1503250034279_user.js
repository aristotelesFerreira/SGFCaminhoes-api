'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('uuid', 50).notNullable().unique()
      table.string('name', 60).notNullable()
      table.string('email', 60).notNullable().unique()
      table.string('password', 60).notNullable()
      table.enum('acess',['operator', 'admin']).notNullable()
      table.boolean('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
