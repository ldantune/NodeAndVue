
exports.up = function (knex, Promise) {
    return knex.schema.createTable('clientes', table => {
        table.increments('id').primary()
        table.string('tipo').notNull()
        table.boolean('situacao').notNull()
        table.string('nomeFantasia').notNull()
        table.string('email').notNull()
        table.string('nomeEmpresa').notNull()
        table.integer('cnpj')
        table.integer('cpf')
        table.integer('inscricaoEstadual')
        table.boolean('isento')
        table.string('responsavel').notNull()
        table.integer('telefoneComercial').notNull()
        table.integer('celular')
        table.string('observacao')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('clientes')
};
