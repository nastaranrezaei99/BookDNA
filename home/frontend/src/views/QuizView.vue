<template>
    <Navbar />

    <main class="quiz-page">
        <section v-if="!finished" class="quiz-card">
            <p>
                Frage {{ currentStep + 1 }}
                von {{ questions.length }}
            </p>
            <progress
    class="quiz-progress"
    :value="currentStep + 1"
    :max="questions.length"
    aria-label="Position im Quiz"
></progress>

            <h2>
                {{ currentQuestion.text }}
            </h2>


            <div
                v-for="option in currentQuestion.options"
                :key="option.value"
                class="quiz-option"
            >
                <input
                    :id="`${currentStep}-${option.value}`"
                    v-model="answers[currentStep]"
                    type="radio"
                    :value="option.value"
                />

                <label
                    :for="`${currentStep}-${option.value}`"
                >
                    {{ option.label }}
                </label>
            </div>

            <div v-if="validationError" class="error-overlay">
    <div class="error-window">

        <img
            src="/images/error-animation.gif"
            alt="Fehler"
        >

        <p>Bitte wähle eine Antwort aus.</p>

        <button
            type="button"
            @click="validationError = false"
        >
            OK
        </button>

    
</div>
</div>

            <div class="quiz-actions">
                <button
                    v-if="currentStep > 0"
                    type="button"
                    @click="previousQuestion"
                >
                    Zurück
                </button>

                <button
                    type="button"
                    @click="nextQuestion"
                >
                    {{
                        currentStep === questions.length - 1
                            ? "Mein Buch finden"
                            : "Weiter"
                    }}
                </button>
            </div>
        </section>

        <section v-else class="quiz-result">
            <div class="result-header">
                    <p class="result-kicker">Dein Book-DNA-Ergebnis</p>

    
    
    </div>
    <div class="result-interests">
    <h3>Deine Interessen</h3>

    <div class="interest-item">
    <p>
        Klassiker
        <span>{{ result.classicPercent }}%</span>
    </p>

    <progress
        class="interest-progress"
        :value="result.classicPercent"
        max="100"
    ></progress>
</div>
    <div class="interest-item">
    <p>
        Lyrik
        <span>{{ result.poetryPercent }}%</span>
    </p>

    <progress
        class="interest-progress"
        :value="result.poetryPercent"
        max="100"
    ></progress>
</div>
<div class="interest-item">
    <p>
        Geschichte
        <span>{{ result.historyPercent }}%</span>
    </p>

    <progress
        class="interest-progress"
        :value="result.historyPercent"
        max="100"
    ></progress>
</div>

    <div class="interest-item">
    <p>
        Historische Romane:
        <span>{{ result.historicalFictionPercent }}%</span>
    </p>

    <progress
        class="interest-progress"
        :value="result.historicalFictionPercent"
        max="100"
    ></progress>
</div>
    <div class="interest-item">
    <p>
        Coming-of-Age: 
        <span>{{ result.comingOfAgePercent }}%</span>
    </p>

    <progress
        class="interest-progress"
        :value="result.comingOfAgePercent"
        max="100"
    ></progress>
</div>
<div class="interest-item">
    <p>
        Sachbücher:
        <span>{{ result.nonfictionPercent  }}%</span>
    </p>

    <progress
        class="interest-progress"
        :value="result.nonfictionPercent"
        max="100"
    ></progress>
</div>



</div>
</section>
<div v-if="showResultPopup" class="error-overlay">

    <div class="error-window">

        <img
            :src="resultAnimations[result.mainCategory]"
            alt="Ergebnis"
        >

        <p>Dein Hauptinteresse ist:</p>

        <h2>
            {{ getCategoryLabel(result.mainCategory) }}
        </h2>

        <button
            type="button"
            @click="showResultPopup = false"
        >
            Weitere Ergebnisse
        </button>

    </div>

</div>
<section v-if="finished" class="book-result">
<h3 class="recommendation-title">Deine nächsten Bücher</h3>

    <p v-if="loading">
        Empfehlungen werden geladen...
    </p>

    <div v-else class="book-grid">
        <BookCard
            v-for="book in books.slice(0, 3)"
            :key="book.id || book.name"
            :book="book"
        />
    </div>
    <div class="quiz-actions">
    <button
        type="button"
        @click="restartQuiz"
        :disabled="loading"
    >
        Neustart
    </button>
</div>
</section>

    </main>
</template>

<script setup>
import { computed, ref } from "vue";

import Navbar from "../components/Navbar.vue";
import BookCard from "../components/BookCard.vue";

