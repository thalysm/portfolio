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
    homeDescription: 'A passionate Front-End developer with a Bachelor of Computer Engineering. My journey in the world of programming started with the goal of combining my love for technology with creating intuitive and enjoyable interfaces. With knowledge in UI/UX, I have the ability to design digital experiences that delight users. Born in Uberaba, Minas Gerais, I bring a unique perspective and an innovative approach to my projects. My focus is always on balancing aesthetics and functionality, ensuring that every detail is carefully considered. I am always seeking constant learning, aiming to enhance my skills and stay updated with the latest trends in the field of Front-End development.',
    
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
    homeDescription: 'Um desenvolvedor Front-End apaixonado, bacharel em Engenharia de Computação. Minha jornada no mundo da programação começou com o objetivo de combinar meu amor pela tecnologia com a criação de interfaces intuitivas e agradáveis. Com conhecimentos em UI/UX, tenho a habilidade de projetar experiências digitais que encantam os usuários. Nascido em Uberaba, Minas Gerais, trago uma perspectiva única e uma abordagem inovadora para meus projetos. Meu foco está sempre em equilibrar estética e funcionalidade, garantindo que cada detalhe seja cuidadosamente considerado. Estou sempre em busca de aprendizado constante, visando aprimorar minhas habilidades e me manter atualizado com as últimas tendências na área de desenvolvimento Front-End.',
    
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