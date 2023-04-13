const getResponse = (responseObj) => ({
  status: typeof responseObj.status === "undefined" ? true : responseObj.status,
  code: typeof responseObj.code === "undefined" ? 200 : responseObj.code,
  message:
    typeof responseObj.message === "undefined"
      ? "Success"
      : responseObj.message,
  data: typeof responseObj.data === "undefined" ? [] : responseObj.data,
});

export default getResponse;
