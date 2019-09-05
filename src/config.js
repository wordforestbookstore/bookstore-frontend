export const API_URL = 'http://49.235.51.43:8080';

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
  },
  {
    text: '哲学', value: 'Philosophy'
  },
  {
    text: '工具书', value: 'Reference Books'
  },
  {
    text: '人物传记', value: 'Biography'
  },
];

let KindMap = {};

for (let item of KindList) {
  KindMap[item.value] = item.text;
}

export {
  KindMap
};