<template>
  <div class="auth-overlay" @click.self="$emit('close')">
    <div class="auth-box">
      <button class="close-btn" type="button" @click="$emit('close')">
        ×
      </button>

      <h2>{{ isRegister ? "Registrieren" : "Anmelden" }}</h2>
      
      <form @submit.prevent="submitForm">
        <input
          v-if="isRegister"
          v-model="name"
          type="text"
          placeholder="Name"
          autocomplete="name"
          required
        />

        <input
          v-model="email"
          type="email"
          placeholder="E-Mail"
          autocomplete="email"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Passwort"
          :autocomplete="isRegister ? 'new-password' : 'current-password'"
          required
          :minlength="isRegister ? 8 : undefined"
        />

        <input
          v-if="isRegister"
          v-model="confirmPassword"
          type="password"
          placeholder="Passwort bestätigen"
          autocomplete="new-password"
          required
        />

        <p v-if="error" class="error">{{ error }}</p>

        <button class="submit-btn" type="submit" :disabled="loading">
          {{ loading ? "Bitte warten..." : isRegister ? "Konto erstellen" : "Anmelden" }}
        </button>
      </form>

      <p class="switch-text">
        {{ isRegister ? "Schon ein Konto?" : "Noch kein Konto?" }}

        <button type="button" @click="switchMode">
          {{ isRegister ? "Anmelden" : "Registrieren" }}
        </button>
      </p>
      <!-- Registrierung erfolgreich -->
      <div v-if="showRegisterSuccess" class="register-success">
        <div class="checkmark">✓</div>
        <h3>Registrierung erfolgreich!</h3>
        <p>Willkommen bei BookDNA!</p>
      </div>

      <!-- Anmeldung erfolgreich -->
      <div v-if="showLoginSuccess" class="login-success">
        <div class="welcome-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 7v14"/>
          <path d="M3 18V5a1 1 0 0 1 1-1h3a5 5 0 0 1 5 5 5 5 0 0 1 5-5h3a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-3a5 5 0 0 0-5 2 5 5 0 0 0-5-2H4a1 1 0 0 1-1-1Z"/>
        </svg>
      </div>
        <h3>Willkommen zurück!</h3>
        <p>Du bist jetzt angemeldet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["close", "logged-in"]);

const isRegister = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const loading = ref(false);
const showRegisterSuccess = ref(false);
const showLoginSuccess = ref(false);


function switchMode() {
  isRegister.value = !isRegister.value;
  name.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  error.value = "";
}

async function submitForm() {
  error.value = "";

  if (isRegister.value && password.value !== confirmPassword.value) {
    error.value = "Die Passwörter stimmen nicht überein.";
    return;
  }

  loading.value = true;

  try {
    const endpoint = isRegister.value ? "/api/register" : "/api/login";

    const data = isRegister.value
      ? { name: name.value, email: email.value, password: password.value }
      : { email: email.value, password: password.value };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      error.value = result.error || "Ein Fehler ist aufgetreten.";
      return;
    }

    if (isRegister.value) {
      // Registrierung erfolgreich
      showRegisterSuccess.value = true;

      await new Promise(resolve => setTimeout(resolve, 2000));

      showRegisterSuccess.value = false;
      switchMode();

    } else {
      // Anmeldung erfolgreich
      showLoginSuccess.value = true;

      await new Promise(resolve => setTimeout(resolve, 1800));

      emit("logged-in", result.user);
      emit("close");
    }

  } catch (err) {
    error.value = "Verbindung zum Server fehlgeschlagen.";
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>
.auth-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.auth-box {
  position: relative;
  width: 90%;
  max-width: 400px;
  padding: 32px;
  background: #fffaf5;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.auth-box h2 {
  margin: 0 0 24px;
  text-align: center;
  color: #503b30;
}

.auth-box form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.auth-box input {
  padding: 12px;
  border: 1px solid #cbbcaf;
  border-radius: 6px;
  font: inherit;
  background: white;
  color: #30251f;
}

.auth-box input:focus {
  outline: 2px solid #a9846a;
}

.submit-btn {
  padding: 12px;
  background: #765442;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font: inherit;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.close-btn {
  position: absolute;
  right: 15px;
  top: 10px;
  border: none;
  background: transparent;
  color: #503b30;
  font-size: 26px;
  cursor: pointer;
}

.switch-text {
  margin: 20px 0 0;
  text-align: center;
  font-size: 14px;
  color: #503b30;
}

.switch-text button {
  background: none;
  border: none;
  color: #765442;
  text-decoration: underline;
  cursor: pointer;
  font: inherit;
}

.error {
  color: #b42318;
  font-size: 13px;
}
/* Registrierung erfolgreich */
.register-success,
.login-success {
  position: absolute;
  inset: 0;
  background-color: #f5eadc;
  color: #483826;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  z-index: 10;
}

.register-success {
  animation: popIn 0.4s ease;
}

.checkmark {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #483826;
  color: white;
  font-size: 48px;
  line-height: 70px;
  text-align: center;
  margin-bottom: 15px;
}

.register-success h3,
.login-success h3 {
  margin: 5px 0;
  font-size: 24px;
}

.register-success p,
.login-success p {
  margin: 8px 0 0;
  font-size: 16px;
}

/* Anmeldung erfolgreich */
.login-success {
  background-color: #fff4e8;
  animation: welcomeIn 0.7s ease;
}

.welcome-icon {
  color: #765442;
  margin-bottom: 15px;
  animation: bookBounce 1s ease;
}

/* Animationen */
@keyframes popIn {
  from {
    transform: scale(0.7);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes welcomeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bookBounce {
  0% {
    transform: scale(0.5) rotate(-12deg);
  }

  60% {
    transform: scale(1.15) rotate(5deg);
  }

  100% {
    transform: scale(1) rotate(0);
  }
}
</style>
