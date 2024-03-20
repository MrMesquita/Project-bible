import '../css/style.css'

interface Verse {
    verse: number;
    text: string;
}

const manyChaptersBookHas: Record<string, number> = {
    "Gênesis": 50, "Êxodo": 40, "Levítico": 27, "Números": 36, "Deuteronômio": 34,
    "Josué": 24, "Juízes": 21, "Rute": 4, "1 Samuel": 31, "2 Samuel": 24, "1 Reis": 22,
    "2 Reis": 25, "1 Crônicas": 29, "2 Crônicas": 36, "Esdras": 10, "Neemias": 13,
    "Ester": 10, "Jó": 42, "Salmos": 150, "Provérbios": 31, "Eclesiastes": 12, "Cânticos": 8,
    "Isaías": 66, "Jeremias": 52, "Lamentações": 5, "Ezequiel": 48, "Daniel": 12, "Oséias": 14,
    "Joel": 3, "Amós": 9, "Obadias": 1, "Jonas": 4, "Miquéias": 7, "Naum": 3, "Habacuque": 3,
    "Sofonias": 3, "Ageu": 2, "Zacarias": 14, "Malaquias": 4, "Mateus": 28, "Marcos": 16,
    "Lucas": 24, "João": 21, "Atos": 28, "Romanos": 16, "1 Coríntios": 16, "2 Coríntios": 13,
    "Gálatas": 6, "Efésios": 6, "Filipenses": 4, "Colossenses": 4, "1 Tessalonicenses": 5,
    "2 Tessalonicenses": 3, "1 Timóteo": 6, "2 Timóteo": 4, "Tito": 3, "Filemom": 1, "Hebreus": 13,
    "Tiago": 5, "1 Pedro": 5, "2 Pedro": 3, "1 João": 5, "2 João": 1, "3 João": 1, "Judas": 1,
    "Apocalipse": 22
};

const TittleBookName: HTMLElement | null = document.querySelector('.book-name');
const verseContainer: HTMLElement | null = document.querySelector('.verse-container');
const chaptersContainer: HTMLElement | null = document.querySelector('.chapters-numbers-container');
let translation: string = 'almeida';
let bookName: string = 'Gênesis';
let bookChapter: string = '1';

async function fetchBible(): Promise<void> {
    const response: Response = await fetch(`https://bible-api.com/${bookName}${bookChapter}?translation=${translation}`);
    const data: { verses: Verse[] } = await response.json();

    // Remove espaços em branco no fim dos versículos
    data.verses.forEach(verse => {
        verse.text = verse.text.trim();
    });

    if (TittleBookName) TittleBookName.textContent = `${bookName} ${bookChapter}`;

    if (verseContainer) {
        for (let i = 0; i < data.verses.length; i++) {
            const numberVerse: number = data.verses[i].verse;
            const textVerse: string = data.verses[i].text;
            createVerseSingle(numberVerse, textVerse);
        }
    }

    if (chaptersContainer) {
        for (let i = 1; i <= manyChaptersBookHas[bookName]; i++) {
            createChapterNumber(i);
        }
    }
}

function createVerseSingle(numberVerse: number, textVerse: string): void {
    if (verseContainer) {
        // Criação da div verse-single
        const verseSingle: HTMLDivElement = document.createElement('div');
        verseSingle.className = 'verse-single';

        // Criação do parágrafo verse-content
        const verseContent: HTMLParagraphElement = document.createElement('p');
        verseContent.className = 'verse-content';

        // Criação do span verse-number
        const verseNumber: HTMLSpanElement = document.createElement('span');
        verseNumber.className = 'verse-number';
        verseNumber.textContent = `${numberVerse} `;

        // Criação do span verse-text
        const verseText: HTMLSpanElement = document.createElement('span');
        verseText.className = 'verse-text';
        verseText.textContent = textVerse;

        verseContent.append(verseNumber, verseText);
        verseSingle.append(verseContent);

        verseContainer.appendChild(verseSingle);
    }
}

function createChapterNumber(chapterNumber: number): void {
    if (chaptersContainer) {
        const li: HTMLLIElement = document.createElement('li');
        li.className = 'chapter-number';
        li.textContent = chapterNumber.toString();

        li.addEventListener('click', () => {
            bookChapter = chapterNumber.toString();
            if (verseContainer) verseContainer.textContent = '';
            if (chaptersContainer) chaptersContainer.textContent = '';
            fetchBible();
        });

        chaptersContainer.append(li);
    }
}

function toggleBooksContainer(): void {
    const booksContainer: HTMLElement | null = document.querySelector('.books-content');
    const btnBooks: HTMLElement | null = document.querySelector('.btn-books');

    if (booksContainer && btnBooks) {
        if (booksContainer.classList.contains('dflex')) {
            booksContainer.classList.remove('dflex');
            booksContainer.classList.add('dnone');
            btnBooks.classList.add('focusBtn');
        } else {
            booksContainer.classList.remove('dnone');
            booksContainer.classList.add('dflex');
            btnBooks.classList.remove('focusBtn');
        }
    }
}

document.querySelectorAll('.book-single').forEach((book) => {
    book.addEventListener('click', (ev) => {
        if (verseContainer) verseContainer.textContent = '';
        if (chaptersContainer) chaptersContainer.textContent = '';

        const target = ev.currentTarget;
        if (target instanceof HTMLElement) {
            bookName = target.textContent || '';
            fetchBible();
            toggleBooksContainer();
        }
    });
});

const btnBooks: HTMLElement | null = document.querySelector('.btn-books');
if (btnBooks) btnBooks.addEventListener('click', toggleBooksContainer);

document.addEventListener('DOMContentLoaded', fetchBible);
