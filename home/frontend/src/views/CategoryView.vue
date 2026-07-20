<template>
    <Navbar />

    <main class="search-page">
        <h1>{{ category }} Books</h1>

        <p v-if="loading">
            Loading books...
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
                :key="book.id"
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

const category = computed(() => {
    return route.params.category;
});

async function loadBooks() {
    loading.value = true;
    error.value = "";

    try {
        const response = await fetch(
            `/api/books/${encodeURIComponent(category.value)}`
        );

        if (!response.ok) {
            throw new Error("Books could not be loaded.");
        }

        books.value = await response.json();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

watch(category, loadBooks, {
    immediate: true
});
</script>