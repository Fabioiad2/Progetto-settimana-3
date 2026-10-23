# idea core:

## creare un gestionale di prodotti per un e-commerce tipo amazon

### requisiti
let prodotti = [{}]

oggetto prodotto = {
    img:"",
    nome:"",
    descrizione:"",
    id:0,
    categoria: ",
    inStock: false
}

categoria = []

variabile isOnEdit -> è un boolean che si attiverà tramite click su un bottone edit che sarà solo nella cella prevista

darkmode gestita dal javascript

nell'html sarà visualizzato il bottone aggiungi prodotto il form sarà messo di default a css display none al click del bottone "aggiungi prodotto" vado a levare la proprietà display none

function aggiungi Prodotto(){
    catturo la mia .row con querySelector
    catturo gli input che saranno creato nell'html
    da javascirpt mi prendo gli id per il value

    poi mi costruiisco l'oggetto
    
    let nuovoProdotto
    prodotti = [...prodotti, nuovoProdotto]

}


un for che cicla una lista di prodotti con una table 

nel for ci sarà un if -> if(isEdit){
    genera l'input che avrà un addEvent listener che al change farà scattare la funzione ModificaProdotto() come parametro gli passo p.id
}

da valutare se passare id o tutto il prodotto ma credo gli sia meglio passargli il prodotto per una modifica diretta
function modifica prodotto(id){
    find (prodotto.id == id){

    }
}

visualizzazione dati come: Numeri prodotti, Numero categorie, mostra le categorie a schermo, numero di prodotti in stock quindi quanti prodotti hanno una quantità true
