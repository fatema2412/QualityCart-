document.getElementById("trackOrderForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const orderId = document.getElementById("orderId").value;
    const email = document.getElementById("email").value;
    alert(`Tracking order ${orderId} for email ${email}.`);
});

document.getElementById("returnForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const returnOrderId = document.getElementById("returnOrderId").value;
    const reason = document.getElementById("reason").value;
    const returnReason = document.getElementById("returnReason").value;
    alert(`Return request submitted for order ${returnOrderId} with reason: ${reason} (${returnReason}).`);
});
