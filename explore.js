import http from 'k6/http';

const BASE_URL = 'https://quickpizza.grafana.com';
const PARAMS = { headers: { Authorization: 'token abcdef0123456789' } };

export default function () {
 const toppings = http.get(`${BASE_URL}/api/ingredients/topping`, PARAMS);
 console.log(toppings.body);
 const tools = http.get(`${BASE_URL}/api/tools`, PARAMS);
 console.log(tools.body);
}

/*
INFO[0001] {"ingredients":[{"ID":9,"name":"Pepperoni","caloriesPerSlice":100,"vegetarian":false},{"ID":10,"name":"Mushrooms","caloriesPerSlice":50,"vegetarian":true},{"ID":11,"name":"Onions","caloriesPerSlice":50,"vegetarian":true},{"ID":12,"name":"Sausage","caloriesPerSlice":200,"vegetarian":false},{"ID":13,"name":"Bacon","caloriesPerSlice":250,"vegetarian":false},{"ID":14,"name":"Extra cheese","caloriesPerSlice":100,"vegetarian":true},{"ID":15,"name":"Black olives","caloriesPerSlice":50,"vegetarian":true},{"ID":16,"name":"Green peppers","caloriesPerSlice":50,"vegetarian":true},{"ID":17,"name":"Pineapple","caloriesPerSlice":75,"vegetarian":true},{"ID":18,"name":"Spinach","caloriesPerSlice":25,"vegetarian":true},{"ID":19,"name":"Garlic","caloriesPerSlice":25,"vegetarian":true},{"ID":20,"name":"Jalapenos","caloriesPerSlice":50,"vegetarian":true},{"ID":21,"name":"Roasted red peppers","caloriesPerSlice":50,"vegetarian":true},{"ID":22,"name":"Feta cheese","caloriesPerSlice":100,"vegetarian":true},{"ID":23,"name":"Prosciutto","caloriesPerSlice":100,"vegetarian":false},{"ID":24,"name":"Ricotta cheese","caloriesPerSlice":100,"vegetarian":true},{"ID":25,"name":"Salami","caloriesPerSlice":100,"vegetarian":false},{"ID":26,"name":"Zucchini","caloriesPerSlice":50,"vegetarian":true},{"ID":27,"name":"Buffalo mozzarella","caloriesPerSlice":150,"vegetarian":true},{"ID":28,"name":"Eggplant","caloriesPerSlice":50,"vegetarian":true},{"ID":29,"name":"Kalamata olives","caloriesPerSlice":50,"vegetarian":true},{"ID":30,"name":"Parmesan cheese","caloriesPerSlice":100,"vegetarian":true},{"ID":31,"name":"Shrimp","caloriesPerSlice":100,"vegetarian":false},{"ID":32,"name":"Chicken","caloriesPerSlice":100,"vegetarian":false},{"ID":33,"name":"Beef","caloriesPerSlice":100,"vegetarian":false},{"ID":34,"name":"Ham","caloriesPerSlice":100,"vegetarian":false},{"ID":35,"name":"Asparagus","caloriesPerSlice":50,"vegetarian":true},{"ID":36,"name":"Broccoli","caloriesPerSlice":50,"vegetarian":true},{"ID":37,"name":"Caramelized onions","caloriesPerSlice":50,"vegetarian":true},{"ID":38,"name":"Cherry tomatoes","caloriesPerSlice":50,"vegetarian":true},{"ID":39,"name":"Fresh basil","caloriesPerSlice":25,"vegetarian":true},{"ID":40,"name":"Fresh oregano","caloriesPerSlice":25,"vegetarian":true}]}  source=console
INFO[0001] {"tools":["Knife","Pizza cutter","Scissors"]}  source=console
*/