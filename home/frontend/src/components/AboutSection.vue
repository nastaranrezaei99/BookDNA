<template>
  <section id="about" class="about-section">

    <div class="about-header">
      <span class="section-label">ÜBER UNS</span>
      <h2>Was ist BookDNA?</h2>

      <p class="about-intro">
        BookDNA ist eine Plattform zur persönlichen Buchentdeckung.
        Unser Ziel ist es, die Suche nach dem nächsten Buch einfacher,
        persönlicher und inspirierender zu gestalten.
      </p>
    </div>

    <div class="about-steps">

      <div class="about-card">
        <span class="step-number">01</span>
        <h3>Quiz machen</h3>
        <p>
          Beantworte einige kurze Fragen zu deinen Interessen
          und Lesevorlieben.
        </p>
      </div>

      <div class="about-card">
        <span class="step-number">02</span>
        <h3>Bücher entdecken</h3>
        <p>
          Entdecke Bücher aus verschiedenen Kategorien und
          lass dich von Empfehlungen inspirieren.
        </p>
      </div>

      <div class="about-card">
        <span class="step-number">03</span>
        <h3>Dein Buch finden</h3>
        <p>
          Finde Bücher, die zu deinem persönlichen
          Lesegeschmack passen.
        </p>
      </div>

    </div>

    <div class="team-section">
      <span class="section-label">UNSER TEAM</span>
      <h2>Die Menschen hinter BookDNA</h2>

      <div class="team-members">

        <div class="team-member">
          <div class="member-initials">NR</div>
          <h3>Nastaran Rezaei</h3>
        </div>

        <div class="team-member">
          <div class="member-initials">AA</div>
          <h3>Armita Akhavan Jorshari</h3>
        </div>

        <div class="team-member">
          <div class="member-initials">KE</div>
          <h3>Kousha Erfani</h3>
        </div>

      </div>
    </div>

  </section>
</template>
<style scoped>
.about-section {
  padding: 40px 80px;
  background-color: #f8f3ed;
}

.about-header {
  text-align: center;
  margin-bottom: 30px;
}

.about-header h2 {
  font-family: Georgia;
  font-size: 34px;
  margin: 10px;
}

.about-intro {
  width: 65%;
  margin: auto;
  line-height: 1.5;
}

.section-label {
  color: #9a6b50;
  font-size: 12px;
}


/* Schritte */

.about-steps {
  display: flex;
  justify-content: center;
}

.about-card {
  width: 250px;
  padding: 20px;
  border: 1px solid #cfc3b8;
}

.step-number {
  color: #9a6b50;
}

.about-card h3 {
  font-family: Georgia;
  font-size: 20px;
  margin: 12px 0;
}

.about-card p {
  font-size: 14px;
  line-height: 1.4;
  color: #665f5a;
}


/* Team */

.team-section {
  text-align: center;
  margin-top: 45px;
}

.team-section h2 {
  font-family: Georgia;
  font-size: 27px;
  margin: 10px 0 25px;
}

.team-members {
  display: flex;
  justify-content: center;
  gap: 35px;
}

.team-member {
  width: 160px;
}

.member-initials {
  width: 60px;
  height: 60px;
  border: 1px solid #9a6b50;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: auto;
}

.team-member h3 {
  font-size: 15px;
}
</style>