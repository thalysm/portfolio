import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    // Menu & Titles
    home: 'Home',
    resume: 'Resume',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
    
    // Actions & Labels
    viewProject: 'View Project',
    viewMore: 'View More',
    back: 'Back',
    details: 'Details',
    prev: 'Prev',
    next: 'Next',
    all: 'All',
    
    // Resume
    education: 'Education',
    experience: 'Experience',
    present: 'Present',
    
    // Home Section
    hi: 'Hi, My name is',
    homeDescription: 'Computer Engineer specialized in Data Science and UI/UX, passionate about transforming complex problems into intelligent digital solutions. I work at the intersection of technology, design, and strategy, building end-to-end products with a strong focus on usability and innovation. I have solid experience with machine learning, recommendation systems, mobile and web development, and data visualization, always aiming for impact and exceptional user experience.',
    
    // Contact Section
    contactDesc: 'Feel free to reach out! Whether you have a question, a project proposal, or just want to connect, my inbox is always open.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    sendMessage: 'Send Message',
    sending: 'Sending...',
    successMessage: 'Message sent successfully! Thank you.',
    fillAllFields: 'Please fill in all fields.',
    serverError: 'Failed to communicate with the server. Try again.',

    // Footer
    footerText: 'Developed with 🖤  •  Thalys Marques  •  {year} All Rights Reserved.'
  },
  pt: {
    // Menu & Títulos
    home: 'Início',
    resume: 'Currículo',
    projects: 'Projetos',
    blog: 'Blog',
    contact: 'Contato',
    
    // Ações & Etiquetas
    viewProject: 'Ver Projeto',
    viewMore: 'Ver Mais',
    back: 'Voltar',
    details: 'Detalhes',
    prev: 'Ant',
    next: 'Prox',
    all: 'Todos',
    
    // Currículo
    education: 'Educação',
    experience: 'Experiência',
    present: 'Presente',
    
    // Home Section
    hi: 'Olá, meu nome é',
    homeDescription: 'Engenheiro de Computação especializado em Ciência de Dados e UI/UX, apaixonado por transformar problemas complexos em soluções digitais inteligentes. Atuo na interseção entre tecnologia, design e estratégia, construindo produtos completos, de ponta a ponta. Tenho experiência sólida com machine learning, sistemas de recomendação, desenvolvimento mobile/web e visualização de dados, sempre com foco em impacto e experiência do usuário.',
    
    // Contact Section
    contactDesc: 'Sinta-se à vontade para entrar em contato! Se tiver uma pergunta, uma proposta de projeto ou apenas quiser se conectar, minha caixa de entrada está sempre aberta.',
    name: 'Nome',
    email: 'Email',
    message: 'Mensagem',
    sendMessage: 'Enviar Mensagem',
    sending: 'Enviando...',
    successMessage: 'Mensagem enviada com sucesso! Obrigado.',
    fillAllFields: 'Por favor, preencha todos os campos.',
    serverError: 'Falha na comunicação com o servidor. Tente novamente.',

    // Footer
    footerText: 'Desenvolvido com 🖤  •  Thalys Marques  •  {year} Todos os Direitos Reservados.'
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages
})

export default i18n