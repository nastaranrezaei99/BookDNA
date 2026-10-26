<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";

const route = useRoute();

const error = ref("");
const rating = ref(0);
const reviewText = ref("");
const reviews = ref([]);
const currentUser = ref(null);
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


//Login checken
async function checkLogin() {
    try {
        const response = await fetch("/api/me", {
            credentials: "include"
        });

        if (!response.ok) {
            currentUser.value = null;
            return;
        }

        const data = await response.json();
        currentUser.value = data.user;

    } catch (err) {
        console.error(err);
        currentUser.value = null;
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

        reviewsLoading.value = false;

    }

}

//Bewertung in Datenbank speichern

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

        //bewertung direkt angezeigt werden, braucht man nicht aktualisieren
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


onMounted(checkLogin);

</script>
<template>
    <Navbar @auth-changed="checkLogin" />

    <main class="book-detail-page">
        <p v-if="loading">
            Buch wird geladen...
        </p>

        <p v-else-if="error" class="error-message">
            {{ error }}
        </p>

        <section v-else-if="book" class="book-detail">
            <div class="book-detail-image">
                <img :src="`/images/${book.img}`" :alt="book.name" />
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

                <RouterLink :to="{
                    name: 'category',
                    params: {
                        category: book.kategorie
                    }
                }" class="btn-primary">
                    Mehr Bücher aus {{ book.kategorie }}
                </RouterLink>
            </div>



            <!-- Bewertung UIX/Stern-->
            <div class="book-rating">
                <h2>Bewertung</h2>

                <!--ist angemeldet?-->
                <div v-if="currentUser" class="review-form">


                    <button v-for="star in 5" :key="star" type="button" class="star" :class="{ filled: star <= rating }"
                        @click="rating = star">
                        ★
                    </button>

                    <!-- Bewertung UIX/CMBox-->

                    <label for="review-text">Deine Meinung zum Buch</label>

                    <textarea id="review-text" v-model="reviewText" rows="4"
                        placeholder="Wie hat dir das Buch gefallen?">
                    </textarea>



                    <!-- Bewertung ergebnis/Sterne -->

                    <p>Deine Bewertung: {{ rating }} Sterne</p>




                    <!-- Bewertung buttons -->
                    <button type="button" class="btn-primary" @click="saveReview">
                        Bewertung speichern
                    </button>
                </div>

                <p v-else>
                    Bitte melde dich an, um eine Bewertung abzugeben.
                </p>



                <!--Erhaltene Bewertung von backend und anzeigen-->
                <h3>Bewertungen zu diesem Buch</h3>

                <p v-if="reviewsLoading">
                    Bewertungen werden geladen...
                </p>


                <p v-else-if="reviewsError" class="error-message">
                    {{ reviewsError }}
                </p>


                <p v-else-if="reviews.length === 0">
                    Noch keine Bewertungen.
                </p>


                <div v-else>
                    <div class="rating-summary">
                        <span class="rating-number">
                            {{ averageRating }}
                        </span>

                        <span class="rating-star">★</span>

                        <span class="rating-count">
                            {{ reviews.length }} Bewertungen
                        </span>
                    </div>

                    <div v-for="review in reviews" :key="review.id" class="review-item">

                        <p class="review-username">
                            {{ review.userName || "Unbekannter Benutzer" }}
                        </p>

                        <div class="review-stars">
                            <span v-for="star in 5" :key="star" :class="{ filled: star <= review.rating }">
                                ★
                            </span>

                            <span class="review-score">
                                {{ review.rating }}/5
                            </span>
                        </div>

                        <p v-if="review.comment" class="review-comment">
                            {{ review.comment }}
                        </p>

                    </div>
                </div>







            </div>
        </section>
    </main>
</template>
