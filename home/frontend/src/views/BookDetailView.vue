<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";

const route = useRoute();

const book = ref(null);
const loading = ref(false);
const error = ref("");

async function loadBook() {
    loading.value = true;
    error.value = "";

    try {
        const response = await fetch(
            `/api/books/id/${encodeURIComponent(route.params.id)}`
        );

        if (!response.ok) {
            throw new Error("Das Buch konnte nicht geladen werden");
        }

        book.value = await response.json();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

watch(
    () => route.params.id,
    loadBook,
    {
        immediate: true
    }
);
</script>
<template>
    <Navbar />

    <main class="book-detail-page">
        <p v-if="loading">
            Buch wird geladen...
        </p>

        <p v-else-if="error" class="error-message">
            {{ error }}
        </p>

        <section v-else-if="book" class="book-detail">
            <div class="book-detail-image">
                <img
                    :src="`/images/${book.img}`"
                    :alt="book.name"
                />
            </div>

            <div class="book-detail-info">
                <span class="book-category">
                    {{ book.kategorie }}
                </span>

                <h1>{{ book.name }}</h1>

                <p class="book-detail-author">
                    von {{ book.author }}
                </p>

                <p class="book-detail-description">
                    {{ book.beschreibung }}
                </p>

                <RouterLink
                    :to="{
                        name: 'category',
                        params: {
                            category: book.kategorie
                        }
                    }"
                    class="btn-primary"
                >
                    Mehr Bücher aus {{ book.kategorie }} 
                </RouterLink>
            </div>
        </section>
    </main>
</template>

