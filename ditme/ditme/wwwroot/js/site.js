document.addEventListener("DOMContentLoaded", function () {
    let oneWay = document.getElementById("one-way");
    let roundWay = document.getElementById("round-way");
    let checkOutGroup = document.getElementById("check-out-group");

    function toggleCheckOut() {
        if (oneWay.checked) {
            checkOutGroup.style.display = "none";
        } else {
            checkOutGroup.style.display = "flex";
        }
    }

    oneWay.addEventListener("change", toggleCheckOut);
    roundWay.addEventListener("change", toggleCheckOut);

    toggleCheckOut(); // Ensure initial state
});
