module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const custumer = {
            id: req.body.id,
            custumerType: req.body.custumerType,
            situation: req.body.situation,
            fantasyName: req.body.fantasyName,
            email: req.email.email,
            companyName: req.body.companyName,
            cnpj: req.body.cnpj,
            cpf: req.body.cpf,
            stateRegistration: req.body.stateRegistration,
            free: req.body.free,
            responsible: req.body.responsible,
            commercialPhone: req.body.commercialPhone,
            cellPhone: req.body.cellPhone,
            note: req.body.note
        }
        
        if(req.params.id) custumer.id = req.params.id

        try {
            existsOrError(custumer.custumerType, 'Tipo de Cliente não informado')
            existsOrError(custumer.situation, 'Situação não informado')
            existsOrError(custumer.fantasyName, 'Nome fantasia não informado')
            existsOrError(custumer.email, 'E-mail não informado')
            existsOrError(custumer.companyName, 'Nome da empresa não informado')
            existsOrError(custumer.responsible, 'Responsavel não informado')
            existsOrError(custumer.commercialPhone, 'Telefone não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(category.id) {
            app.db('custumers')
                .update(custumer)
                .where({ id: custumer.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('custumers')
                .insert(custumer)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do Cliente não informado.')

            const rowsDeleted = await app.db('custumers')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Cliente não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }


    const get = (req, res) => {
        app.db('custumers')
            .then(custumers => res.json(custumers))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('custumers')
            .where({ id: req.params.id })
            .first()
            .then(custumer => res.json(custumer))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }
}