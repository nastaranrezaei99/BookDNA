<template>
    <Navbar />

    <main class="quiz-page">
        <section v-if="!finished" class="quiz-card">
            <p>
                Frage {{ currentStep + 1 }}
                von {{ questions.length }}
            </p>

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

            <p v-if="validationError" class="error-message">
                Bitte wähle eine Antwort aus.
            </p>

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
    <h2>
        Dein Hauptinteresse ist:
        {{ result.mainCategory }}
    </h2>

    <p>Klassiker: {{ result.classicPercent }}%</p>
    <p>Lyrik: {{ result.poetryPercent }}%</p>
    <p>Geschichte: {{ result.historyPercent }}%</p>

    <p v-if="loading">
        Empfehlungen werden geladen...
    </p>

    <div v-else class="book-grid">
        <BookCard
            v-for="book in books"
            :key="book.id || book.name"
            :book="book"
        />
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
const books = ref([]);
const loading = ref(false);

const questions = [
    {
        text: "Welche Art von Buch suchst du?",
        options: [
            {
                value: "history",
                label: "Eine Geschichte über die Vergangenheit oder Gesellschaft"
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
                value: "history",
                label: "Etwas über eine andere Zeit oder Kultur"
            },
            {
                value: "poetry",
                label: "Etwas Emotionales und Persönliches"
            }
        ]
    },
    {
        text: "Was sollte dir ein gutes Buch geben?",
        options: [
            {
                value: "classic",
                label: "Eine neue Sichtweise auf das Leben"
            },
            {
                value: "history",
                label: "Ein besseres Verständnis der Vergangenheit"
            },
            {
                value: "poetry",
                label: "Einen starken emotionalen Eindruck"
            }
        ]
    },
    {
        text: "Welchen Stil magst du am liebsten?",
        options: [
            {
                value: "classic",
                label: "Tiefgründig und literarisch"
            },
            {
                value: "history",
                label: "Erzählerisch und realistisch"
            },
            {
                value: "poetry",
                label: "Ausdrucksstark und poetisch"
            }
        ]
    }
];



const currentQuestion = computed(() => {
    return questions[currentStep.value];
});

/*const result = computed(() => {
    const scores = {
        classic: 0,
        poetry: 0,
        history: 0
    };

    for (const answer of answers.value) {
        if (answer) {
            scores[answer]++;
        }
    }

    return Object.keys(scores).reduce((best, category) => {
        return scores[category] > scores[best]
            ? category
            : best;
    }, "classic");
});*/




const result = computed(() => {
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