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
                    <RouterLink
                        to="/quiz"
                        class="btn-primary"
                    >
                        Start Quiz →
                    </RouterLink>

                    <a
                        href="#genres"
                        class="btn-secondary"
                    >
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

        <GenreList />

        <CelebrityPicks />
    </main>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import GenreList from "../components/GenreList.vue";
import CelebrityPicks from "../components/CelebrityPicks.vue";
</script>