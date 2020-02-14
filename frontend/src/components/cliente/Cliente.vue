<template>
  <div class="cliente">
    <b-form>
      <input id="cliente-id" type="hidden" v-model="cliente.id"/>
      <!--  -->
      <b-row>
          <b-col md="3" sm="12">
              <b-form-group label="Tipo de Cliente:" label-for="cliente-tipo">
                <b-form-select v-model="cliente.tipo" :options="ct"></b-form-select>
              </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
              <b-form-group label="Situação:" label-for="cliente-situacao">
                <b-form-select v-model="cliente.situacao" :options="sc"></b-form-select>
              </b-form-group>
          </b-col>
      </b-row>
      <!--  -->
      <b-row>
        <b-col md="4" sm="12">
          <b-form-group label="Nome Fantasia:" label-for="cliente-nomeFantasia">
            <b-form-input id="cliente-nomeFantasia" type="text" 
              v-model="cliente.nomeFantasia" 
              required :readonly="mode ==='remove'" 
              placeholder="Informe o Nome Fantasia da empresa..."/>
          </b-form-group>
        </b-col>
        <b-col md="4" sm="12">
          <b-form-group label="Nome Empresa:" label-for="cliente-nomeEmpresa">
            <b-form-input id="cliente-nomeEmpresa" 
              type="text" v-model="cliente.nomeEmpresa" 
              required :readonly="mode ==='remove'" 
              placeholder="Informe o Nome da Empresa..."/>
          </b-form-group>
        </b-col>
        <b-col md="4" sm="12">
          <b-form-group label="E-mail:" label-for="cliente-email">
            <b-form-input id="cliente-email" 
              type="text" v-model="cliente.email" 
              required :readonly="mode ==='remove'" 
              placeholder="Informe o E-mail do Usuário..."/>
          </b-form-group>
        </b-col>
      </b-row>

      <!--  -->
      <b-row>
        <b-col md="3" sm="12">
          <b-form-group label="CNPJ:" label-for="cliente-cnpj">
            <b-form-input id="cliente-cnpj" 
              type="number" v-model="cliente.cnpj" 
              :readonly="mode ==='remove'" 
              placeholder="Informe o CNPJ..."/>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="12">
          <b-form-group label="CPF:" label-for="cliente-cpf">
            <b-form-input id="cliente-cpf" type="number" 
              v-model="cliente.cpf" required 
              :readonly="mode ==='remove'" 
              placeholder="Informe o CPF..."/>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="12">
          <b-form-group label="Inscrição Estadual:" label-for="cliente-inscricaoEstadual">
            <b-form-input id="cliente-inscricaoEstadual" 
              type="number" v-model="cliente.inscricaoEstadual" 
              required :readonly="mode ==='remove'" 
              placeholder="Informe a Inscrição Estadual..."/>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="12">
            <b-form-group label="ISENTO?" label-for="cliente-isento">
                <b-form-checkbox id="isento" v-model="cliente.isento" name="isento">
                </b-form-checkbox>
            </b-form-group>
        </b-col>
      </b-row>

      <!--  -->
      <b-row>
        <b-col md="4" sm="12">
          <b-form-group label="Responsavel:" label-for="cliente-responsavel">
            <b-form-input id="cliente-responsavel" 
              type="text" v-model="cliente.responsavel" 
              required :readonly="mode ==='remove'" 
              placeholder="Informe o Responsável..."/>
          </b-form-group>
        </b-col>
        <b-col md="4" sm="12">
          <b-form-group label="Telefone:" label-for="cliente-telefoneComercial">
            <b-form-input id="cliente-telefoneComercial" 
              type="number" v-model="cliente.telefoneComercial" 
              required :readonly="mode ==='remove'" />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="12">
          <b-form-group label="Celular:" label-for="cliente-celular">
            <b-form-input id="cliente-celular" type="number" 
              v-model="cliente.celular" 
              required :readonly="mode ==='remove'"/>
          </b-form-group>
        </b-col>
      </b-row>
    <b-row>
        <b-col md="12" sm="12">
            <b-form-textarea id="textarea"
                v-model="cliente.observacao"
                rows="3"
                max-rows="6">
            </b-form-textarea>
        </b-col>
    </b-row>
      <b-row>
        <b-col xs="12">
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr>
    <b-table hover striped :items="clientes" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
  import { baseApiUrl, showError} from '@/global'
import axios from 'axios'

export default {
    name: 'Cliente',
    data: function() {
      return {
        mode: 'save',
        cliente: {},
        clientes: [],
        fields: [
          {key: 'id', label: 'Código', sortable: true},
          {key: 'nomeEmpresa', label: 'Nome Empresa', sortable: true},
          {key: 'email', label: 'E-mail', sortable: true},
          // {key: 'isento', label: 'Administrador', sortable: true,
          //   formatter: value => value ? 'Sim' : 'Não'},
          {key: 'actions', label: 'Ações'}
        ],
        selected: null,
        ct: [
            {value: null, text: 'Selecione uma opção'},
            {value: 'J', text: 'Jurídica'},
            {value: 'F', text: 'Física'},
        ],
        sc: [
            {value: true, text: 'Ativo'},
            {value: false, text: 'Inativo'}
        ],
        observacao: '',
        celular: 0,
        isento: false,
        telefoneComercial: 0
      }
    },
    methods: {
      loadCustomers() {
        const url = `${baseApiUrl}/clientes`
            axios.get(url).then(res => {
                this.clientes = res.data
            })
      },
      reset() {
        this.mode = 'save'
        this.cliente = {}
        this.loadCustomers()
      },
      save() {
        const method = this.cliente.id ? 'put' : 'post'
        const id = this.cliente.id ? `/${this.cliente.id}` : ''
        axios[method](`${baseApiUrl}/clientes${id}`, this.cliente)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
          })
          .catch(showError)
      },
      remove() {
        const id = this.cliente.id
        axios.delete(`${baseApiUrl}/clientes/${id}`)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
          })
          .catch(showError)
      },
      loadUser(cliente, mode = 'save') {
        this.mode = mode
        this.cliente = { ...cliente}

      }
    },
    mounted() {
        this.loadCustomers()
    }
}
</script>

<style>

</style>