<template>
    <div class="search-popup" @click.self="closePopup">
        <div class="search-box">
            <input
                v-model="searchText"
                type="text"
                placeholder="Search for a book..."
                @keyup.enter="search"
            />

            <button type="button" @click="search">
                Search
            </button>

            <button type="button" @click="closePopup">
                Close
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["close"]);

const router = useRouter();
const searchText = ref("");

function search() {
    const text = searchText.value.trim();

    if (!text) {
        return;
    }

    router.push({
        name: "search",
        query: {
            q: text
        }
    });

    emit("close");
}

function closePopup() {
    emit("close");
}
</script>