import { useEffect, useState } from "react";
import { useContext } from "react";
import { Todocontext } from "../../Contexts/TodoContext";

function TodoLayout() {
  const [windowswidth, setwindowswidth] = useState();
  useEffect(() => {
    function Windowshandler() {
      setwindowswidth(window.innerWidth);
      console.log("new with is:", windowswidth);
    }
    window.addEventListener("resize", Windowshandler);
  }, [windowswidth]);

  const {
    settask,
    tasktitle,
    settasktitle,
    isEditing,
    editingTaskId,
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
  } = useContext(Todocontext);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">
          لیست کارها
        </h1>
        {/* فیلتر تسک ها  */}
        <div className="mb-4 flex justify-center">
          <select
            value={filter}
            onChange={(e) => setfilter(e.target.value)}
            className="border border-purple-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800 font-bold shadow"
          >
            <option value="all">همه تسک‌ها</option>
            <option value="complete">تسک‌های انجام‌شده</option>
            <option value="incomplete">تسک‌های انجام‌نشده</option>
          </select>
        </div>
        {/* افزودن تسک جدید */}
        <div className="mb-4 flex flex-col items-center gap-2">
          {/* input و دکمه افزودن */}
          <div className="flex w-full">
            <input
              onChange={(e) => settasktitle(e.target.value)}
              value={tasktitle}
              type="text"
              placeholder="عنوان تسک جدید..."
              className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={Addtask}
              className="bg-purple-500 text-white px-4 py-2 rounded-r-lg hover:bg-purple-600 transition"
            >
              افزودن
            </button>
          </div>

          {/* دکمه حذف همه */}
          <button
            onClick={() => settask([])}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
          >
            حذف همه تسک‌ها
          </button>
        </div>

        <ul className="space-y-5 max-h-80 overflow-y-auto">
          {/* نمایش تسک های موجود... */}
          {filtertask.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded shadow"
            >
              <div className="flex items-center gap- max-w-70">
                <input
                  onChange={() => Setcomplete(item.id)}
                  checked={item.complete}
                  type="checkbox"
                  className="w-5 h-5 accent-purple-500"
                />
                <span
                  className={
                    item.complete
                      ? "break-words whitespace-pre-wrap line-through text-gray-400"
                      : ""
                  }
                >
                  {/* تایتل تسک اینجا */}
                  {item.title}
                </span>
                <span className="max-w-40 break-words whitespace-pre-wrap ml-10 font-light ">
                  {/* توضیحات تسک اینجا... */}
                  {item.description}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => Edittask(item)}
                  className="text-black font-bold hover:text-yellow-600"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => Deletetask(item.id)}
                  className="text-red-500 font-bold hover:text-red-600"
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* صفحه ویرایش */}
      {isEditing && (
        <div className="bg-gray-500/50 h-screen w-screen items-center absolute flex justify-center">
          <div className="  shadow-2xl bg-white/80 w-full max-w-md rounded-xl p-6-red-200">
            <h1 className="p-3 text-center text-2xl font-bold text-purple-800">
              ویرایش کار
            </h1>
            <div>
              <input
                className="w-100 m-5 p-2 border rounded text-right border-gray-400"
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                placeholder="...ویرایش کنید"
              />
            </div>
            <div className="text-right">
              <button
                onClick={() => Updateedittask(editingTaskId)}
                className="bg-purple-500 text-white p-2 m-5 rounded"
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoLayout;
