<template>
    <Navbar />

    <main class="search-page">
        <h1>
            Search results for “{{ query }}”
        </h1>

        <p v-if="loading">
            Searching...
        </p>

        <p v-else-if="error">
            {{ error }}
        </p>

        <p v-else-if="books.length === 0">
            No books found.
        </p>

        <div v-else class="book-grid">
            <BookCard
                v-for="book in books"
                :key="book.id || book.name"
                :book="book"
            />
        </div>
    </main>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";
import BookCard from "../components/BookCard.vue";

const route = useRoute();

const books = ref([]);
const loading = ref(false);
const error = ref("");

const query = computed(() => {
    return route.query.q || "";
});

async function searchBooks() {
    if (!query.value.trim()) {
        books.value = [];
        return;
    }

    loading.value = true;
    error.value = "";

    try {
        const response = await fetch(
            `/api/search?q=${encodeURIComponent(query.value)}`
        );

        if (!response.ok) {
            throw new Error("Search failed.");
        }

        books.value = await response.json();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

watch(query, searchBooks, {
    immediate: true
});
</script>