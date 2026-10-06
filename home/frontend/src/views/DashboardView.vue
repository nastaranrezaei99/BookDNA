<template>
    <Navbar />

    <main class="dashboard-page">

        <!-- Begrüßung -->
        <div class="dashboard-welcome">
            <p>MEIN BEREICH</p>
            <h1>Willkommen zurück!</h1>
            <h2>Bereit zum Weiterlesen?</h2>
        </div>

        <div class="book-selection">

        <div class="selection-field">
            <label>Buch auswählen</label>

            <select v-model="selectedBook">
                <option value="">Bitte auswählen</option>

                <option v-for="book in books" :key="book.id":value="book.id">
                    {{ book.name }} - {{ book.author }}
                </option>
            </select>
        </div>


        <div class="selection-field status-field">
            <label>Status</label>

            <select v-model="selectedStatus">
                <option value="reading">Aktuell gelesen</option>
                <option value="read">Gelesen</option>
            </select>
        </div>


        <button class="add-book-button">
            Hinzufügen
        </button>

    </div>

        

        <!-- LETZTES BUCH -->
        <section class="dashboard-card last-book-card">

            <div class="card-header">
                <h2>Letztes Buch</h2>
            </div>

            <div class="last-book-content">

                <img
                    src="/images/whiteNights.jpg"
                    alt="White Nights"
                    class="last-book-cover"
                />

                <div class="last-book-info">
                    <h3>White Nights</h3>
                    <p class="book-writer">Fyodor Dostoevsky</p>

                    <div class="reading-progress">

                        <div class="progress-circle">
                            <span>55%</span>
                        </div>

                        <div class="progress-description">
                            <strong>Du hast noch 250 Seiten.</strong>

                            <p>
                                Lies heute weiter und speichere
                                dein Lieblingszitat.
                            </p>

                            <button class="dashboard-button">
                                Weiterlesen
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </section>


        <!-- MITTLERER BEREICH -->
        <div class="dashboard-middle">

            <!-- ZITATE -->
            <section class="dashboard-card">

                <div class="card-header">
                    <h2>Gespeicherte Zitate</h2>

                    <button class="small-button"@click="showQuote = true">
                        
                        + Zitat
                    </button>
                </div>

                <div class="saved-quote">
                    <p>
                        „Du bist nicht allein.“
                    </p>

                    <span>— Albert Camus</span>
                </div>

                <div class="saved-quote">
                    <p>
                        „Ein Buch muss die Axt sein für das
                        gefrorene Meer in uns.“
                    </p>

                    <span>— Franz Kafka</span>
                </div>

            </section>


            <!-- LESEGESCHMACK -->
            <section class="dashboard-card">

                <h2>Dein Lesegeschmack</h2>

                <p class="taste-description">
                    Basierend auf deinen Lieblingsbüchern
                </p>


                <div class="taste-item">
                    <div class="taste-title">
                        <span>Klassiker</span>
                        <span>40%</span>
                    </div>

                    <div class="taste-bar">
                        <div
                            class="taste-value"
                            style="width: 40%"
                        ></div>
                    </div>
                </div>


                <div class="taste-item">
                    <div class="taste-title">
                        <span>Philosophie</span>
                        <span>30%</span>
                    </div>

                    <div class="taste-bar">
                        <div
                            class="taste-value"
                            style="width: 30%"
                        ></div>
                    </div>
                </div>


                <div class="taste-item">
                    <div class="taste-title">
                        <span>Geschichte</span>
                        <span>20%</span>
                    </div>

                    <div class="taste-bar">
                        <div
                            class="taste-value"
                            style="width: 20%"
                        ></div>
                    </div>
                </div>

            </section>

        </div>


        <!-- STATISTIK UNTEN -->
        <div class="dashboard-statistics">

            <div class="stat-card">
                <strong>6</strong>
                <span>Bücher gelesen</span>
            </div>

            <div class="stat-card">
                <strong>1</strong>
                <span>Aktuell gelesen</span>
            </div>

            <div class="stat-card">
                <strong>8</strong>
                <span>Gespeicherte Zitate</span>
            </div>

        </div>

    </main>

    <div v-if="showQuote" class="quote-popup">

        <div class="quote-popup-box">

            <h2>Zitat hinzufügen</h2>

            <textarea v-model="newQuote" placeholder="Schreibe hier dein Lieblingszitat..."></textarea>

            <div class="quote-popup-buttons">

                <button class="small-button" @click="showQuote = false">
                    Abbrechen
                </button>

                <button class="dashboard-button" @click="showQuote = false">
                    Hinzufügen
                </button>

            </div>

        </div>

    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
const selectedStatus = ref("reading");
const showQuote = ref(false);
const newQuote = ref("");

const books = ref([]);
const selectedBook = ref("");

async function loadBooks() {
    const response = await fetch("/api/books");
    books.value = await response.json();
}

onMounted(loadBooks);


</script>
<style scoped>

/* DASHBOARD */

.dashboard-page {
    max-width: 1250px;
    margin: 0 auto;
    padding: 55px 70px 100px;
}


/* WELCOME */

.dashboard-welcome {
    text-align: center;
    margin-bottom: 40px;
}

.dashboard-welcome > p {
    margin: 0 0 10px;

    color: #c07854;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 2px;
}

.dashboard-welcome h1 {
    margin: 0;

    color: #88571a;
    font-size: 42px;
}

.dashboard-welcome h2 {
    margin: 8px 0 0;

    color: #694f44;
    font-size: 20px;
    font-weight: normal;
}


/* ALLGEMEINE CARDS */

.dashboard-card {
    padding: 28px;

    background-color: rgba(255, 250, 244, 0.94);

    border: 1px solid #d8c6b8;
    border-radius: 20px;

    box-shadow: 0 6px 18px rgba(51, 37, 31, 0.08);
}

