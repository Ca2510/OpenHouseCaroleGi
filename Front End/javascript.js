const statuses = document.querySelectorAll(".status");

statuses.forEach((select, index) => {
    select.addEventListener("change", async (event) => {
        const status = event.target.value;
        if (status === "comprado") {
            const response = await fetch("http://localhost:3000/update-gift", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: index + 1, status }),
            });

            const result = await response.json();
            if (result.success) {
                alert("Presente marcado como comprado!");
            } else {
                alert(result.error || "Erro ao atualizar status.");
            }

            // Atualizar o estado do select
            select.disabled = true;
        }
    });
});

// Fetch e atualizar os status na inicialização
async function loadGifts() {
    const response = await fetch("http://localhost:3000/gifts");
    const gifts = await response.json();

    gifts.forEach((gift, index) => {
        const select = statuses[index];
        if (gift.status === "comprado") {
            select.value = "comprado";
            select.disabled = true;
        }
    });
}

loadGifts();