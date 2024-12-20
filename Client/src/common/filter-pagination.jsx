import axios from "axios";

export const FilterPaginationData = async ({
  old_arr,
  new_arr,
  page,
  countRoute,
  data_to_send,
}) => {
  let obj;
  if (old_arr != null) {
    obj = { results: [...old_arr.results, ...new_arr], page: page };
  } else {
    await axios
      .post(import.meta.env.VITE_SERVER_URL + countRoute, data_to_send)
      .then(({ data: { totalDocs } }) => {
        obj = { results: new_arr, page: 1, totalDocs };
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return obj;
};
