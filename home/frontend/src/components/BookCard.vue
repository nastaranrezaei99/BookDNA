<template>
    <article class="book-card">
        <img
            :src="imageUrl"
            :alt="book.name"
        />

        <div class="book-info">
           <h3>
    <RouterLink
        :to="{
            name: 'book-detail',
            params: {
                id: book.id
            }
        }"
        class="book-title-link"
    >
        {{ book.name }}
    </RouterLink>
</h3>
            <p>{{ book.author }}</p>
            <p v-if="book.kategorie">
                {{ book.kategorie }}
            </p>
            <p v-if="book.beschreibung">
                {{ book.beschreibung }}
            </p>
        </div>
    </article>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    book: {
        type: Object,
        required: true
    }
});

const imageUrl = computed(() => {
    return `/images/${props.book.img}`;
});
</script>