const message = document.querySelector("p");
const button = document.createElement("button");
button.type = "button";
button.textContent = "외부 스크립트 이벤트 실행";
button.addEventListener("click", function () {
    message.textContent = "외부 JavaScript 파일의 클릭 이벤트가 실행되었습니다.";
});
message.after(button);
