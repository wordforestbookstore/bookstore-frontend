export const API_URL = 'http://192.168.1.106:8080';

export const KindList = [
  {
    text: '管理', value: 'Management'
  },
  {
    text: '科幻', value: 'Fiction'
  },
  {
    text: '工程', value: 'Engineering'
  },
  {
    text: '编程', value: 'Programming'
  },
  {
    text: '美术和文学', value: 'Arts & Literature'
  }
];

let KindMap = {};

for (let item of KindList) {
  KindMap[item.value] = item.text;
}

export {
  KindMap
};