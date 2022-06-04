const btn = document.querySelectorAll('.buy')

const url = '/fruits/data/fruits.json';

const arr = async () => {
    const response = await fetch(url);
    const fruits = await response.json();

    for (let i = 0; i <= btn.length - 1; i++) {
        btn[i].addEventListener('click', () => {
            cartNum(fruits[i])
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
        setItem(product)
    }

    function setItem(product) {
        let cartItems = localStorage.getItem('ProductsinCart')

        cartItems = JSON.parse(cartItems);

        console.log(cartItems);

        if (cartItems != null) {
            cartItems[product.id].inCart += 1
        } else {
            product.inCart = 1
            cartItems = {
                [product.id]: product
            }
        }


        localStorage.setItem('ProductsinCart', JSON.stringify(cartItems))
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