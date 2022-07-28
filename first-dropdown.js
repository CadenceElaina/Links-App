//First Dropdown 
const optionMenu = document.querySelector(".select-menu1"),
    selectBtn = optionMenu.querySelector(".select-btn1"),
    options = optionMenu.querySelectorAll(".option1"),
    sBtn_text = optionMenu.querySelector(".sBtn-text1");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text1").innerText;
        sBtn_text.innerText = selectedOption;

        optionMenu.classList.remove("active");
    });
});
