document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector("#carousel");

  if (window.matchMedia("(min-width: 992px)").matches) {
    let newCarousel = new bootstrap.Carousel(carousel, {
      interval: false, // Disable automatic sliding
      wrap: false, // Prevent wrapping at the end
    });

    let carouselWidth = document.querySelector(".carousel-inner").scrollWidth;
    let cardWidth = document.querySelector(".carousel-item").offsetWidth;
    let scrollPosition = 0;

    document.querySelector("#carousel .carousel-control-prev").style.display =
      "none"; // Escondo la flecha de retroceso de movida, ya que arranco en la primera slide //

    document
      .querySelector("#carousel .carousel-control-next")
      .addEventListener("click", function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition += cardWidth * 3; // Avanzo de a 3 fotos a la vez
          document
            .querySelector("#carousel .carousel-inner")
            .scroll({ left: scrollPosition, behavior: "smooth" });
          if (scrollPosition > 0)
            document.querySelector(
              "#carousel .carousel-control-prev"
            ).style.display = "flex"; // Vuelvo a mostrar la flecha de retroceso si la posición NO es la 0 //
          if (scrollPosition >= carouselWidth - cardWidth * 4) {
            document.querySelector(
              "#carousel .carousel-control-next"
            ).style.display = "none"; // Desaparece la flecha para adelantar si llegué al final del carrusel //
          }
        }
      });

    document
      .querySelector("#carousel .carousel-control-prev")
      .addEventListener("click", function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth * 3; // Retrocedo de a 3 fotos a la vez
          document
            .querySelector("#carousel .carousel-inner")
            .scroll({ left: scrollPosition, behavior: "smooth" });
          if (scrollPosition <= 0)
            document.querySelector(
              "#carousel .carousel-control-prev"
            ).style.display = "none"; // Escondo la flecha de retroceso //
        }
        if (scrollPosition < carouselWidth - cardWidth * 4)
          document.querySelector(
            "#carousel .carousel-control-next"
          ).style.display = "flex"; // Reaparece la flecha para adelantar si se puede ir hacia adelante //
      });
  } else {
    carousel.classList.add("slide");
  }
});
