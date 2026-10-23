let btnProduct = document.querySelector('#btnAddProduct')
let form = document.querySelector('#form')
let formNome = document.querySelector('#formNome')
let formDescrizione = document.querySelector('#formDescrizione')
let formImmagine = document.querySelector('#formImmagine')
let formInStock = document.querySelector('#formInStock')
let formCategoria = document.querySelector('#formCategoria')
let toastMessage = document.querySelector('#toastMessage')
let tabella = document.querySelector('#tabella')
let x = document.querySelector('#x')
let cercaNome = document.querySelector('#cercaNome')
let prodottiTotali = document.querySelector('#prodottiTotali')
let categorieTotali = document.querySelector('#categorieTotali')
let prodottiDisponibili = document.querySelector('#disponibili')
let darkModeButton = document.querySelector('#darkmode')
let body = document.querySelector('body')
let main = document.querySelector('main')
let filtraPer = document.querySelector('#filtraPer')
let selectedProduct = document.querySelector('#prodottoSelezionato')
let tableButton = document.querySelector('#tableButton')
let ordinaPer = document.querySelector('#ordinaPer')

let prodotti = [
    {
        id: 0,
        nome: "Telefono",
        descrizione: "Un telefono",
        img: "https://google.com",
        quantity: 1,
        categoria: "elettronica"
    },
    {
        id: 2,
        nome: "Maglietta",
        descrizione: "Una maglietta",
        img: "https://google.com",
        quantity: 0,
        categoria: "abbigliamento"
    },
    {
        id: 3,
        nome: "Divano",
        descrizione: "Un divano",
        img: "https://google.com",
        quantity: 1,
        categoria: "Prodotti per la casa"
    },
]
console.log(prodotti, "prodotti start")

let categorie = ['elettronica', 'abbigliamento', 'Prodotti per la casa']

//  creo qui dinamicamente le select con foreach
let categoriaSelezionata = '';

categorie.forEach(c => {
    console.log(c)
    let categoria = document.createElement('option')
    categoria.value = c
    categoria.textContent = c
    formCategoria.appendChild(categoria)

    // filro categoria
    let option = document.createElement('option')
    option.textContent = c
    option.value = c
    filtraPer.appendChild(option)
    console.log("sono qui", c)
})

let id = 4

let filtro = '';
let ordinamento = 'categoria';

ordinaPer.addEventListener('change', () => {
    ordinamento = ordinaPer.value
    IsonEdit = null
    prodottoSelezionato = null
    isdettaglio = null
    renderProdotti(prodotti)
})

filtraPer.addEventListener('change', () => {
    categoriaSelezionata = filtraPer.value
    IsonEdit = null
    prodottoSelezionato = null
    isdettaglio = null
    renderProdotti(prodotti)
})

cercaNome.addEventListener('input', (e) => {
    filtro = cercaNome.value.toLowerCase()
    console.log(filtro)
    IsonEdit = null
    prodottoSelezionato = null
    isdettaglio = null
    renderProdotti(prodotti)
})




function AggiungiProdotti() {
    if (formNome.value.length <= 0) {
        toast('Inserisci il nome del prodotto')
        return
    }
    if (formInStock.value === '') {
        toast('Inserisci la quantità')
        return
    }
    if (!(formInStock.value >= 0)) {
        toast('Inserisci una quantità numerica maggiore o uguale a zero')
        return
    }
    let nuovoProdotto = {
        id: id++,
        nome: formNome.value,
        descrizione: formDescrizione.value,
        img: formImmagine.value,
        quantity: formInStock.value,
        categoria: formCategoria.value
    }
    console.log(nuovoProdotto)
    prodotti = [...prodotti, nuovoProdotto]
    console.log(prodotti, "prodotti + nuovo prodotto")
    form.classList.add('invisibile')
    form.reset()
    toast('hai inserito un prodotto')
    renderProdotti(prodotti)
}

x.addEventListener('click', () => {
    form.classList.toggle('invisibile')
    form.reset()
})

