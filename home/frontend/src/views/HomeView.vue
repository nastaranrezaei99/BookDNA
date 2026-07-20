<template>
    <Navbar />

    <main>
        <section class="hero">
            <div class="hero-text">
                <p class="label">
                    PERSONALIZED BOOK DISCOVERY
                </p>

                <h1>
                    Find Books,<br />
                    that fit <span>you</span>
                </h1>

                <p class="description">
                    Discover literature that matches your personality,
                    mood and interests.
                </p>

                <div class="hero-buttons">
                    <RouterLink to="/quiz" class="btn-primary">
                        Start Quiz →
                    </RouterLink>

                    <a href="#genres" class="btn-secondary">
                        Discover Genres
                    </a>
                </div>
            </div>

            <div class="quote-card">
                <p class="quote">
                    “A book must be the axe for the frozen sea
                    within us.”
                </p>

                <p class="author">
                    FRANZ KAFKA
                </p>
            </div>
        </section>

        <section id="genres" class="genres">
            <div class="section-header">
                <div>
                    <h2>Explore by Genre</h2>

                    <p class="section-text">
                        Choose a genre and discover books from
                        our collection
                    </p>
                </div>
            </div>

            <div class="genre-grid">
                <article
                    v-for="genre in genres"
                    :key="genre.name"
                    class="genre-card"
                    @click="openGenre(genre.name)"
                >
                    <h3>{{ genre.name }}</h3>
                    <p>{{ genre.description }}</p>
                </article>
            </div>
        </section>
    </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";

const router = useRouter();

const genres = [
    {
        name: "Classic",
        description:
            "Timeless books and important literary works."
    },
    {
        name: "History",
        description:
            "Books about historical events, people and cultures."
    },
    {
        name: "Poetry",
        description:
            "Poems, emotions and artistic language."
    }
];

function openGenre(category) {
    router.push({
        name: "category",
        params: {
            category
        }
    });
}
</script>