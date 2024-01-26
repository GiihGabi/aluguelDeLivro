const AppTemplate = `
    <div class="control-section" style="margin-top: 5%">
        <div align='center'>
            <h1>CADASTRAR LIVRO</h1>
        </div>
        <div class="border p-4 col-md-12">
            <div id="form1" @keyup.enter="cadLivro">
                <div class="e-float-input">
                    <ejs-textbox floatLabelType="Auto" v-model="isbn" placeholder="isbn"></ejs-textbox>
                </div>   
                <div class="e-float-input">
                    <ejs-textbox floatLabelType="Auto" v-model="titulo" placeholder="Título"></ejs-textbox>
                </div>   
                <div class="e-float-input">
                    <ejs-textbox floatLabelType="Auto" v-model="edicao" placeholder="Edição"></ejs-textbox>
                </div>   
                <div class="e-float-input">
                    <ejs-textbox floatLabelType="Auto" v-model="valor" placeholder="Valor"></ejs-textbox>
                </div>
                <br>
                <br>
                <div>
                    <label for="autor">Selecione o autor correspondente ao livro que será cadastrado</label>
                    <ejs-dropdownlist :fields="fields" :dataSource="items" ref='dropdownObj' v-model="listAutor" for="autor">
                    </ejs-dropdownlist>
                </div>
                <div id="botoesedit">
                    <div class="botoesedit">
                        <ejs-button v-on:click.native="cadLivro()" class="btn btn-success">
                            Cadastrar
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
            <ejs-grid ref="livros" :dataSource="data">
                <e-columns>
                    <e-column field="isbn" headerText="isbn"></e-column>
                    <e-column field="titulo" headerText="Título"></e-column>
                    <e-column field="edicao" headerText="Edição"></e-column>
                    <e-column field="valor" headerText="Valor"></e-column>
                    <e-column field="autor" headerText="Autor"></e-column>
                </e-columns>
            </ejs-grid>
		</div>
    </div>`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            data: [],
            isbn: '',
            titulo: '',
            edicao: '',
            valor: '',
            autor: '',
            listAutor: '',
            items: [],
            fields: { text: 'nome', value: 'codigo' },
          }
      },
      methods:{
        selectAutor() {
            axios.post(BASE + "/cadastrarautor/listaAutor").then((res) => {
                console.log(res.data);
                this.items = res.data;
            });
        },
        listaLivro() {
            axios.post(BASE + '/cadastrarlivro/listaLivro').then((res) => {
                console.log(res.data);
                this.data = res.data;
            })
        },
        cadLivro() {
            const data = { 'isbn': this.isbn, 'titulo': this.titulo, 'edicao': this.edicao, 'valor': this.valor, 'autor': this.listAutor};
            axios.post(BASE + '/cadastrarlivro/cadLivro', data).then((res) => {
                console.log(res.data);
                this.resetInput();
            });
        },
        resetInput() {
            this.isbn = "";
            this.titulo = "";
            this.edicao = "";
            this.valor = "";
            this.$refs.dropdownObj.ej2Instances.value = null;
            this.listaLivro();
        }
      },
      mounted() {
        this.listaLivro();
        this.selectAutor(); 
      }
  });
