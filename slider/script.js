let images = [
  {
    url: "./images/project.png",
    option1: "Rostov-on-Don LCD admiral",
    option2: "81 m2",
    option3: "3.5 months",
    option4: "Upon request",
    head: "Rostov-on-Don, Admiral",
  },
  {
    url: "./images/project2.png",
    option1: "Sochi Thieves",
    option2: "105 m2",
    option3: "4 months",
    option4: "Upon request",
    head: "Sochi Thieves",
  },
  {
    url: "./images/project3.png",
    option1: "Rostov-on-Don Patriotic",
    option2: "93 m2",
    option3: "3 months",
    option4: "Upon request",
    head: "Rostov-on-Don Patriotic",
  },
];

function initSlider(options) {
  if (!images || !images.length) return;

  options = options || {
    titles: true,
    dots: true,
    autoplay: false,
  };

  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  let sliderText = document.querySelector(".project__photo_text");

  initImages();
  initArrows();
  initText();

  if (options.dots) {
    initDots();
  }

  if (options.titles) {
    initTitles();
  }

  if (options.autoplay) {
    initAutoplay();
  }

  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${
        index === 0 ? "active" : ""
      }" style="background-image:url(${
        images[index].url
      });" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${
        index === 0 ? "active" : ""
      }" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach((dot) => {
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      });
    });
  }
  function initText() {
    images.forEach((image, index) => {
      let text = `<p class="project__photo_text_p n${index} ${
        index === 0 ? "active" : ""
      }" data-index="${index}">${images[index].head}</p>`;
      sliderText.innerHTML += text;
    });
    sliderText.querySelectorAll(".project__photo_text_p").forEach((text) => {
      text.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      });
    });
  }

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    sliderText.querySelector(".active").classList.remove("active");
    sliderText.querySelector(".n" + num).classList.add("active");

    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }

  function changeTitle(num) {
    let sliderTitle1 = document.querySelector(".option1");
    sliderTitle1.innerText = cropTitle(images[num].option1);
    let sliderTitle2 = document.querySelector(".option2");
    sliderTitle2.innerText = cropTitle(images[num].option2);
    let sliderTitle3 = document.querySelector(".option3");
    sliderTitle3.innerText = cropTitle(images[num].option3);
    let sliderTitle4 = document.querySelector(".option4");
    sliderTitle4.innerText = cropTitle(images[num].option4);
  }

  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size);
    }
  }

  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: true,
  autoplayInterval: 5000,
};

document.addEventListener("DOMContentLoaded", function () {
  initSlider(sliderOptions);
});
