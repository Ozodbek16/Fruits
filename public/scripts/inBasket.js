const btn = document.querySelectorAll(".buy");
const result = document.querySelector(".absolut span");

const url = "/fruits/data/fruits.json";
let cartItems;

const arr = async () => {
  const response = await fetch(url);
  const products = await response.json();

  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      products[i].inCart += 1;
      console.log(products[i]);
      cartNum();
    });
  }

  function cartNum() {
    let allCart = 0;
    for (let i = 0; i < products.length; i++) {
      const num = +products[i].inCart;
      if (+products[i].inCart > 0) {
        allCart += num;
      }
      localStorage.setItem("ProductNumber", allCart);
      result.innerHTML = allCart;
    }
  }
};

arr();
