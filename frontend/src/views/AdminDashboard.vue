<script setup>
// No futuro, podemos buscar aqui estatísticas, como:
// - Número de projetos
// - Número de posts
// - Número de mensagens não lidas
</script>

<template>
  <div class="admin-dashboard">
    <h1 class="admin-page-title">Dashboard</h1>
    <p class="admin-welcome-text">
      Bem-vindo ao Painel de Administração!
    </p>
    <p>
      Utilize o menu lateral para gerir o conteúdo do seu portfólio.
    </p>

    <div class="stats-grid">
      <div class="resume-item stat-card">
        <h4>Projetos</h4>
        <p class="stat-number">12</p>
      </div>
      <div class="resume-item stat-card">
        <h4>Posts</h4>
        <p class="stat-number">5</p>
      </div>
      <div class="resume-item stat-card">
        <h4>Mensagens</h4>
        <p class="stat-number">3</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-page-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
}

.admin-welcome-text {
  font-size: 20px;
  margin-bottom: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.stat-card {
  /* O .resume-item já nos dá o estilo neobrutalism (border, shadow, bg) */
  text-align: center;
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  color: #5093fe;
  margin-top: 10px;
}
</style>