const btn = document.querySelectorAll('.buy')

const url = '/fruits/data/fruits.json';

const arr = async () => {
    const response = await fetch(url);
    const products = await response.json();

    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', () => {
            cartNum(products[i])
        })
    }


    function cartNum(product) {
        let productNum = localStorage.getItem('num')

        productNum = +productNum

        if (productNum) {
            localStorage.setItem('num', productNum + 1)
            document.querySelector('.absolut span').innerHTML = productNum + 1;
        } else {
            localStorage.setItem('num', 1)
            document.querySelector('.absolut span').innerHTML = 1;
        }
        setItems(product)
    }

    function setItems(product) {
        let cartItems = localStorage.getItem('productsInCart')
        cartItems = JSON.parse(cartItems)
        console.log('my cart items are', cartItems);
        product.inCart = 1

        cartItems = {
            [product.name]: product
        }


        localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    }
}
function onLoadCartNumber() {
    let productNum = localStorage.getItem('num')

    if (productNum) {
        document.querySelector('.absolut span').innerHTML = productNum;
    }
}

arr()


onLoadCartNumber()