import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const UpdatePost = () => {
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        let { data } = await axios.get("/api/v1/posts/" + id);
        console.log(data);
        setContent(data.post.content);
        setTitle(data.post.title);
        setPreview(data.post.image);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
    getPost();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
      console.log(preview);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    setLoading(true);
    try {
      const { data } = await axios.patch("/api/v1/posts/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("post updated success!");
      navigate("/dashboard");
      setTitle("");
      setContent("");
      setImage(null);
      setPreview("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  return (
    <div>
      <div className="">
        <section className="bg-white mb-4">
          <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex items-center justify-center mt-6">
                <span className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-slate-800">
                  update post
                </span>
              </div>

              <div className="relative flex items-center mt-8">
                <input
                  type="text"
                  id="title"
                  className="block w-full py-3 text-slate-900 border bg-white rounded-lg px-5 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
                  placeholder="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>

              <div className="relative flex items-center mt-6">
                <textarea
                  type="text"
                  id="content"
                  className="block w-full h-48 py-3 text-slate-900 border bg-white rounded-lg px-5 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
                  placeholder="description"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                />
              </div>

              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none py-3 px-4"
                id="image"
                type="file"
                onChange={handleImageChange}
              />
              {preview && (
                <img src={preview} alt="preview" className=" mt-2 w-40 h-40" />
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  className="block w-full py-3 bg-slate-900 border text-white rounded-lg px-11 focus:outline-none focus:ring focus:ring-opacity-10 focus:ring-slate-950"
                >
                  {loading ? "updating..." : "update"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
