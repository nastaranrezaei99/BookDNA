<template>
    <section id="genres" class="genres">
        <div class="section-header">
            <div>
                <h2>Nach Kategorie entdecken</h2>

                <p class="section-text">
                    Wähle eine Kategorie und entdecke Bücher aus
                    unserer Sammlung.
                </p>
            </div>
        </div>

        <p v-if="loading">
            Kategorien werden geladen...
        </p>

        <p v-else-if="error" class="error-message">
            {{ error }}
        </p>

        <p v-else-if="genres.length === 0">
            Keine Kategorien gefunden.
        </p>

        <div v-else class="genre-grid">
            <article
                v-for="genre in genres"
                :key="genre.name"
                class="genre-card"
                @click="openGenre(genre.name)"
            >
                <h3>{{ genre.name }}</h3>

                <p>
                    {{ getDescription(genre.name) }}
                </p>

                <span class="genre-book-count">
                    {{ genre.book_count }}
                    {{ genre.book_count === 1 ? "Buch" : "Bücher" }}
                </span>
            </article>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const genres = ref([]);
const loading = ref(false);
const error = ref("");

const genreDescriptions = {
    Classic:
        "Zeitlose Bücher und bedeutende Werke der Literatur.",

    History:
        "Bücher über historische Ereignisse, Personen und Kulturen.",

    Poetry:
        "Gedichte, Emotionen und künstlerische Sprache.",

    "Historical Fiction":
        "Fiktive Geschichten, die von realen historischen Epochen und Ereignissen inspiriert sind.",

    "Coming-of-Age":
        "Geschichten über das Erwachsenwerden, Identität und persönliche Entwicklung.",

    Nonfiction:
        "Bücher über Fakten, Forschung und reale Themen."
};

function getDescription(category) {
    return (
        genreDescriptions[category] ||
        "Entdecke Bücher aus dieser Kategorie."
    );
}

function openGenre(category) {
    router.push({
        name: "category",
        params: {
            category
        }
    });
}

async function loadGenres() {
    loading.value = true;
    error.value = "";

    try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
            throw new Error("Die Kategorien konnten nicht geladen werden.");
        }

        genres.value = await response.json();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

onMounted(loadGenres);
</script>