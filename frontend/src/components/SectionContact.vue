<script setup>
defineProps({
  currentStyle: String
})
</script>

<template>
  <section class="section-contact section-padding">
    <h2 class="section-title">Contact</h2>
    <div class="contact-content">
      <p>
        Feel free to reach out! Whether you have a question, a project proposal, or just want to
        connect, my inbox is always open.
      </p>
      <form class="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" class="form-input" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" class="form-input" />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" class="form-textarea"></textarea>
        </div>
        <button type="submit" class="submit-button">Send Message</button>
      </form>
    </div>
  </section>
</template>
