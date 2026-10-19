<template>
    <header class="navbar">
        <RouterLink to="/" class="logo">
            <span class="dna-circle"></span>
            BookDNA
        </RouterLink>

        <nav>
            <a href="/#genres">Kategorien</a>
            
            <button
                class="nav-link"
                type="button"
                @click="showSearch = true"
            >
                Suche
            </button>

            <RouterLink to="/quiz">Quiz</RouterLink>

            <a href="/#celebrity">Promi-Empfehlungen</a>
            <a href="/#about">Über uns</a>
        </nav>

        <div class="nav-actions">
            <button v-if="user" class="nav-link" type="button" @click="logout"> Abmelden </button>

            <button v-else class="nav-link" type="button" @click="showAuth = true"> Anmelden </button>

            <RouterLink to="/dashboard" class="btn-small"> Mein Bereich </RouterLink> 
        </div>
    </header>

    <SearchPopup
        v-if="showSearch"
        @close="showSearch = false"
    />
    <AuthPopup
        v-if="showAuth"
        @close="showAuth = false"
        @logged-in="handleLogin"
    />
    <Transition name="logout-fade">
      <div v-if="showLogoutSuccess" class="logout-overlay">
        <div class="logout-box">
         <div class="logout-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="65"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>

          <h3>Erfolgreich abgemeldet!</h3>
          <p>Bis bald bei BookDNA!</p>
        </div>
      </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import SearchPopup from "./SearchPopup.vue";
import AuthPopup from "./AuthPopup.vue";

const showSearch = ref(false);
const showAuth = ref(false);
const user = ref(null);
const showLogoutSuccess = ref(false);

onMounted(async function () {
  try {
    const response = await fetch("/api/me", {
      credentials: "include"
    });

    if (response.ok) {
      const data = await response.json();
      user.value = data.user;
    }
  } catch (err) {
    console.error("Login-Status konnte nicht geprüft werden:", err);
  }
});

function handleLogin(loggedInUser) {
  user.value = loggedInUser;
}

async function logout() {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Logout fehlgeschlagen");
    }

    user.value = null;
    showLogoutSuccess.value = true;

    setTimeout(() => {
      showLogoutSuccess.value = false;
    }, 2000);

  } catch (err) {
    console.error(err);
    alert("Abmelden fehlgeschlagen.");
  }
}
</script>
<style scoped>
.logout-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.logout-box {
  background: #f5eadc;
  color: #483826;
  width: 90%;
  max-width: 400px;
  padding: 45px 25px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: logoutPop 0.4s ease;
}

.logout-icon {
  color: #765442;
  margin-bottom: 15px;
}

.logout-box h3 {
  margin: 8px 0;
  font-size: 24px;
}

.logout-box p {
  margin: 8px 0 0;
  font-size: 16px;
}

.logout-fade-enter-active,
.logout-fade-leave-active {
  transition: opacity 0.3s ease;
}

.logout-fade-enter-from,
.logout-fade-leave-to {
  opacity: 0;
}

@keyframes logoutPop {
  from {
    transform: scale(0.7);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>