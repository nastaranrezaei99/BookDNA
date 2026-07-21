<template>
    <section id="celebrity" class="celebrity-section">
        <div class="section-header">
            <p class="label">
                FAMOUS READERS
            </p>

            <h2>Celebrity Picks</h2>

            <p class="section-text">
                Discover books recommended by well-known personalities.
            </p>
        </div>

        <p v-if="loading">
            Loading celebrity picks...
        </p>

        <p v-else-if="error" class="error-message">
            {{ error }}
        </p>

        <p v-else-if="celebrityPicks.length === 0">
            No celebrity picks found.
        </p>

        <div v-else class="celebrity-grid">
            <article
                v-for="pick in celebrityPicks"
                :key="pick.pick_id"
                class="celebrity-card"
            >
                <img
                    class="celebrity-image"
                    :src="`/images/${pick.celebrity_img}`"
                    :alt="pick.celebrity"
                />

                <div class="celebrity-book-info">
                    <p class="celebrity-name">
                        {{ pick.celebrity }}
                    </p>

                    <RouterLink
                        :to="{
                            name: 'book-detail',
                            params: {
                                id: pick.book_id
                            }
                        }"
                        class="celebrity-book-link"
                    >
                        {{ pick.name }}
                    </RouterLink>

                    <p class="book-author">
                        by {{ pick.author }}
                    </p>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";

const celebrityPicks = ref([]);
const loading = ref(false);
const error = ref("");

async function loadCelebrityPicks() {
    loading.value = true;
    error.value = "";

    try {
        const response = await fetch("/api/celebrity-picks");

        if (!response.ok) {
            throw new Error(
                "Celebrity picks could not be loaded."
            );
        }

        celebrityPicks.value = await response.json();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

onMounted(loadCelebrityPicks);
</script>