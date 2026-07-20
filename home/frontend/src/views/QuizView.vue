<template>
    <Navbar />

    <main class="quiz-page">
        <section v-if="!finished" class="quiz-card">
            <p>
                Question {{ currentStep + 1 }}
                of {{ questions.length }}
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
                Please choose an answer.
            </p>

            <div class="quiz-actions">
                <button
                    v-if="currentStep > 0"
                    type="button"
                    @click="previousQuestion"
                >
                    Back
                </button>

                <button
                    type="button"
                    @click="nextQuestion"
                >
                    {{
                        currentStep === questions.length - 1
                            ? "Find my Book"
                            : "Next"
                    }}
                </button>
            </div>
        </section>

        <section v-else class="quiz-result">
            <h2>
                Your result is: {{ result }}
            </h2>

            <p v-if="loading">
                Loading recommendations...
            </p>

            <div v-else class="book-grid">
                <BookCard
                    v-for="book in books"
                    :key="book.id || book.name"
                    :book="book"
                />
            </div>

            <button type="button" @click="restartQuiz">
                Restart Quiz
            </button>
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
        text: "What kind of book are you looking for?",
        options: [
            {
                value: "history",
                label: "A story connected to the past or society"
            },
            {
                value: "poetry",
                label: "A text with deep feelings and atmosphere"
            },
            {
                value: "classic",
                label: "A well-known and timeless book"
            }
        ]
    },
    {
        text: "What interests you most while reading?",
        options: [
            {
                value: "classic",
                label: "Important ideas and human questions"
            },
            {
                value: "history",
                label: "Historical events and real contexts"
            },
            {
                value: "poetry",
                label: "Emotions, language and inner thoughts"
            }
        ]
    },
    {
        text: "Which reading experience do you prefer?",
        options: [
            {
                value: "classic",
                label: "Something thoughtful and meaningful"
            },
            {
                value: "history",
                label: "Something that shows another time or culture"
            },
            {
                value: "poetry",
                label: "Something emotional and personal"
            }
        ]
    },
    {
        text: "What should a good book give you?",
        options: [
            {
                value: "classic",
                label: "A new way to think about life"
            },
            {
                value: "history",
                label: "A better understanding of the past"
            },
            {
                value: "poetry",
                label: "A strong emotional impression"
            }
        ]
    },
    {
        text: "Which style do you like most?",
        options: [
            {
                value: "classic",
                label: "Deep and literary"
            },
            {
                value: "history",
                label: "Narrative and realistic"
            },
            {
                value: "poetry",
                label: "Expressive and poetic"
            }
        ]
    }
];

const currentQuestion = computed(() => {
    return questions[currentStep.value];
});

const result = computed(() => {
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
            `/api/books/${encodeURIComponent(result.value)}`
        );

        books.value = await response.json();
    } catch (error) {
        console.error("Recommendations could not be loaded:", error);
    } finally {
        loading.value = false;
    }
}

function restartQuiz() {
    currentStep.value = 0;
    answers.value = [];
    finished.value = false;
    books.value = [];
    validationError.value = false;
}
</script>