<script setup>
import Navbar from "../components/Navbar.vue";
import GenreList from "../components/GenreList.vue";
import CelebrityPicks from "../components/CelebrityPicks.vue";
</script>
<template>
    <Navbar />

    <main>
        <section class="hero">
            <div class="hero-text">
                <p class="label">
                    PERSONALISIERTE BUCHEMPFEHLUNGEN
                </p>

                <h1>
                    Finde Bücher,<br />
                    die zu <span>dir</span> passen
                </h1>

                <p class="description">
                    Entdecke Literatur, die zu deiner Persönlichkeit,
                    Stimmung und deinen Interessen passt.
                </p>

                <div class="hero-buttons">
                    <RouterLink
                        to="/quiz"
                        class="btn-primary"
                    >
                        Quiz starten →
                    </RouterLink>

                    <a
                        href="#genres"
                        class="btn-secondary"
                    >
                        Kategorien entdecken
                    </a>
                </div>
            </div>

            <div class="quote-card">
                <p class="quote">
                    “Ein Buch muss die Axt sein für das gefrorene Meer
                    in uns.”
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