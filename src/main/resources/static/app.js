const API = "http://localhost:8080/api";


// CONSULTAR CLIENTES
async function loadCustomers() {

    const response = await fetch(`${API}/customers`);
    const customers = await response.json();

    const table = document.querySelector("#customersTable tbody");
    table.innerHTML = "";

    customers.forEach(c => {

        table.innerHTML += `
        <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.accountNumber}</td>
        <td>${c.balance}</td>
        </tr>
        `;
    });
}



// TRANSFERIR DINERO
const form = document.getElementById("transferForm");

if(form){

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const data = {
        fromAccount: document.getElementById("fromAccount").value,
        toAccount: document.getElementById("toAccount").value,
        amount: document.getElementById("amount").value
    };

    const response = await fetch(`${API}/transactions`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.text();

    document.getElementById("result").innerText = result;

});
}



// HISTORIAL TRANSACCIONES
async function loadTransactions(){

    const account = document.getElementById("accountNumber").value;

    const response = await fetch(`${API}/transactions/${account}`);
    const transactions = await response.json();

    const table = document.querySelector("#transactionsTable tbody");
    table.innerHTML="";

    transactions.forEach(t => {

        table.innerHTML += `
        <tr>
        <td>${t.id}</td>
        <td>${t.fromAccount}</td>
        <td>${t.toAccount}</td>
        <td>${t.amount}</td>
        <td>${t.date}</td>
        </tr>
        `;

    });

}