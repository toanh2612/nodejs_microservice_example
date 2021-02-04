export default (data) => {
  let messages;
  try {
    messages = JSON.parse(data);
  } catch (e) {
    messages = {
      vi: data,
      en: data
    };
  }
  return messages;
};