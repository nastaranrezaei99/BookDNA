<template>
    <section id="genres" class="genres">
        <div class="section-header">
            <div>
                <h2>Explore by Genre</h2>

                <p class="section-text">
                    Choose a genre and discover books from
                    our collection.
                </p>
            </div>
        </div>

        <p v-if="loading">
            Loading genres...
        </p>

        <p v-else-if="error" class="error-message">
            {{ error }}
        </p>

        <p v-else-if="genres.length === 0">
            No genres found.
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
                    {{ genre.book_count === 1 ? "book" : "books" }}
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
        "Timeless books and important literary works.",

    History:
        "Books about historical events, people and cultures.",

    Poetry:
        "Poems, emotions and artistic language.",

    "Historical Fiction":
        "Fictional stories inspired by real historical periods and events.",

    "Coming-of-Age":
        "Stories about growing up, identity and personal development.",

    Nonfiction:
        "Books based on facts, research and real-world subjects."
};

function getDescription(category) {
    return (
        genreDescriptions[category] ||
        "Discover books from this category."
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
            throw new Error("Genres could not be loaded.");
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