const heartbtns = document.getElementsByClassName("heart-icon");
let heartCount = 0;

callHistory = [];
// get element by ID function
function getElement(id) {
  const element = document.getElementById(id);
  return element;
}

// heart count event
for (const btns of heartbtns) {
  btns.addEventListener("click", function () {
    const heart = getElement("heart-no");
    heartCount++;
    heart.innerText = heartCount;
    btns.classList.add("hover:bg-red-500");
  });
}

// calling section
const callIcons = document.getElementsByClassName("call-btn");
for (const callIcon of callIcons) {
  callIcon.addEventListener("click", function () {
    const card = callIcon.closest(".card");
    const title = card.querySelector(".card-title").innerText;
    const number = card.querySelector(".card-number").innerText;

    const coins = parseInt(document.getElementById("coin-value").innerText);
    const totalcoin = coins - 20;

    if (totalcoin < 0) {
      alert("Not enough coins");
      return;
    }
    document.getElementById("coin-value").innerText = totalcoin;

    alert(`📞 Calling ${title} ${number}`);

    const history = {
      name: title,
      number: number,
      date: new Date().toLocaleString(),
    };

    callHistory.push(history);
    // console.log(callHistory);

    // call history
    const historySection = getElement("call-history");
    historySection.innerText = "";
    for (const data of callHistory) {
      const div = document.createElement("div");
      div.innerHTML = `<div class="bg-[#fafafa] flex justify-between items-center p-2 my-3 rounded-lg">
                    <div>
                        <h1 class="text-[18px] font-[600]">${data.name}</h1>
                        <h2 class="text-gray-500">${data.number}</h2>
                    </div>
                    <div>
                        <p class="text-[18px] font-[600]">${data.date}</p>
                    </div>
                </div>`;
      historySection.appendChild(div);
    }
  });
}

// clear functionality
const clearbtn = getElement("clear-button");
clearbtn.addEventListener("click", function () {
  const historySection = getElement("call-history");

  if (historySection.innerHTML === "") {
    alert("Invalid request");
    return;
  } else {
    callHistory = [];
    historySection.innerHTML = "";
  }
});
