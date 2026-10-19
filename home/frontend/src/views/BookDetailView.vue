<script setup>
import { onMounted, ref, watch,computed } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";

const route = useRoute();

const error = ref("");
const rating = ref(0);
const reviewText = ref("");
const reviews = ref([]);
const reviewsLoading = ref(false);
const reviewsError = ref("");
const averageRating = computed(() => {
    if (reviews.value.length === 0) {
        return 0;
    }

    let total = 0;

    for (const review of reviews.value) {
        total = total + review.rating;
    }

    const average = total / reviews.value.length;

    return average.toFixed(1);
});
const book = ref(null);
const loading = ref(false);


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
//Bewertung anzeigen von backend
async function loadReviews() {
    const bookId = route.params.id;

    reviews.value = [];
    reviewsLoading.value = true;
    reviewsError.value = "";

    try {
        const response = await fetch(
            `/api/books/id/${encodeURIComponent(bookId)}/reviews`
        );

        if (!response.ok) {
            throw new Error("Bewertungen konnten nicht geladen werden.");
        }

        const data = await response.json();

        if (bookId === route.params.id) {
            reviews.value = data;
        }
    } catch (err) {
        if (bookId === route.params.id) {
            reviewsError.value = err.message;
        }
    } finally {
        if (bookId === route.params.id) {
            reviewsLoading.value = false;
        }
    }

}





async function saveReview() {
    try {
        const response = await fetch(
            `/api/books/id/${encodeURIComponent(route.params.id)}/reviews`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    rating: rating.value,
                    comment: reviewText.value
                })
            }
        );

        if (!response.ok) {
            throw new Error("Die Daten konnten nicht gesendet werden.");
        }

        const data = await response.json();
        console.log(data.message);
        //bewertung direkt angezeigt werden
        await loadReviews();

    } catch (err) {
        console.error("Fehler:", err.message);
    }
}



//Sterne werden null 
watch(
    () => route.params.id,
    function () {
        rating.value = 0;
        reviewText.value = "";

        loadBook();
        loadReviews();
    },
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


                <!-- Bewertung UIX-->
            <div class="book-rating">
                <h2>Bewertung</h2>

                
                    <button
                        v-for="star in 5"
                        :key="star"
                        
                        type="button"
                        class="star"
                        :class="{ filled: star <= rating }"

                        @click="rating = star"
                    >
                        ★
                </button>
                


                <!-- Bewertung ergebnis -->

                <p>Deine Bewertung: {{ rating }} Sterne</p>
                <label for="review-text">Deine Meinung zum Buch</label>

                <textarea
                    id="review-text"
                    v-model="reviewText"
                    rows="4"
                    placeholder="Wie hat dir das Buch gefallen?">
                </textarea>

                
                 
                <!-- Bewertung buttons --> 
<button
    type="button"
    class="btn-primary"
    @click="saveReview"
>
    Bewertung speichern
</button>







                <h3>Bewertungen zu diesem Buch</h3>

<p v-if="reviewsLoading">
    Bewertungen werden geladen...
</p>



<!-- Bewertung erhalten von backend--> 
<p v-else-if="reviewsError" class="error-message">
    {{ reviewsError }}
</p>

<p v-else-if="reviews.length === 0">
    Noch keine Bewertungen.
</p>

<div v-else>
    <p>
        Durchschnitt: {{ averageRating }} von 5 Sternen
    </p>

    <p>
        Anzahl der Bewertungen: {{ reviews.length }}
    </p>

    <div
        v-for="review in reviews"
        :key="review.id"
            class="review-item"

    >
        <p>{{ review.rating }} von 5 Sternen</p>

        <p v-if="review.comment">
            {{ review.comment }}
        </p>
    </div>
</div>

                



            

            </div>
        </section>
    </main>
</template>

