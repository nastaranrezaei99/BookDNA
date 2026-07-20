<template>
    <header class="navbar">
        <RouterLink to="/" class="logo">
            <span class="dna-circle"></span>
            BookDNA
        </RouterLink>

        <nav>
            <RouterLink to="/#genres">Genres</RouterLink>

            <button
                class="nav-link"
                type="button"
                @click="showSearch = true"
            >
                Search
            </button>

            <RouterLink to="/quiz">Quiz</RouterLink>

            <a href="#celebrity">Celebrity Picks</a>
            <a href="#about">About</a>
        </nav>

        <div class="nav-actions">
            <a href="#">Sign In</a>

            <RouterLink to="/quiz" class="btn-small">
                Get Started
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