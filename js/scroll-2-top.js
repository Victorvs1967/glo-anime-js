const scroll = () => {
  const scrollUpBtn = document.getElementById('scrollToTopButton');

  scrollUpBtn.addEventListener('click', () => {
    seamless.scrollIntoView(document.querySelector(".header"), {
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  });
};

scroll();
