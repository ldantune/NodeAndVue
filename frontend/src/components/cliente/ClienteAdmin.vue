<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistemas"
            sub="Cadastros & Cia"/>
        
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Cliente" active>
                        <Cliente/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import Cliente from '../cliente/Cliente'
export default {
    name: 'ClienteAdmin',
    components: {PageTitle, Cliente}
}
</script>

<style>

</style>