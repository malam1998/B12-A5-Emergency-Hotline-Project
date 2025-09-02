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

//copy function
document.addEventListener("DOMContentLoaded", () => {
  // find all copy buttons
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      // find the nearest card container (works if there are many cards)
      const card = btn.closest(".card");
      if (!card) return;

      // find the element that contains the number
      const numberEl = card.querySelector(".card-number");
      if (!numberEl) return;

      // read and trim the text
      let textToCopy = numberEl.innerText.trim();

      // Optional: if you only want digits, uncomment the next line:
      // textToCopy = (textToCopy.match(/\d+/) || [textToCopy])[0];

      try {
        // Modern clipboard API (works on HTTPS or localhost)
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for older browsers
          const textarea = document.createElement("textarea");
          textarea.value = textToCopy;
          textarea.style.position = "fixed"; // avoid scrolling to bottom
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        // show quick feedback on the button (restore original after 1.5s)
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-regular fa-check"></i> Copied';
        btn.setAttribute("aria-live", "polite"); // accessibility hint
        setTimeout(() => {
          btn.innerHTML = originalHTML;
        }, 1500);
      } catch (err) {
        console.error("Copy failed", err);
        alert(
          "Could not copy automatically — please select the number and copy manually: " +
            textToCopy
        );
      }
    });
  });
});

// copy count
const copyBtns = document.getElementsByClassName("copy-btn");
let copyCount = 0;

for (const copyBtn of copyBtns) {
  copyBtn.addEventListener("click", function () {
    copyCount++;
    const copyValue = parseInt(getElement("copy-value").innerText);
    console.log(copyValue);

    getElement("copy-value").innerText = copyCount;
  });
}
