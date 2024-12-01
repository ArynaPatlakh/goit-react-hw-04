import axios from "axios";

const my_ID = "g3B-X8MD6yzzEE4IAo3X8QlhE4spWX1lB7yFstX4Txk";

export const gallery = async ( query, page) =>  {
    const res = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=15&client_id=${my_ID}`
    );
    return res.data;
}
// setImages((prev) => [...prev, res.data]);
// console.log(res.data);
// gallary();
