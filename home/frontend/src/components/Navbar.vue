<template>
    <header class="navbar">
        <RouterLink to="/" class="logo">
            <span class="dna-circle"></span>
            BookDNA
        </RouterLink>

        <nav>
            <RouterLink to="/#genres">Kategorien</RouterLink>

            <button
                class="nav-link"
                type="button"
                @click="showSearch = true"
            >
                Suche
            </button>

            <RouterLink to="/quiz">Quiz</RouterLink>

            <a href="#celebrity">Promi-Empfehlungen</a>
            <a href="#about">Über uns</a>
        </nav>

        <div class="nav-actions">
            <a href="#">Anmelden</a>

            <RouterLink to="/quiz" class="btn-small">
                Los gehts
            </RouterLink>
        </div>
    </header>

    <SearchPopup
        v-if="showSearch"
        @close="showSearch = false"
    />
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import SearchPopup from "./SearchPopup.vue";

const showSearch = ref(false);
</script>