const manyChaptersBookHas = {"Gênesis":50, "Êxodo":40, "Levítico":27, "Números":36, "Deuteronômio":34, "Josué":24, "Juízes":21, "Rute":4, "1 Samuel":31, "2 Samuel":24, "1 Reis":22, "2 Reis":25, "1 Crônicas":29, "2 Crônicas":36, "Esdras":10, "Neemias":13, "Ester":10, "Jó":42, "Salmos":150, "Provérbios":31, "Eclesiastes":12, "Cânticos":8, "Isaías":66, "Jeremias":52, "Lamentações":5, "Ezequiel":48, "Daniel":12, "Oséias":14, "Joel":3, "Amós":9, "Obadias":1, "Jonas":4, "Miquéias":7, "Naum":3, "Habacuque":3, "Sofonias":3, "Ageu":2, "Zacarias":14, "Malaquias":4, "Mateus":28, "Marcos":16, "Lucas":24, "João":21, "Atos":28, "Romanos":16, "1 Coríntios":16, "2 Coríntios":13, "Gálatas":6, "Efésios":6, "Filipenses":4, "Colossenses":4, "1 Tessalonicenses":5, "2 Tessalonicenses":3, "1 Timóteo":6, "2 Timóteo":4, "Tito":3, "Filemom":1, "Hebreus":13, "Tiago":5, "1 Pedro":5, "2 Pedro":3, "1 João":5, "2 João":1, "3 João":1, "Judas":1, "Apocalipse":22}
const TittleBookName = document.querySelector('.book-name')
const verseContainer = document.querySelector('.verse-container')
const chaptersContainer = document.querySelector('.chapters-numbers-container')
let translation = 'almeida'
let bookName = 'Gênesis'
let bookChapter = '1'

async function fetchBible(){
    const response = await fetch(`https://bible-api.com/${bookName}${bookChapter}?translation=${translation}`)
    const data = await response.json()

    //remove espaços em branco no fim dos versiculos
    data.verses.forEach(verse => {
        verse.text = verse.text.trim();
    })

    TittleBookName.textContent = `${bookName} ${bookChapter}`
    
    for(let i = 0; i < data.verses.length; i++){
        const numberVerse = data.verses[i].verse
        const textVerse = data.verses[i].text
        createVerseSingle(numberVerse, textVerse)
    }

    for(let i = 1; i <= manyChaptersBookHas[bookName]; i++){
        createChapterNumber(i)
    }
}

function createVerseSingle(numberVerse, textVerse){
    // criação da div verse-single
    const verseSingle = document.createElement('div')
    verseSingle.className = 'verse-single'
    // criação do parágrafo verse-content
    const verseContent = document.createElement('p')
    verseContent.className = 'verse-content'
    // criação do span verse-number
    const verseNumber = document.createElement('span')
    verseNumber.className = 'verse-number'
    verseNumber.textContent = `${numberVerse} `
    // criação do span verse-text
    const verseText = document.createElement('span')
    verseText.className = 'verse-text'
    verseText.textContent = textVerse

    verseContent.append(verseNumber, verseText)
    verseSingle.append(verseContent)
    
    verseContainer.appendChild(verseSingle)
}

function createChapterNumber(chapterNumber){
    const li = document.createElement('li')
    li.className = 'chapter-number'
    li.textContent = chapterNumber

    li.addEventListener('click', () => {
        bookChapter = chapterNumber
        verseContainer.textContent = ''
        chaptersContainer.textContent = ''
        fetchBible()
    })
    chaptersContainer.append(li)
}

function toggleBooksContainer(){
    const booksContainer = document.querySelector('.books-content')
    const btnBooks = document.querySelector('.btn-books')
    if(booksContainer.classList.contains('dflex')){
        booksContainer.classList.remove('dflex')
        booksContainer.classList.add('dnone')
        
        btnBooks.classList.add('focusBtn')
    }else{
        booksContainer.classList.remove('dnone')
        booksContainer.classList.add('dflex')
        
        btnBooks.classList.remove('focusBtn')
    }
}

document.querySelectorAll('.book-single').forEach((book)=>{
    book.addEventListener('click', (ev) => {
        bookName = ev.currentTarget.textContent
        verseContainer.textContent = ''
        chaptersContainer.textContent = ''
        fetchBible()
        toggleBooksContainer()
    })
})

document.querySelector('.btn-books').addEventListener('click', toggleBooksContainer)
document.addEventListener('DOMContentLoaded', fetchBible)