const currentStep = ref(0);
const answers = ref([]);
const validationError = ref(false);
const finished = ref(false);
const showResultPopup = ref(false);
const books = ref([]);
const loading = ref(false);
const resultAnimations = {
    classic: "/images/classic.gif",
    poetry: "/images/poem.gif",
    history: "/images/history.gif",
    "historical fiction": "/images/historical-fiction.gif",
    "coming-of-age": "/images/coming-of-age.gif",
    nonfiction: "/images/nonfiction.gif"
};

const categories = [
    { key: "classic", label: "Klassiker" },
    { key: "poetry", label: "Lyrik" },
    { key: "history", label: "Geschichte" },
    { key: "historical fiction", label: "Historische Romane" },
    { key: "coming-of-age", label: "Coming-of-Age" },
    { key: "nonfiction", label: "Sachbücher" }
];
function getCategoryLabel(categoryKey) {
    const category = categories.find((category) => {
        return category.key === categoryKey;
    });

    if (category) {
        return category.label;
    }

    return categoryKey;
}


const questions = [
    {
        text: "Welche Art von Buch suchst du?",
        options: [
            {
                value: "history",
                label: "Ein Sachbuch über historische Ereignisse"
            },
            {
    value: "historical fiction",
    label: "Ein Roman, der in einer vergangenen Zeit spielt"
},
            {
                value: "poetry",
                label: "Ein Text mit tiefen Gefühlen und besonderer Atmosphäre"
            },
            {
                value: "classic",
                label: "Ein bekanntes und zeitloses Buch"
            }
        ]
    },
    {
        text: "Was interessiert dich beim Lesen am meisten?",
        options: [
            {
                value: "classic",
                label: "Wichtige Ideen und menschliche Fragen"
            },
            {
    value: "nonfiction",
    label: "Wissenschaft, Psychologie und neue Erkenntnisse"
},
            {
                value: "history",
                label: "Historische Ereignisse und reale Zusammenhänge"
            },
            {
                value: "poetry",
                label: "Emotionen, Sprache und innere Gedanken"
            }
        ]
    },
    {
        text: "Welche Art von Leseerlebnis bevorzugst du?",
        options: [
            {
                value: "classic",
                label: "Etwas Nachdenkliches und Bedeutungsvolles"
            },
            {
    value: "coming-of-age",
    label: "Eine Geschichte über das Erwachsenwerden und die Suche nach sich selbst"
},
            {
                value: "history",
                label: "Etwas über eine andere Zeit oder Kultur"
            },
            {
    value: "historical fiction",
    label: "Durch eine Romanfigur in eine vergangene Zeit eintauchen"
}
        ]
    },
    
        {
    text: "Was sollte dir ein gutes Buch geben?",
    options: [
        {
            value: "classic",
            label: "Zeitlose Gedanken über das Leben und die Gesellschaft"
        },
        {
            value: "historical fiction",
            label: "Das Gefühl, eine vergangene Zeit mitzuerleben"
        },
        {
            value: "coming-of-age",
            label: "Die Möglichkeit, mich in der Entwicklung einer Figur wiederzufinden"
        },
        {
            value: "nonfiction",
            label: "Neues Wissen und verständliche Erklärungen"
        }
    ]
},
    {
    text: "Welchen Stil magst du am liebsten?",
    options: [
        {
            value: "poetry",
            label: "Poetisch, mit Bildern und Gefühlen"
        },
        {
            value: "history",
            label: "Sachlich, mit historischen Fakten und Zusammenhängen"
        },
        {
            value: "coming-of-age",
            label: "Persönlich, aus der Sicht eines jungen Menschen"
        },
        {
            value: "nonfiction",
            label: "Verständlich, mit Erklärungen und Beispielen"
        }
    ]
},
{
    text: "Welche Buchbeschreibung macht dich neugierig?",
    options: [
        {
            value: "classic",
            label: "Ein bekannter Roman über Schuld und moralische Entscheidungen"
        },
        {
            value: "poetry",
            label: "Eine Sammlung von Gedichten über Liebe und Vergänglichkeit"
        },
        {
            value: "history",
            label: "Eine Untersuchung darüber, wie ein historisches Ereignis die Welt verändert hat"
        },
        {
            value: "historical fiction",
            label: "Die Geschichte einer erfundenen Familie während eines historischen Umbruchs"
        }
    ]
},
{
    text: "Wen möchtest du beim Lesen begleiten?",
    options: [
        {
            value: "poetry",
            label: "Eine poetische Stimme, die Gefühle in Worte fasst"
        },
        {
            value: "historical fiction",
            label: "Eine Romanfigur, die in einer vergangenen Epoche lebt"
        },
        {
            value: "coming-of-age",
            label: "Einen jungen Menschen, der seinen eigenen Weg findet"
        },
        {
            value: "nonfiction",
            label: "Eine Fachperson, die ihr Wissen verständlich vermittelt"
        }
    ]
}
];



