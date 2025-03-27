document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userAdd");
    const usernameInput = document.getElementById("usernameInput");
    const telephoneInput = document.getElementById("telephoneInput");
    const customerList = document.querySelector(".customers-list");
    const foodsForm = document.getElementById("foodsForm");
    const foodsSelect = document.getElementById("foodsSelect");
    const foodsCount = document.getElementById("foodsCount");
    const ordersList = document.querySelector(".orders-list");
    const userHeader = document.getElementById("userHeader");
    const clientId = document.getElementById("clientId");

    let customers = [];
    let orders = [];

    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const username = usernameInput.value.trim();
        const telephone = telephoneInput.value.trim();

        if (username && telephone) {
            const newCustomer = { id: customers.length + 1, name: username, phone: telephone };
            customers.push(newCustomer);
            renderCustomers();
            usernameInput.value = "";
            telephoneInput.value = "";
        }
    });

    function renderCustomers() {
        customerList.innerHTML = "";
        customers.forEach(customer => {
            const li = document.createElement("li");
            li.classList.add("customer-item");
            li.innerHTML = `
                <span class="customer-name">${customer.name}</span>
                <a class="customer-phone" href="tel:${customer.phone}">${customer.phone}</a>
            `;
            li.addEventListener("click", function () {
                selectCustomer(customer);
            });
            customerList.appendChild(li);
        });
    }

    function selectCustomer(customer) {
        userHeader.textContent = customer.name;
        clientId.textContent = customer.id;
        renderOrders(customer.id);
    }
    foodsForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const selectedFood = foodsSelect.options[foodsSelect.selectedIndex].text;
        const count = parseInt(foodsCount.value);

        if (selectedFood && count > 0) {
            const customerId = parseInt(clientId.textContent);
            const newOrder = { customerId, name: selectedFood, count };
            orders.push(newOrder);
            renderOrders(customerId);
            foodsCount.value = "";
        }
    });

    function renderOrders(customerId) {
        ordersList.innerHTML = "";
        const filteredOrders = orders.filter(order => order.customerId === customerId);
        filteredOrders.forEach(order => {
            const li = document.createElement("li");
            li.classList.add("order-item");
            li.innerHTML = `
                <img src="./img/${order.name.toLowerCase()}.jpeg">
                <div>
                    <span class="order-name">${order.name}</span>
                    <span class="order-count">${order.count}</span>
                </div>
            `;
            ordersList.appendChild(li);
        });
    }
});