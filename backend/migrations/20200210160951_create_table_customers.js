
exports.up = function (knex, Promise) {
    return knex.schema.createTable('customers', table => {
        table.increments('id').primary()
        table.string('custumerType').notNull()
        table.boolean('situation').notNull()
        table.string('fantasyName').notNull()
        table.string('email').notNull()
        table.string('companyName').notNull()
        table.integer('cnpj')
        table.integer('cpf')
        table.integer('stateRegistration')
        table.boolean('free')
        table.string('responsible').notNull()
        table.integer('commercialPhone').notNull()
        table.integer('cellPhone')
        table.string('note')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('customers')
};
