document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero-section');
    const welcomeText = document.getElementById('welcome-text');
    const contentContainer = document.getElementById('content-container');
    const typedQuotesElement = document.getElementById('typed-quotes');
    const navbar = document.querySelector('.navbar');
    // Removed galleryImages since Gallery section is deleted

    // Quotes to display
    const quotes = [
      '"Live a life worthy of the calling you have received." – Ephesians 4:1',
      '"Trust in the Lord with all your heart and lean not on your own understanding." – Proverbs 3:5',
      '"Let your light shine before others, that they may see your good deeds and glorify your Father in heaven." – Matthew 5:16',
    ];

    // Typing Effect
    function typeEffect(element, text, speed, callback) {
      let i = 0;
      const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(callback, 1000); // Pause before callback
        }
      }, speed);
    }

    // Erase Effect
    function eraseEffect(element, speed, callback) {
      const text = element.textContent;
      let i = text.length;
      const interval = setInterval(() => {
        element.textContent = text.substring(0, i);
        i--;
        if (i < 0) {
          clearInterval(interval);
          setTimeout(callback, 500); // Pause before callback
        }
      }, speed);
    }

    // Cycle Through Quotes
    function cycleQuotes() {
      let currentIndex = 0;
      function displayNextQuote() {
        eraseEffect(typedQuotesElement, 50, () => {
          typedQuotesElement.textContent = '';
          currentIndex = (currentIndex + 1) % quotes.length;
          typeEffect(typedQuotesElement, quotes[currentIndex], 50, displayNextQuote);
        });
      }
      typeEffect(typedQuotesElement, quotes[currentIndex], 50, displayNextQuote);
    }

    // Sequence of Events
    window.addEventListener('load', () => {
      typeEffect(welcomeText, 'Welcome to Life Christian Church', 50, () => {
        eraseEffect(welcomeText, 50, () => {
          heroSection.classList.add('hero-ready'); // Remove blur
          contentContainer.classList.remove('d-none'); // Show scripture and quotes
          cycleQuotes(); // Start quotes cycle
        });
      });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Scroll-Based Animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    // Message Modal Functionality
    const messageModal = document.getElementById('messageModal');
    const messageModalLabel = document.getElementById('messageModalLabel');
    const subtopicsContainer = document.getElementById('subtopicsContainer');
    const iframeContainer = document.getElementById('iframeContainer');
    const messageIframe = document.getElementById('messageIframe');
    const backToSubtopics = document.getElementById('backToSubtopics');
    const iframeLoader = document.getElementById('iframeLoader');

    // Define Topics and Subtopics
    const topics = {
      original_sin: {
        title: 'The Original Sin',
        subtopics: [
          { name: 'Understanding Original Sin - Part 1', url: 'https://themessage.com/en/originalsin?mid=1390' },
          { name: 'Understanding Original Sin - Part 2', url: 'https://themessage.com/en/originalsin?mid=1391' },
          { name: 'Understanding Original Sin - Part 3', url: 'https://themessage.com/en/originalsin?mid=1513' },
        ]
      },
      supernatural: {
        title: 'The Supernatural',
        subtopics: [
          { name: 'Divine Interventions', url: 'https://themessage.com/en/supernatural?mid=1400' },
          { name: 'Miracles and Healings', url: 'https://themessage.com/en/supernatural?mid=1401' },
          { name: 'Faith and the Supernatural', url: 'https://themessage.com/en/supernatural?mid=1402' },
        ]
      },
      in_the_name: {
        title: 'In The Name',
        subtopics: [
          { name: 'Authority in Christ\'s Name - Part 1', url: 'https://themessage.com/en/inthename?mid=1403' },
          { name: 'Authority in Christ\'s Name - Part 2', url: 'https://themessage.com/en/inthename?mid=1404' },
          { name: 'Authority in Christ\'s Name - Part 3', url: 'https://themessage.com/en/inthename?mid=1512' },
        ]
      },
      dreadful_day: {
        title: 'The Dreadful Day Of The Lord',
        subtopics: [
          { name: 'Preparing for the Dreadful Day', url: 'https://themessage.com/en/dreadful?mid=1396' },
        ]
      },
      judgment: {
        title: 'Judgment',
        subtopics: [
          { name: 'Understanding Divine Judgment - Part 1', url: 'https://themessage.com/en/judgment?mid=1397' },
          { name: 'Understanding Divine Judgment - Part 2', url: 'https://themessage.com/en/judgment?mid=1398' },
          { name: 'Understanding Divine Judgment - Part 3', url: 'https://themessage.com/en/judgment?mid=38460' },
        ]
      },
      life_after: {
        title: 'Life After',
        subtopics: [
          { name: 'Eternal Life Promises - Part 1', url: 'https://themessage.com/en/lifeafter?mid=1393' },
          { name: 'Eternal Life Promises - Part 2', url: 'https://themessage.com/en/lifeafter?mid=1394' },
          { name: 'Eternal Life Promises - Part 3', url: 'https://themessage.com/en/lifeafter?mid=1395' },
        ]
      },
    };

    // Function to Populate Subtopics in Modal
    function populateSubtopics(topicKey) {
      const topic = topics[topicKey];
      if (!topic) return;

      // Set Modal Title
      messageModalLabel.textContent = topic.title;

      // Clear Existing Subtopics
      const listGroup = subtopicsContainer.querySelector('.list-group');
      listGroup.innerHTML = '';

      // Populate Subtopics
      topic.subtopics.forEach(sub => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'list-group-item list-group-item-action';
        button.textContent = sub.name;
        button.addEventListener('click', () => {
          loadSubtopic(sub.url);
        });
        listGroup.appendChild(button);
      });

      // Show Subtopics and Hide Iframe
      subtopicsContainer.classList.remove('d-none');
      iframeContainer.classList.add('d-none');
    }

    // Function to Load Subtopic in Iframe with Loader
    function loadSubtopic(url) {
      if (iframeLoader) {
        iframeLoader.classList.remove('d-none');
      }
      messageIframe.src = url;
      subtopicsContainer.classList.add('d-none');
      iframeContainer.classList.remove('d-none');
    }

    // Event Listener for Message Modal Show
    messageModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const topicKey = button.getAttribute('data-topic');
      populateSubtopics(topicKey);
    });

    // Event Listener for Back Button
    backToSubtopics.addEventListener('click', () => {
      messageIframe.src = '';
      iframeContainer.classList.add('d-none');
      subtopicsContainer.classList.remove('d-none');
    });

    // Hide Loader When Iframe Loads
    messageIframe.addEventListener('load', () => {
      if (iframeLoader) {
        iframeLoader.classList.add('d-none');
      }
    });

    // Reset Modal Content on Close
    messageModal.addEventListener('hidden.bs.modal', function () {
      messageModalLabel.textContent = 'Message Title';
      subtopicsContainer.classList.remove('d-none');
      iframeContainer.classList.add('d-none');
      messageIframe.src = '';
      if (iframeLoader) {
        iframeLoader.classList.add('d-none');
      }
    });

    // Modal Control for Bible Study Modal
    const bibleStudyModal = document.getElementById('bibleStudyModal');
    bibleStudyModal.addEventListener('hidden.bs.modal', function () {
      const iframe = bibleStudyModal.querySelector('iframe');
      iframe.src = '';
    });

    // Modal Control for Daily Bread Modal
    const dailyBreadModal = document.getElementById('dailyBreadModal');
    dailyBreadModal.addEventListener('hidden.bs.modal', function () {
      const iframe = dailyBreadModal.querySelector('iframe');
      iframe.src = '';
    });

    // Carousel Control
    const heroCarousel = document.getElementById('heroCarousel');
    const carouselInstance = bootstrap.Carousel.getInstance(heroCarousel) || new bootstrap.Carousel(heroCarousel, {
      interval: 5000,
      ride: 'carousel'
    });

    // Pause carousel when any modal is open, resume when closed
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
      modal.addEventListener('show.bs.modal', () => {
        carouselInstance.pause();
      });
      modal.addEventListener('hidden.bs.modal', () => {
        carouselInstance.cycle();
      });
    });
});
