// ---- VERIFICATION URL ----- //
// =========================== //

// On récupère l'URL et on vérifie qu'elle a bien le paramètre id
function checkUrl() {
    let url = new URL(window.location.href);

    if (url.search.includes('id')) {
        return itemId = url.searchParams.get('id');
    }
    else {
        return window.confirm("Désolé, vous n'avez pas sélectionné d'article");
    }
}

checkUrl();

document.getElementById("orderId").innerHTML = itemId;