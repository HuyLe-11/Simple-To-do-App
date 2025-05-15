const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const list = document.getElementById("todo-list");
const timeInput_end = document.getElementById("todo-time_end"); 
const timeInput_start = document.getElementById("todo-time_start"); 

addButton.addEventListener ("click", () => {
    const text = input.value.trim();
    const time_start = timeInput_start.value.trim(); 
    const time_end = timeInput_end.value.trim(); 

    if (text === "") return;

    const li = document.createElement("li");
    
    const span = document.createElement("span");

    span.innerHTML = text.replace(/\n/g, "<br>");
    
    const completebtn = document.createElement("button");
    completebtn.textContent = "Done";

    completebtn.onclick = () => {
        const toggle = li.classList.toggle("completed");
        if (toggle == true){
            completebtn.textContent = "Undo";
        }
        else {
            completebtn.textContent = "Done";
        }
    }

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";

    deletebtn.onclick = () => {
        list.removeChild(li);
    }

    const deadline = document.createElement("small");
    deadline.style.marginLeft = "10px";
    deadline.style.color = "gray";
    if (time_end) {
      deadline.textContent = `(End: ${time_end})`;
    }
    const start = document.createElement("small");
    start.style.marginLeft = "10px";
    start.style.color = "gray";
    if (time_start) {
      start.textContent = `(Start: ${time_start})`;
    }

    let isPriority = false;

    const starBtn = document.createElement("button");
    starBtn.textContent = "☆"; // sao rỗng
    starBtn.style.marginRight = "8px";

    starBtn.onclick = () => {
    isPriority = !isPriority;
    starBtn.textContent = isPriority ? "⭐" : "☆";
    li.classList.toggle("priority", isPriority);
    };
    
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";

    const btn_group = document.createElement("div");
    
    btn_group.appendChild(completebtn);
    btn_group.appendChild(deletebtn);
    btn_group.appendChild(starBtn);
    btn_group.appendChild(editBtn);

    const taskGroup = document.createElement("div");
    taskGroup.style.display = "flex";
    taskGroup.style.flexDirection = "column";
    taskGroup.style.alignItems = "flex-start";
    taskGroup.appendChild(span);
    if (time_start) taskGroup.appendChild(start); 
    if (time_end) taskGroup.appendChild(deadline); 


    editBtn.onclick = () => {
        const currenttext = span.innerText.replace(/\n/g, '');
        const textarea = document.createElement("textarea");
        textarea.textContent = currenttext;

        textarea.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey){
                console.log('ok');
                e.preventDefault();
                const newText = textarea.value.trim();
                if (newText === ""){
                    list.removeChild(li);
                }
                else {
                span.innerHTML = newText.replace(/\n/g, "<br>");
                taskGroup.replaceChild(span, textarea);
                }
            }
        });

        //Switch span to textarea
        taskGroup.replaceChild(textarea, span);
        textarea.focus();
      };

  
    li.style.justifyContent = "space-between";
    li.appendChild(taskGroup);
    li.appendChild(btn_group);
  
    list.appendChild(li);
    input.value = "";
    timeInput_end.value = "";
    timeInput_start.value = "";

});
