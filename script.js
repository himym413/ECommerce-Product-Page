"use strict";

const lightbox = document.querySelector(".lightbox");
const overlay = document.querySelector(".overlay");
const closeLightboxBtn = document.querySelector(".close-lightbox");
const openMobileMenuBtn = document.querySelector(".mobile-menu-btn");
const closeMobileMenuBtn = document.querySelector(".close-mobile-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const imgGallery = document.querySelector("main .main-one .img-gallery");
const imgGalleryLightbox = document.querySelector(".lightbox .img-gallery");
const mainImage = document.querySelector("main .main-one .main-image");
const mainImageLightbox = document.querySelector(".main-image-lightbox");
const imageOverlayMainAll = document.getElementsByClassName("img-overlay-main");
const imageOverlayLightboxAll = document.getElementsByClassName(
  "img-overlay-lightbox"
);
const lightboxBtns = document.querySelectorAll(".lightbox-btn");
const lightboxBtnsBackgrounds = document.querySelectorAll(".btn-background");
const mobileBtnsBackgrounds = document.querySelectorAll(
  ".mobile-btn-background"
);
const cartBtn = document.querySelector(".notif-container");
const mobileBasket = document.querySelector(".mobile-basket");
const articleCounter = document.querySelector(".article-counter");
const numberOfArticles = document.querySelector(".number-of-articles");
const addToCartBtn = document.querySelector(".article-add-btn");
const mobileBasketProductPart = document.querySelector(".mobile-basket-bottom");
const mobileBasketEmpty = document.querySelector(".mobile-basket-empty");
const checkoutBtn = document.querySelector(".checkout-btn");
const notifNumber = document.querySelector(".number-of-notif");

const openLightbox = () => {
  lightbox.classList.remove("hide");
  overlay.classList.remove("hide");
};

const closeLightbox = () => {
  lightbox.classList.add("hide");
  overlay.classList.add("hide");
};

const openMobileMenu = () => {
  mobileMenu.classList.remove("hide");
  overlay.classList.remove("hide");
};

const closeMobileMenu = () => {
  mobileMenu.classList.add("hide");
  overlay.classList.add("hide");
};

const checkClick = (el) => {
  if (
    !el.classList.contains("img1") &&
    !el.classList.contains("img2") &&
    !el.classList.contains("img3") &&
    !el.classList.contains("img4")
  )
    return true;
};

const switchBigImage = (el, where = "main") => {
  let number = el.dataset.image;

  if (where === "lightbox")
    mainImageLightbox.src = `images/image-product-${number}.jpg`;

  mainImage.src = `images/image-product-${number}.jpg`;
};

const removeOverlayForAllImages = (where = "main") => {
  if (where === "lightbox")
    for (let i = 0; i < imageOverlayLightboxAll.length; i++)
      imageOverlayLightboxAll[i].classList.add("hide");

  for (let i = 0; i < imageOverlayMainAll.length; i++)
    imageOverlayMainAll[i].classList.add("hide");
};

const addOverlayForSelectedImage = (el) => {
  el.querySelector("div").classList.remove("hide");
};

const switchImage = (e) => {
  // Check for click, if click not image, return

  if (checkClick(e.target)) return;

  // Remove fade for all images
  removeOverlayForAllImages();

  // Add fade for selected image
  addOverlayForSelectedImage(e.target);

  // Switch main image
  switchBigImage(e.target);

  // Comparing clicked image to lightbox
  for (let i = 0; i < imageOverlayLightboxAll.length; i++) {
    imageOverlayLightboxAll[i].classList.add("hide");

    if (
      imageOverlayLightboxAll[i].parentElement.dataset.image ===
      e.target.dataset.image
    ) {
      imageOverlayLightboxAll[i].classList.remove("hide");
      mainImageLightbox.src = `images/image-product-${e.target.dataset.image}.jpg`;
    }
  }
};

const switchImageLightbox = (e) => {
  // Check for click, if click not image, return

  if (checkClick(e.target)) return;

  switchBigImage(e.target, "lightbox");

  // Remove fade for all images
  removeOverlayForAllImages("lightbox");

  // Add fade for selected image
  addOverlayForSelectedImage(e.target);
};

let i = 1;
const changeMobileImage = (e) => {
  if (e.target.classList.contains("background-for-previous-btn")) {
    i--;
    if (i === 0) i = 4;
  }

  if (e.target.classList.contains("background-for-next-btn")) {
    i++;
    if (i === 5) i = 1;
  }

  mainImage.src = `images/image-product-${i}.jpg`;
};

const changeImage = (e) => {
  if (e.target.classList.contains("background-for-previous-btn")) {
    for (let i = 0; i < imageOverlayLightboxAll.length; i++) {
      if (!imageOverlayLightboxAll[i].classList.contains("hide")) {
        imageOverlayLightboxAll[i].classList.add("hide");

        if (i === 0) i = 4;

        mainImageLightbox.src = `images/image-product-${i}.jpg`;
        imageOverlayLightboxAll[i - 1].classList.remove("hide");
        return;
      }
    }
  }

  if (e.target.classList.contains("background-for-next-btn")) {
    for (let i = 0; i < imageOverlayLightboxAll.length; i++) {
      if (!imageOverlayLightboxAll[i].classList.contains("hide")) {
        imageOverlayLightboxAll[i].classList.add("hide");

        if (i === 3) i = -1;

        mainImageLightbox.src = `images/image-product-${i + 2}.jpg`;
        imageOverlayLightboxAll[i + 1].classList.remove("hide");
        return;
      }
    }
  }
};

const openOrCloseBasket = () => {
  mobileBasket.classList.toggle("hide");
};

let number = 0;
const countArticles = (e) => {
  if (
    !e.target.classList.contains("minus-btn") &&
    !e.target.classList.contains("plus-btn")
  )
    return;

  if (e.target.classList.contains("minus-btn")) {
    if (number === 0) return;

    number--;
  }

  if (e.target.classList.contains("plus-btn")) number++;

  numberOfArticles.innerHTML = `${number}`;
};

let addMore = false;
let addProduct = false;
const addToCart = () => {
  const number = +numberOfArticles.innerHTML;
  const price = +document
    .querySelector(".article-current-price")
    .innerHTML.slice(1);
  let productNumber = document.querySelector(".product-number");
  let productTotalPrice = document.querySelector(".total-price");

  let addMoreHtml = `
  <span class="add-more-text">Please select the number of items you wish to add to cart.<span>
  `;

  if (number === 0 && addMore === false) {
    articleCounter.insertAdjacentHTML("afterend", addMoreHtml);
    addMore = true;
    return;
  }

  if (number === 0 && addMore === true) return;

  if (number > 0 && addMore === true) {
    document.querySelector(".add-more-text").remove();
    addMore = false;
  }

  if (addProduct && number !== productNumber.innerHTML.slice(1)) {
    productNumber.innerHTML = `x ${number}`;
    productTotalPrice.innerHTML = `$${(price * number).toFixed(2)}`;
    notifNumber.innerHTML = number;
  }

  if (addProduct) return;

  if (!mobileBasketEmpty.classList.contains("hide"))
    mobileBasketEmpty.classList.add("hide");

  let productHtml = `
  <div class="product flex mb-2">
    <img src="images/image-product-1-thumbnail.jpg" alt="Product Image" />
      <div class="product-info">
        <h4 class="product-title clr-dark normal">
          Autumn Limited Edition Sneakers
        </h4>
        <div class="product-price">
          <span class="price clr-dark">$${price.toFixed(2)}</span>
          <span class="product-number clr-dark">x ${number}</span>
          <span class="total-price clr-very-dark bold">$${(
            price * number
          ).toFixed(2)}</span>
        </div>
      </div>
        <svg
            class="delete-product"
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24px"
            height="24px"
        >
          <path
              d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"
              fill="#727A88"
          />
        </svg>
  </div>
  `;

  mobileBasketProductPart.insertAdjacentHTML("afterbegin", productHtml);
  addProduct = true;
  let basketDeleteBtn = document.querySelector(".delete-product");
  basketDeleteBtn.addEventListener("click", deleteProduct);
  checkoutBtn.classList.remove("hide");
  notifNumber.innerHTML = number;
  notifNumber.classList.remove("hide");
};

const deleteProduct = () => {
  const product = document.querySelector(".product");

  product.remove();
  mobileBasketEmpty.classList.remove("hide");
  addProduct = false;
  checkoutBtn.classList.add("hide");
  notifNumber.classList.add("hide");
};

mainImage.addEventListener("click", openLightbox);
closeLightboxBtn.addEventListener("click", closeLightbox);
overlay.addEventListener("click", closeLightbox);

openMobileMenuBtn.addEventListener("click", openMobileMenu);
closeMobileMenuBtn.addEventListener("click", closeMobileMenu);

imgGallery.addEventListener("click", switchImage);
imgGalleryLightbox.addEventListener("click", switchImageLightbox);

lightboxBtnsBackgrounds.forEach((btn) =>
  btn.addEventListener("click", changeImage)
);

mobileBtnsBackgrounds.forEach((btn) => {
  btn.addEventListener("click", changeMobileImage);
});

cartBtn.addEventListener("click", openOrCloseBasket);
articleCounter.addEventListener("click", countArticles);
addToCartBtn.addEventListener("click", addToCart);
