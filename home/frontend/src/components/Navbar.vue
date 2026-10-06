<template>
    <header class="navbar">
        <RouterLink to="/" class="logo">
            <span class="dna-circle"></span>
            BookDNA
        </RouterLink>

        <nav>
            <a href="/#genres">Kategorien</a>
            
            <button
                class="nav-link"
                type="button"
                @click="showSearch = true"
            >
                Suche
            </button>

            <RouterLink to="/quiz">Quiz</RouterLink>

            <a href="/#celebrity">Promi-Empfehlungen</a>
            <a href="/#about">Über uns</a>
        </nav>

        <div class="nav-actions">
            <a href="#">Anmelden</a>

            <RouterLink to="/dashboard" class="btn-small">
                Mein Bereich
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