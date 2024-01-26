const AppTemplate = `
    <div class="control-section" style="margin-top: 5%">
        <div align='center'>
            <h1>ALUGAR LIVRO</h1>
        </div>
        <div class="border p-4 col-md-12">
            <div id="form1" @keyup.enter="cadAluno">
                <div class='content'>
                    <ejs-dropdownlist :fields='nomesFields' :dataSource='itemsNomes' ref='dropdownObj' v-model="nome" filterType='Contains' :allowFiltering='true' :placeholder='nomeAluno'></ejs-dropdownlist>
                </div>
                <br>
                <div class='content'>
                    <ejs-dropdownlist :fields='fieldsLivro' :dataSource='itemsLivro' ref='dropdownObj2' v-model="listLivro" filterType='Contains' :allowFiltering='true' :placeholder='nomeLivro'></ejs-dropdownlist>
                </div>
                <br>
                <div class="col-lg-12 control-section">
                    <div id="wrapper">
                        <ejs-datepicker id="datepicker" :placeholder="placedataemprestimo" v-model="dataemprestimo"></ejs-datepicker>
                    </div>
                </div>
                <br>
                <div class="col-lg-12 control-section">
                    <div id="wrapper">
                        <ejs-datepicker id="datepicker" :placeholder="placedatadevolucao" v-model="dataprevistadevolucao"></ejs-datepicker>
                    </div>
                </div>
                <div id="botoesedit">
                    <div class="botoesedit">
                        <ejs-button v-on:click.native="cadEmp()" class="btn btn-success">
                            Alugar
                        </ejs-button>
                        <ejs-button v-on:click.native="resetInput()" class="btn btn-warning">
                            Cancelar
                        </ejs-button>
                    </div>
                </div>
            </div> 
        </div>
        <br>
		<div>
            <h2 style="text-align: center">LIVROS EXISTENTES</h2>
            <ejs-grid ref="alugarlivro" :dataSource="data">
                <e-columns>
                    <e-column field="isbn" headerText="isbn"></e-column>
                    <e-column field="titulo" headerText="Título"></e-column>
                    <e-column field="edicao" headerText="Edição"></e-column>
                    <e-column field="valor" headerText="Valor"></e-column>
                    <e-column field="autor" headerText="Autor"></e-column>
                </e-columns>
            </ejs-grid>
		</div>
    </div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            data: [],
            // DROPDOWN NOMES DOS ALUNOS
            nomesFields: { text: 'nome', value: 'ra'},
            itemsNomes: [],
            nome: '',
            nomeAluno: 'Digite o nome do aluno',
            // DROPDOWN LIVRO
            fieldsLivro: { text: 'titulo', value: 'codigo' },
            itemsLivro: [],
            listLivro: '',
            nomeLivro: 'Digite o nome do livro',
            // DATAS
            placedataemprestimo: "Data do empréstimo",
            placedatadevolucao: "Data da devolução",
            dataemprestimo: '',
            dataprevistadevolucao: '',
            // GRID LIVROS
            isbn: '',
            titulo: '',
            edicao: '',
            valor: '',
            autor: '',
          }
      },

      methods:{
        selectAluno() {
            axios.post(BASE + '/cadastraraluno/listaAlunos').then((res) => {
            console.log(res.data);
            this.itemsNomes = res.data;
            })
        },
        selectLivro() {
            axios.post(BASE + '/cadastrarlivro/listaLivro').then((res) => {
                console.log(res.data);
                this.itemsLivro = res.data;
            })
        },
        onFiltering: function(e) {
            var query = new Query();
            query = (e.text !== '') ? query.where('nome', 'startswith', e.text, true) : query;
            e.updateData(this.data, query);
        },
        cadEmp() {
            const data = { 'nome': this.nome, 'livro': this.listLivro, 'dataAluguel': this.dataemprestimo, 'dataDevolucao': this.dataprevistadevolucao };
            axios.post(BASE + '/alugarlivro/cadEmp', data).then((res) => {
                console.log(res.data);
                this.resetInput(); 
            })
        },
        listaLivros() {
            axios.post(BASE + '/alugarlivro/listaLivros').then((res) => {
                console.log(res.data);
                this.data = res.data;
            })
        },
        resetInput() {
            this.$refs.dropdownObj.ej2Instances.value = null;
            this.$refs.dropdownObj2.ej2Instances.value = null;
            this.dataemprestimo = "";
            this.dataprevistadevolucao = "";
            this.listaLivros();
        }
      },
      mounted() {
        this.selectAluno();
        this.selectLivro();
        this.listaLivros();
      }
  });
