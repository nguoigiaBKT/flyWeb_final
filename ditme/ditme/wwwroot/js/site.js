document.addEventListener("DOMContentLoaded", function () {
    const oneWay = document.getElementById("one-way");
    const roundWay = document.getElementById("round-way");
    const checkOutGroup = document.getElementById("check-out-group");
    

    oneWay.addEventListener("change", function () {
        if (oneWay.checked) {
            checkOutGroup.classList.add("hidden");
        }
    });

    roundWay.addEventListener("change", function () {
        if (roundWay.checked) {
            checkOutGroup.classList.remove("hidden");
        }
    });

    // Kiểm tra trạng thái ban đầu
    if (oneWay.checked) {
        checkOutGroup.classList.add("hidden");
    }
});