btnProduct.addEventListener('click', () => {
    console.log("Form aperto")
    form.classList.toggle('invisibile')

})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    AggiungiProdotti()
})


// mostrare il singolo prodotto

function toast(textMsg) {
    toastMessage.textContent = ''
    let messaggio = document.createElement('span')
    messaggio.textContent = textMsg
    messaggio.classList.add('toast')
    toastMessage.appendChild(messaggio)
    setTimeout(() => {
        messaggio.remove()
    }, 3000)
}
let IsonEdit = null;

let prodottoSelezionato = null;
let isdettaglio = null

let containerButton;
function onClickCella(prodotto) {

    console.log(prodotto, "prodotto id")
    console.log(IsonEdit)
    let tbodyedit = document.createElement('tbody')
    let trEdit = document.createElement('tr');
    let tdNome = document.createElement('td')
    let tdNomeInput = document.createElement('input')
    tdNomeInput.value = prodotto.nome
    let tdDescrizione = document.createElement('td')
    let tdDescrizioneInput = document.createElement('input')
    tdDescrizioneInput.value = prodotto.descrizione
    let tdImmagine = document.createElement('td')
    let tdImmagineInput = document.createElement('input')
    tdImmagineInput.value = prodotto.img
    let tdQuantity = document.createElement('td')
    let tdItdQuantityInput = document.createElement('input')
    tdItdQuantityInput.type = 'number'
    tdItdQuantityInput.value = prodotto.quantity
    let tdcategory = document.createElement('td')
    let tdItdcategoryInput = document.createElement('select')
    categorie.forEach(c => {
        let option = document.createElement('option')
        option.value = c
        option.textContent = c
        tdItdcategoryInput.appendChild(option)
    })
    tdItdcategoryInput.value = prodotto.categoria
    let apriDettaglio = document.createElement('button');

        apriDettaglio.type = 'button';
        apriDettaglio.textContent = 'Apri dettaglio';

        apriDettaglio.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            prodottoSelezionato = prodotto;
            isdettaglio = true;

            dettaglioProdotto(prodotto);
});
    

    tbodyedit.appendChild(trEdit)

    trEdit.appendChild(tdNome)
    trEdit.appendChild(tdDescrizione)
    trEdit.appendChild(tdImmagine)
    trEdit.appendChild(tdQuantity)
    trEdit.appendChild(tdcategory)

    tdNome.appendChild(tdNomeInput)
    tdDescrizione.appendChild(tdDescrizioneInput)
    tdImmagine.appendChild(tdImmagineInput)
    tdQuantity.appendChild(tdItdQuantityInput)
    tdcategory.appendChild(tdItdcategoryInput)

    tabella.appendChild(tbodyedit)
    let bottoneInvia = document.createElement('button')
    let bottoneAnnulaModifiche = document.createElement('button')
    bottoneAnnulaModifiche.textContent = 'annulla modifiche'
    bottoneAnnulaModifiche.addEventListener('click', () => {
        isdettaglio = null
        console.log('cliccato', IsonEdit)
        IsonEdit = null
        console.log(IsonEdit, "dopo")
        prodottoSelezionato = null
        renderProdotti(prodotti)
    })
    bottoneInvia.textContent = 'Salva modifiche'
    bottoneInvia.addEventListener('click', () => {
        if (tdNomeInput.value.length <= 0) {
            toast('Inserisci il nome del prodotto')
            return
        }
        if (tdItdQuantityInput.value === '') {
            toast('Inserisci la quantità')
            return
        }
        if (!(tdItdQuantityInput.value >= 0)) {
            toast('Inserisci una quantità numerica maggiore o uguale a zero')
            return
        }
        isdettaglio = null
        console.log('cliccato')
        console.log(prodotto, "dopo")
        console.log(prodotti, "dopo")
        prodotto.nome = tdNomeInput.value
        prodotto.descrizione = tdDescrizioneInput.value
        prodotto.img = tdImmagineInput.value
        prodotto.quantity = tdItdQuantityInput.value
        prodotto.categoria = tdItdcategoryInput.value
        console.log(prodotto, "dopo")
        console.log(prodotti, "dopo")
        IsonEdit = null
        prodottoSelezionato = null
        renderProdotti(prodotti)
        toast('Prodotto modificato con successo')
    })
    let bottoneElimina = document.createElement('button')
    bottoneElimina.classList.add('btnAllineati')
    bottoneElimina.addEventListener('click', (e) => {
        isdettaglio = null
        e.stopPropagation()
        eliminaProdotto(prodotto)
    })
    bottoneElimina.textContent = 'Elimina !IRREVERSIBILE!'
    
    containerButton = document.createElement('div')
    containerButton.classList = 'containerbutton'
    containerButton.appendChild(bottoneInvia)
    containerButton.appendChild(bottoneAnnulaModifiche)
    containerButton.appendChild(bottoneElimina)
    containerButton.appendChild(apriDettaglio)
    tableButton.appendChild(containerButton)
    console.log(prodottoSelezionato,"prodotto selezionato")
    
}

