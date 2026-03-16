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
        <td>${c.firstName} ${c.lastName}</td> <td>${c.accountNumber}</td>
        <td>${c.balance}</td>
    </tr>
    `;
    });
}



// TRANSFERIR DINERO
const form = document.getElementById("transferForm");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            senderAccountNumber: document.getElementById("fromAccount").value,
            receiverAccountNumber: document.getElementById("toAccount").value,
            amount: parseFloat(document.getElementById("amount").value)
        };

        try {
            const response = await fetch(`${API}/transactions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            
            if (response.ok) {
                document.getElementById("result").innerText = "✅ ¡Transferencia realizada con éxito!";
                document.getElementById("result").style.color = "green";

                form.reset(); 
            } else {
                const errorMsg = await response.text();
                document.getElementById("result").innerText = "❌ Error: " + errorMsg;
                document.getElementById("result").style.color = "red";
            }
        } catch (error) {
            document.getElementById("result").innerText = "❌ No se pudo conectar con el servidor.";
        }
    });
}


// HISTORIAL TRANSACCIONES
async function loadTransactions(){
    const account = document.getElementById("accountNumber").value;

    const response = await fetch(`${API}/transactions/${account}`);
    const transactions = await response.json();

    const table = document.querySelector("#transactionsTable tbody");
    table.innerHTML = "";

    transactions.forEach(t => {
        table.innerHTML += `
        <tr>
            <td>${t.id}</td>
            <td>${t.senderAccountNumber}</td>   <td>${t.receiverAccountNumber}</td> <td>${t.amount}</td>
            <td>${t.timestamp}</td>             </tr>
        `;
    });


}