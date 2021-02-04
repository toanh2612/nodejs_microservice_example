export const fnCachedKey = (str) => {
  let str1 = str;
  str1 = str1.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str1 = str1.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str1 = str1.replace(/[ìíịỉĩ]/g, 'i');
  str1 = str1.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str1 = str1.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str1 = str1.replace(/[ỳýỵỷỹ]/g, 'y');
  str1 = str1.replace(/đ/g, 'd');
  str1 = str1.replace(/[:,]/g, '_');
  // eslint-disable-next-line no-useless-escape
  str1 = str1.replace(/[!@$%^*()+=<>?\/,.:' "&#\[\]{}~]/g, '');
  // str = str.replace(/-+-/g, " ");
  // str = str.replace(/^\-+|\-+$/g, "");
  str1 = str1.replace(/_$/g, '');

  return str1;
};