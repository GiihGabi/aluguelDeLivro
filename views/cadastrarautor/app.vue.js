const AppTemplate = `
    <div class="control-section" style="margin-top: 5%">
        <div align='center'>
            <h1>CADASTRAR AUTOR</h1>
        </div>
        <div class="border p-4 col-md-12">
            <div id="form1" @keyup.enter="cadAutor">
                <div class="form-group" style="padding-top: 11px;">
                    <div class="e-float-input">
                    <ejs-textbox floatLabelType="Auto" v-model="nome" placeholder="Nome do Autor"></ejs-textbox>
                </div>   
                <div id="botoesedit">
                    <div class="botoesedit">
                        <ejs-button v-on:click.native="cadAutor()" class="btn btn-success">
                            Cadastrar
                        </ejs-button>
                        <ejs-button v-on:click.native="resetInput()" class="btn btn-warning">
                            Cancelar
                        </ejs-button>
                    </div>
                </div>
            </form> 
        </div>
        <br>
		<div>
            <ejs-grid ref="autor" :dataSource="data">
                <e-columns>
                    <e-column field="codigo" headerText="ID"></e-column>
                    <e-column field="nome" headerText="NOME"></e-column>
                </e-columns>
            </ejs-grid>
		</div>
    </div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            data: null,
            nome: '',
          };
      },
      methods:{
        listaAutor() {
            axios.post(BASE + "/cadastrarautor/listaAutor").then((res) => {
                console.log(res.data);
                this.data = res.data;
            })
        },
        cadAutor() {
            const data = { 'nome': this.nome };
            axios.post(BASE + '/cadastrarautor/cadAutor', data).then((res) => {
                console.log(res.data);
                this.resetInput();
            })
        },
        resetInput() {
            this.nome = "";
            this.listaAutor();
        }

      },
      mounted() {
        this.listaAutor();
      }
  });
