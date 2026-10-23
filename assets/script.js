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
let filtraPer = document.querySelector('#formCategoria')
let selectedProduct = document.querySelector('#prodottoSelezionato')
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
let categoriaSelezionata;

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
    filtraPer.addEventListener('change', () => {
        const prodottoFiltrato = prodotti.filter((p => p.categoria == c
        ))
        renderProdotti(prodottoFiltrato)
    })

})

let id = 4

let filtro = null;

cercaNome.addEventListener('input', (e) => {
    filtro = cercaNome.value
    console.log(filtro)
    let prodottoFiltrato = prodotti.filter(p => {
        return p.nome.toLowerCase().includes(filtro)
    })
    renderProdotti(prodottoFiltrato)
})




function AggiungiProdotti() {
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
    let messaggio = document.createElement('span')
    messaggio.textContent = textMsg
    toastMessage.appendChild(messaggio)
    messaggio.classList.remove('invisibile')
    messaggio.classList.add('toast')
    setTimeout(() => {
        messaggio.remove()
        messaggio.classList.remove('toast')
        messaggio.classList.add('invisibile')

    }, 3000)
}
let IsonEdit = null;

let prodottoSelezionato = null;
let isdettaglio = null


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
    tdItdQuantityInput.value = prodotto.quantity
    let tdcategory = document.createElement('td')
    let tdItdcategoryInput = document.createElement('select')
    categorie.forEach(c => {
        let option = document.createElement('option')
        option.value = c
        option.textContent = c
        tdItdcategoryInput.appendChild(option)
    })
    let apriDettaglio = document.createElement('button')
    apriDettaglio.textContent = "apri dettaglio"
    apriDettaglio.addEventListener('click', () => {
        isdettaglio = true
        renderProdotti(prodotto)
    })

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
        console.log('cliccato', IsonEdit)
        IsonEdit = null
        console.log(IsonEdit, "dopo")
        prodottoSelezionato = null
        renderProdotti(prodotti)
    })
    bottoneInvia.textContent = 'Salva modifiche'
    bottoneInvia.addEventListener('click', () => {
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
        e.stopPropagation()
        eliminaProdotto(prodotto)
    })
    bottoneElimina.textContent = 'Elimina !IRREVERSIBILE!'
    tabella.appendChild(bottoneInvia)
    tabella.appendChild(bottoneAnnulaModifiche)
    tabella.appendChild(bottoneElimina)
    tabella.appendChild(apriDettaglio)
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
    selectedProduct.innerHTML = `
        <h3>${prodottoSelezionato.nome}</h3>
        <p>${prodottoSelezionato.descrizione}</p>
        <p>Quantità: ${prodottoSelezionato.quantity}</p>
        <p>Categoria: ${prodottoSelezionato.categoria}</p>
    `
}

function renderProdotti(listaProdotti = prodotti) {
    //    toast("prova")
    if (!Array.isArray(listaProdotti)) {
        listaProdotti = [listaProdotti]
    }

    if (prodottoSelezionato && isdettaglio == true) {
        dettaglioProdotto(prodottoSelezionato)
    }


    tabella.textContent = ''
    prodottiTotali.textContent = listaProdotti.length
    categorieTotali.textContent = categorie.length
    let disponibili = prodotti.filter(p => {
        return p.quantity > 0

    })
    prodottiDisponibili.textContent = disponibili.length

    if (listaProdotti <= 0) {
        const avvisoTable = document.querySelector('#avviso')
        avvisoTable.textContent = 'non ci sono prodotti'
    }

    if (listaProdotti.length <= 0) {
        toast("non ci sono prodotti")
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
    listaProdotti.forEach(prodotto => {

        // Controllo se il prodotto è in modifica
        if (IsonEdit === prodotto.id) {
            onClickCella(prodotto)
            console.log(IsonEdit, "true")
        }

        // Creo tbody e tr solo se il prodotto non è in modifica
        if (IsonEdit !== prodotto.id) {

            let tbody = document.createElement('tbody')
            let trBody = document.createElement('tr')

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