const currentQuestion = computed(() => {
    return questions[currentStep.value];
});





/*const result = computed(() => {
    let classic = 0;
    let poetry = 0;
    let history = 0;

    for (const answer of answers.value) {

        if (answer === "classic") {
            classic = classic + 1;
            poetry = poetry + 0.3;
            history = history + 0.2;
        }

        if (answer === "poetry") {
            classic = classic + 0.4;
            poetry = poetry + 1;
            history = history + 0.1;
        }

        if (answer === "history") {
            classic = classic + 0.4;
            poetry = poetry + 0.1;
            history = history + 1;
        }
    }

    let mainCategory = "classic";

    if (poetry > classic && poetry > history) {
        mainCategory = "poetry";
    }

    if (history > classic && history > poetry) {
        mainCategory = "history";
    }

    const total = classic + poetry + history;

    return {
        mainCategory: mainCategory,

        classicPercent:
            Math.round((classic / total) * 100),

        poetryPercent:
            Math.round((poetry / total) * 100),

        historyPercent:
            Math.round((history / total) * 100)
    };
});


*/


const result = computed(() => {
    let classic = 0;
    let poetry = 0;
    let history = 0;
    let historicalFiction = 0;
    let comingOfAge = 0;
    let nonfiction = 0;

    for (const answer of answers.value) {
        if (answer === "classic") {
            classic += 1;
            poetry += 0.3;
            history += 0.2;
        }

        if (answer === "poetry") {
            classic += 0.4;
            poetry += 1;
            history += 0.1;
        }

        if (answer === "history") {
            classic += 0.4;
            poetry += 0.1;
            history += 1;
        }

        if (answer === "historical fiction") {
            historicalFiction += 1;
            history += 0.3;
            classic += 0.2;
        }

        if (answer === "coming-of-age") {
            comingOfAge += 1;
            classic += 0.3;
            poetry += 0.2;
        }

        if (answer === "nonfiction") {
            nonfiction += 1;
            history += 0.3;
            classic += 0.2;
        }
    }

    let mainCategory = "classic";
    let highestScore = classic;

    if (poetry > highestScore) {
        mainCategory = "poetry";
        highestScore = poetry;
    }

    if (history > highestScore) {
        mainCategory = "history";
        highestScore = history;
    }

    if (historicalFiction > highestScore) {
        mainCategory = "historical fiction";
        highestScore = historicalFiction;
    }

    if (comingOfAge > highestScore) {
        mainCategory = "coming-of-age";
        highestScore = comingOfAge;
    }

    if (nonfiction > highestScore) {
        mainCategory = "nonfiction";
        highestScore = nonfiction;
    }

    const total =
        classic + poetry + history +
        historicalFiction + comingOfAge + nonfiction;

    let classicPercent = 0;
    let poetryPercent = 0;
    let historyPercent = 0;
    let historicalFictionPercent = 0;
    let comingOfAgePercent = 0;
    let nonfictionPercent = 0;

    if (total > 0) {
        classicPercent = Math.round(classic / total * 100);
        poetryPercent = Math.round(poetry / total * 100);
        historyPercent = Math.round(history / total * 100);

        historicalFictionPercent =
            Math.round(historicalFiction / total * 100);

        comingOfAgePercent =
            Math.round(comingOfAge / total * 100);

        nonfictionPercent =
            Math.round(nonfiction / total * 100);
    }

    return {
        mainCategory: mainCategory,
        classicPercent: classicPercent,
        poetryPercent: poetryPercent,
        historyPercent: historyPercent,
        historicalFictionPercent: historicalFictionPercent,
        comingOfAgePercent: comingOfAgePercent,
        nonfictionPercent: nonfictionPercent
    };
});


function restartQuiz() {
    currentStep.value = 0;
    answers.value = [];
    finished.value = false;
    validationError.value = false;
    books.value = [];
}


async function nextQuestion() {
    if (!answers.value[currentStep.value]) {
        validationError.value = true;
        return;
    }

    validationError.value = false;

    if (currentStep.value < questions.length - 1) {
        currentStep.value++;
        return;
    }

    finished.value = true;
    showResultPopup.value = true;

    await loadRecommendations();
}

function previousQuestion() {
    validationError.value = false;

    if (currentStep.value > 0) {
        currentStep.value--;
    }
}

async function loadRecommendations() {
    loading.value = true;

    try {
        const response = await fetch(
            `/api/books/${encodeURIComponent(result.value.mainCategory)}`
        );

        books.value = await response.json();
    } catch (error) {
        console.error("Empfehlungen konnten nicht geladen werden:", error);
    } finally {
        loading.value = false;
    }
}


</script>