function eliminaProdotto(prodotto) {
    console.log('elimina')
    prodotti = prodotti.filter(p => {
        return p.id !== prodotto.id
    })
    IsonEdit = null
    prodottoSelezionato = null
    renderProdotti(prodotti)
    toast('Prodotto eliminato con successo')
}

function dettaglioProdotto(prodottoSelezionato) {
    selectedProduct.classList.add('card')
    selectedProduct.textContent = ''
    let nome = document.createElement('h3')
    nome.textContent = prodottoSelezionato.nome
    let descrizione = document.createElement('p')
    descrizione.textContent = prodottoSelezionato.descrizione
    let quantity = document.createElement('p')
    quantity.textContent = `Quantità: ${prodottoSelezionato.quantity}`
    let categoria = document.createElement('p')
    categoria.textContent = `Categoria: ${prodottoSelezionato.categoria}`
    selectedProduct.appendChild(nome)
    selectedProduct.appendChild(descrizione)
    selectedProduct.appendChild(quantity)
    selectedProduct.appendChild(categoria)
}

function ordinaProdotti(listaProdotti) {
    if (ordinamento === '') {
        return listaProdotti
    }
    let listaOrdinata = []
    let rimanenti = [...listaProdotti]
    listaProdotti.forEach(() => {
        let primo = rimanenti[0]
        rimanenti.forEach(p => {
            if (ordinamento === 'nome' && primo.nome.toLowerCase() > p.nome.toLowerCase()) {
                primo = p
            }
            // La sottrazione confronta le quantità come numeri, anche se arrivano dagli input.
            if (ordinamento === 'quantitaCrescente' && primo.quantity - p.quantity > 0) {
                primo = p
            }
            if (ordinamento === 'quantitaDecrescente' && p.quantity - primo.quantity > 0) {
                primo = p
            }
        })
        listaOrdinata = [...listaOrdinata, primo]
        rimanenti = rimanenti.filter(p => p.id !== primo.id)
    })
    return listaOrdinata
}

