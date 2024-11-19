import { useEditorContext } from "../context/Editor.context";

const Tag = ({ tag, tagIndex }) => {
  let {
    blog,
    blog: { tags },
    setBlog,
  } = useEditorContext();

  const handleTagDelete = () => {
    tags = tags.filter((t) => t !== tag);
    setBlog({ ...blog, tags: tags });
  };

  const handleTagEdit = (event) => {
    if (event.keyCode === 13 || event.keyCode === 188) {
      event.preventDefault();

      let tag = event.target.innerText;

      tags[tagIndex] = tag;
      setBlog({ ...blog, tags: tags });
      //   console.log(tags);

      event.target.setAttribute("contentEditable", "false");
    }
  };

  const addEditable = (event) => {
    event.target.setAttribute("contentEditable", "true");
    event.target.focus();
  };

  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-8">
      <p
        className="outline-none"
        contentEditable="true"
        onKeyDown={handleTagEdit}
        onClick={addEditable}
      >
        {tag}
      </p>
      <button
        className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2  "
        onClick={handleTagDelete}
      >
        <i className="fi fi-br-cross text-sm pointer-events-none "></i>
      </button>
    </div>
  );
};

export { Tag };