.dashboard-card h2 {
    margin: 0;

    color: #694f44;
    font-size: 22px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 25px;
}

/* BUCHAUSWAHL */

.book-selection {
    display: flex;
    align-items: flex-end;
    gap: 15px;

    margin-bottom: 25px;
    padding: 20px 25px;

    background-color: rgba(255, 250, 244, 0.94);

    border: 1px solid #d8c6b8;
    border-radius: 18px;

    box-shadow: 0 6px 18px rgba(51, 37, 31, 0.08);
}


.selection-field {
    display: flex;
    flex-direction: column;
    gap: 7px;

    flex: 1;
}


.status-field {
    flex: 0 0 200px;
}


.selection-field label {
    color: #694f44;
    font-size: 14px;
    font-weight: bold;
}


.selection-field select {
    height: 44px;
    padding: 0 14px;

    background-color: #fffaf4;

    border: 1px solid #d8c6b8;
    border-radius: 10px;

    color: #5c4b42;
    font-size: 14px;

    cursor: pointer;
}


.selection-field select:focus {
    outline: 2px solid #c07854;
}


.add-book-button {
    height: 44px;
    padding: 0 20px;

    border: none;
    border-radius: 10px;

    background-color: #694f44;
    color: white;

    cursor: pointer;
}


.add-book-button:hover {
    background-color: #5d4037;
}

/* LETZTES BUCH */

.last-book-card {
    margin-bottom: 25px;
}

.last-book-content {
    display: flex;
    gap: 35px;
    align-items: center;
}

.last-book-cover {
    width: 150px;
    height: 220px;

    object-fit: cover;
    border-radius: 12px;
}

.last-book-info {
    flex: 1;
}

.last-book-info h3 {
    margin: 0 0 7px;

    color: #88571a;
    font-size: 28px;
}

.book-writer {
    margin: 0 0 30px;

    color: #5c4b42;
}


/* READING PROGRESS */

.reading-progress {
    display: flex;
    align-items: center;
    gap: 35px;
}

.progress-circle {
    width: 110px;
    height: 110px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;

    border: 12px solid #ead7cb;
    border-top-color: #c07854;
    border-right-color: #c07854;

    border-radius: 50%;
}

.progress-circle span {
    color: #88571a;
    font-size: 22px;
    font-weight: bold;
}

.progress-description strong {
    color: #694f44;
    font-size: 18px;
}

.progress-description p {
    margin: 8px 0 18px;

    color: #5c4b42;
}


/* MITTLERER BEREICH */

.dashboard-middle {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 25px;

    margin-bottom: 25px;
}


/* ZITATE */

.saved-quote {
    margin-bottom: 15px;
    padding: 18px;

    background-color: #f3e9df;
    border-radius: 14px;
}

.saved-quote:last-child {
    margin-bottom: 0;
}

.saved-quote p {
    margin: 0 0 8px;

    color: #5c4b42;

    font-size: 16px;
    font-style: italic;
    line-height: 1.5;
}

.saved-quote span {
    color: #88571a;

    font-size: 14px;
    font-weight: bold;
}


/* LESEGESCHMACK */

.taste-description {
    margin: 8px 0 25px;

    color: #5c4b42;
    font-size: 14px;
}

.taste-item {
    margin-bottom: 20px;
}

.taste-title {
    display: flex;
    justify-content: space-between;

    margin-bottom: 7px;

    color: #694f44;
    font-size: 14px;
}

.taste-bar {
    height: 9px;

    overflow: hidden;

    background-color: #eadfd5;
    border-radius: 20px;
}

.taste-value {
    height: 100%;

    background-color: #c07854;
    border-radius: 20px;
}


/* STATISTIK */

.dashboard-statistics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.stat-card {
    padding: 22px;

    text-align: center;

    background-color: rgba(255, 250, 244, 0.94);

    border: 1px solid #d8c6b8;
    border-radius: 18px;

    box-shadow: 0 6px 18px rgba(51, 37, 31, 0.08);
}

.stat-card strong {
    display: block;

    margin-bottom: 5px;

    color: #88571a;
    font-size: 34px;
}

.stat-card span {
    color: #5c4b42;
    font-size: 14px;
}


/* BUTTONS */

.small-button {
    padding: 8px 13px;

    border: none;
    border-radius: 8px;

    background-color: #ead7cb;
    color: #694f44;

    cursor: pointer;
}

.small-button:hover {
    background-color: #dfc5b6;
}

.dashboard-button {
    padding: 10px 18px;

    border: none;
    border-radius: 8px;

    background-color: #694f44;
    color: white;

    cursor: pointer;
}

.dashboard-button:hover {
    background-color: #5d4037;
}


/* RESPONSIVE */

@media (max-width: 900px) {

    .dashboard-page {
        padding: 40px 20px;
    }

    .dashboard-middle,
    .dashboard-statistics {
        grid-template-columns: 1fr;
    }

    .last-book-content {
        align-items: flex-start;
    }

    .reading-progress {
        align-items: flex-start;
    }
}


.quote-popup {
    position: fixed;
    inset: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.45);

    z-index: 1000;
}

.quote-popup-box {
    width: 450px;
    max-width: 90%;

    padding: 30px;

    background-color: #fffaf4;

    border-radius: 20px;

    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.quote-popup-box h2 {
    margin-top: 0;

    color: #694f44;
}

.quote-popup-box textarea {
    width: 100%;
    height: 130px;

    padding: 15px;

    border: 1px solid #d8c6b8;
    border-radius: 10px;

    resize: vertical;

    font-family: inherit;
    font-size: 15px;
}

.quote-popup-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    margin-top: 20px;
}
</style>