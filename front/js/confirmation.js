// ---- VERIFICATION URL ----- //
// =========================== //

// On récupère l'URL et on vérifie qu'elle a bien le paramètre id
function checkUrl() {
    let url = new URL(window.location.href);

    if (url.search.includes('orderId')) {
        return itemId = url.searchParams.get('orderId');
    }
    else {
        return window.confirm("Le numéro de commande n'as pas pu être généré");
    }
}

checkUrl();

document.getElementById("orderId").innerHTML = itemId;