function renderProdotti(listaProdotti = prodotti) {
    //    toast("prova")
    if (!Array.isArray(listaProdotti)) {
        listaProdotti = [listaProdotti]
    }

    listaProdotti = listaProdotti.filter(p => p.nome.toLowerCase().includes(filtro))
    if (categoriaSelezionata !== '') {
        listaProdotti = listaProdotti.filter(p => p.categoria === categoriaSelezionata)
    }

    if (ordinamento === 'categoria') {
        let listaRaggruppata = []
        categorie.forEach(c => {
            let gruppo = listaProdotti.filter(p => p.categoria === c)
            listaRaggruppata = [...listaRaggruppata, ...gruppo]
        })
        listaProdotti = listaRaggruppata
    } else {
        listaProdotti = ordinaProdotti(listaProdotti)
    }

    tableButton.textContent = ''
    if (prodottoSelezionato && isdettaglio == true) {
        dettaglioProdotto(prodottoSelezionato)
    }
    else{
        selectedProduct.textContent = ''
        selectedProduct.classList.remove('card')
    }

   

    tabella.textContent = ''
    prodottiTotali.textContent = prodotti.length
    categorieTotali.textContent = categorie.length
    let disponibili = prodotti.filter(p => {
        return p.quantity > 0

    })
    prodottiDisponibili.textContent = disponibili.length

    const avvisoTable = document.querySelector('#avviso')
    avvisoTable.textContent = ''
    if (listaProdotti.length <= 0) {
        avvisoTable.textContent = 'non ci sono prodotti'
    }

    if (prodotti.length <= 0) {
        return
    }
    let thead = document.createElement('thead')
    let tr = document.createElement('tr')
    let chiavi = Object.keys(prodotti[0])
    chiavi.forEach(chiave => {
        if (chiave !== 'id') {
            console.log(chiave, "chiave")
            let th = document.createElement('th')
            th.textContent = chiave
            tr.appendChild(th)
        }
    })
    thead.appendChild(tr)
    tabella.appendChild(thead)
    let ultimaCategoria = null
    listaProdotti.forEach(prodotto => {
        if (ordinamento === 'categoria' && ultimaCategoria !== prodotto.categoria) {
            let gruppo = document.createElement('tbody')
            gruppo.classList.add('gruppoCategoria')
            let rigaCategoria = document.createElement('tr')
            chiavi.forEach(chiave => {
                if (chiave !== 'id') {
                    let cella = document.createElement('td')
                    if (chiave === 'nome') {
                        cella.textContent = prodotto.categoria
                    }
                    rigaCategoria.appendChild(cella)
                }
            })
            gruppo.appendChild(rigaCategoria)
            tabella.appendChild(gruppo)
            ultimaCategoria = prodotto.categoria
        }
        
        // Controllo se il prodotto è in modifica
        if (IsonEdit === prodotto.id) {
            onClickCella(prodotto)
            console.log(IsonEdit, "true")
        }
        // else{
        //     tableButton.textContent = ""
        // }

        // Creo tbody e tr solo se il prodotto non è in modifica
        if (IsonEdit !== prodotto.id) {

            let tbody = document.createElement('tbody')
            let trBody = document.createElement('tr')
            trBody.classList.add('rigaProdotto')

            tbody.addEventListener('click', () => {
                IsonEdit = prodotto.id
                prodottoSelezionato = prodotto
                renderProdotti(prodotto)
            })

            // let idProdotto = document.createElement('td')
            // idProdotto.textContent = prodotto.id

            let nomeProdotto = document.createElement('td')
            nomeProdotto.textContent = prodotto.nome

            let descrizione = document.createElement('td')
            descrizione.textContent = prodotto.descrizione

            let quantity = document.createElement('td')
            quantity.textContent = prodotto.quantity

            let categoria = document.createElement('td')
            categoria.textContent = prodotto.categoria

            console.log(prodotto.categoria, "categoria")

            let img = document.createElement('td')
            img.textContent = prodotto.img


            tbody.appendChild(trBody)

            // trBody.appendChild(idProdotto)
            trBody.appendChild(nomeProdotto)
            trBody.appendChild(descrizione)
            trBody.appendChild(img)
            trBody.appendChild(quantity)
            trBody.appendChild(categoria)

            tabella.appendChild(tbody)



        }
    })
}


function render() {
    renderProdotti(prodotti)
}

render()

// da fare
darkModeButton.addEventListener('click', () => {
    let moon = document.querySelector('#moon')
    let sun = document.querySelector('#sun')

    moon.classList.toggle('invisibile')
    sun.classList.toggle('invisibile')

    body.classList.toggle('darkmode')
    main.classList.toggle('mainDark')
})


// filtrare i prodotti per categoria


// rendering condizionale se la variabile filtro che sarà inizializzata a null  renderProdotti avrà il parametro prodotti per renderla modulare


// stampare le stats del e-commerce a schermo


// aggiungere un tasto elimina


// se avanza tempo mostrare a schermo il dettaglio del prodotto


// aggiungere filtro anche per nome con un input di tipo testo catturato che scatta all'evento 'input'


// rifinire la ui
