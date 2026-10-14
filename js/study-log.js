const logList = document.querySelector(".log-list");
const logTotal = document.querySelector(".log-total");
// 从localStorage获得JAON数据，并且用parse转换成JS数组。如果没有数据，默认是空数组
let records = JSON.parse(localStorage.getItem("records")) || [];
const logForm = document.querySelector(".log-form");
const logContent = document.querySelector("#log-content");
const logMinutes = document.querySelector("#log-minutes");

// 把records转化成JSON，并且存储在localStorage的函数
function saveRecords() {
  localStorage.setItem("records", JSON.stringify(records));
}

// 渲染页面的函数
function render() {
  const items = records.map((record) => {
    const li = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = record.content + " - " + record.minutes + " 分钟";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "删除";
    deleteBtn.className = "delete-btn";
    deleteBtn.dataset.id = record.id;

    li.appendChild(text);
    li.appendChild(deleteBtn);

    return li;
  });

  // console.log(items);
  // replaceChildren会把页面之前的li都清除掉，然后替换成新的
  logList.replaceChildren(...items);

  const total = records.reduce((sum, record) => sum + record.minutes, 0);
  logTotal.textContent = "累计学习：" + total + "分钟";
}

export function initStudyLog() {
  render();
  // 打卡记录的表单事件监听
  logForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // 创建新的记录的数据对象
    const newRecord = {
      id: Date.now(),
      content: logContent.value,
      minutes: Number(logMinutes.value),
    };
    // 添加到records数组中
    records.push(newRecord);
    // 转化成JSON，存入到localStorage
    saveRecords();
    // 重新渲染(画)一次页面
    render();
    // 清空记录表单输入框的内容
    logForm.reset();
  });

  // 事件委托和事件冒泡：事件是会一层一层的向上传递的，
  // 删除按钮的点击监听，是绑定在ul这个父元素上面，因为老的li每次渲染都会被删掉
  // 新的li是JS生成的
  logList.addEventListener("click", (event) => {
    // event.target 是触发事件的元素，这里就是删除按钮，检查是不是符合条件
    if (event.target.classList.contains("delete-btn")) {
      const id = Number(event.target.dataset.id);
      records = records.filter((record) => record.id !== id);
      saveRecords();
      render();
    }
  });
}
