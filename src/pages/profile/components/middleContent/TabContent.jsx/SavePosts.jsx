import { Link } from "react-router-dom";
import { useGetSavePostQuery } from "../../../../../redux/features/post/postApi";


const SavePosts = () => {
  const { data } = useGetSavePostQuery()
  console.log('allllll savepost', data);
  return (
    <div>
      <div >

        {data && data.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-1 grid-cols-1 mx-auto p-2">
            {data.map((savepost) => (
              savepost.postContent && (
                <div key={savepost._id}>
                  <Link to="/savePost">
                    <div>
                      <img className="w-52 h-52 bg-white cursor-pointer" src={savepost.postContent} alt="" />
                    </div>
                  </Link>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="w-full bg-white rounded-md h-64">
            <p className="font-bold text-lg text-center pt-16 "> No Save Post Found!!</p>
          </div>

        )}
      </div>    </div>
  );
};

export default SavePosts;