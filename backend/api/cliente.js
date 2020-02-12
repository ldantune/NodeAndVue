module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        // const cliente = {
        //     id: req.body.id,
        //     tipo: req.body.tipo,
        //     situacao: req.body.situacao,
        //     nomeFantasia: req.body.nomeFantasia,
        //     email: req.body.email,
        //     nomeEmpresa: req.body.nomeEmpresa,
        //     cnpj: req.body.cnpj,
        //     cpf: req.body.cpf,
        //     inscricaoEstadual: req.body.inscricaoEstadual,
        //     isento: req.body.isento,
        //     responsavel: req.body.responsavel,
        //     telefoneComercial: req.body.telefoneComercial,
        //     celular: req.body.celular,
        //     observacao: req.body.observacao
        // }

        const cliente = { ...req.body }
        
        if(req.params.id) cliente.id = req.params.id

        try {
            existsOrError(cliente.tipo, 'Tipo de Cliente não informado')
            existsOrError(cliente.situacao, 'Situação não informado')
            existsOrError(cliente.nomeFantasia, 'Nome fantasia não informado')
            existsOrError(cliente.email, 'E-mail não informado')
            existsOrError(cliente.nomeEmpresa, 'Nome da empresa não informado')
            existsOrError(cliente.responsavel, 'Responsavel não informado')
            existsOrError(cliente.telefoneComercial, 'Telefone não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        console.log(cliente)
        if(cliente.id) {
            app.db('clientes')
                .update(cliente)
                .where({ id: cliente.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('clientes')
                .insert(cliente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                
        }
        
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do Cliente não informado.')

            const rowsDeleted = await app.db('clientes')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Cliente não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }


    const get = (req, res) => {
        app.db('clientes')
            .then(clientes => res.json(clientes))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('clientes')
            .where({ id: req.params.id })
            .first()
            .then(cliente => res.json(cliente))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }
}