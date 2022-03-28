const urlParse = (href: string): Record<string, any> => {
  let name: string, value: any;
  let str: string = href; //取得整个地址栏
  let num: number = str.indexOf('?');
  str = str.substr(num + 1); //取得所有参数
  const arr: Array<string> = str.split('&'); //各个参数放到数组里
  const json: Record<string, any> = {};
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=');
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      json[name] = value;
    }
  }
  return json;
};

export default urlParse;
