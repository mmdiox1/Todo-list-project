import { createContext } from "react";
import { useState, useEffect } from "react";

export const Todocontext = createContext();

export function TodoProvider({ children }) {
  const [task, settask] = useState([]);
  const [tasktitle, settasktitle] = useState("");
  const [taskdescription, settaskdescription] = useState(""); // توضیحات تسک
  const [isEditing, setIsEditing] = useState(false); // آیا پاپ‌آپ باز هست یا نه
  const [editingTaskId, setEditingTaskId] = useState(null); // آی‌دی تسکی که ویرایش می‌کنیم
  const [editingTitle, setEditingTitle] = useState(""); // متن جدید برای ویرایش
  const [filter, setfilter] = useState("all"); // فیلتر کردن تسک ها

  const filtertask = task.filter((task) => {
    if (filter === "complete") return task.complete === true;
    if (filter === "incomplete") return task.complete === false;
    return true;
  });

  useEffect(() => {
    const savedtask = localStorage.getItem("tasks");
    if (savedtask) {
      settask(JSON.parse(savedtask));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  // اضافه کردن تسک
  function Addtask() {
    if (tasktitle.trim() === "") {
      alert("لطفا عنوان تسک را وارد کنید ");
      return;
    } else if (task.some((t) => t.title === tasktitle.trim())) {
      alert("تسک با همین اسم وجود دارد...");
      return;
    }
    settask((pervitem) => [
      ...pervitem,
      {
        id: Date.now(),
        title: tasktitle,
        complete: false,
        description: taskdescription,
      },
    ]);
    settasktitle("");
    settaskdescription("");
    task.complete = false;
  }
  // انجام داده شده/داده نشده
  function Setcomplete(id) {
    settask((pervitem) =>
      pervitem.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
  }
  // حذف تسک
  function Deletetask(id) {
    settask((pervitem) => pervitem.filter((item) => item.id !== id));
  }
  // صفحه ادیت و دریافت ای دی و تایتل تسک
  function Edittask(task) {
    setIsEditing(!isEditing);
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  }
  // اپدیت تسک ادیت شده
  function Updateedittask(id) {
    if (editingTitle.trim() === "") {
      alert("ویرایش نباید خالی باشد...");
      return;
    }
    settask((pervtask) =>
      pervtask.map((task) =>
        task.id === id ? { ...task, title: editingTitle } : task
      )
    );
    setEditingTaskId(null);
    settasktitle("");
    setIsEditing(!isEditing);
  }

  return (
    <Todocontext.Provider
      value={{
        task,
        settask,
        tasktitle,
        taskdescription,
        settaskdescription,
        settasktitle,
        isEditing,
        setIsEditing,
        editingTaskId,
        setEditingTaskId,
        editingTitle,
        setEditingTitle,
        filter,
        setfilter,
        filtertask,
        Addtask,
        Setcomplete,
        Deletetask,
        Edittask,
        Updateedittask,
      }}
    >
      {children}
    </Todocontext.Provider>
  );
}
