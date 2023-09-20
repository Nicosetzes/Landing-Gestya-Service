const carousel = document.querySelector("#carousel");
if (window.matchMedia("(min-width: 992px)").matches) {
  let newCarousel = new bootstrap.Carousel(carousel, {
    interval: false,
    wrap: false,
  });
  let carouselWidth = $(".carousel-inner")[0].scrollWidth;
  let cardWidth = $(".carousel-item").width();
  let scrollPosition = 0;
  $("#carousel .carousel-control-next").on("click", function () {
    console.log("fw");
    if (scrollPosition < carouselWidth - cardWidth * 3) {
      scrollPosition += cardWidth;
      $("#carousel .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });
  $("#carousel .carousel-control-prev").on("click", function () {
    console.log("prev");
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      $("#carousel .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });
} else {
  $(carousel).addClass("slide");
}
