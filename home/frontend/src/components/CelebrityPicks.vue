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
                "Die Empfehlungen konnten nicht geladen werden."
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
<template>
    <section id="celebrity" class="celebrity-section">
        <div class="section-header">
            <p class="label">
                BERÜHMTE LESER
            </p>

            <h2>Promi-Empfehlungen</h2>

            <p class="section-text">
                Entdecke Bücher, die von bekannten Persönlichkeiten empfohlen werden.
            </p>
        </div>

        <p v-if="loading">
            Empfehlungen werden geladen...
        </p>

        <p v-else-if="error" class="error-message">
            {{ error }}
        </p>

        <p v-else-if="celebrityPicks.length === 0">
            Keine Empfehlungen gefunden.
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
                        von {{ pick.author }}
                    </p>
                </div>
            </article>
        </div>
    </section>
</template>