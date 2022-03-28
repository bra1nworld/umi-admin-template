// 使用 Mock
const Mock = require('mockjs');

const list: {
  id: string;
  packageName: string;
  name: string;
  work: string;
  operater: string;
  sign: string;
  jira: string;
  updatedAt: string;
}[] = [];
for (let i = 1; i < 43; i++) {
  list.push({
    id: i + '',
    packageName: `包名${i}`,
    name: `引用${i}`,
    work: `功能${i}`,
    operater: `员工${i}`,
    sign: `签名-${i}`,
    jira: `jira-${i}`,
    updatedAt: `2021-02-02 11:11:${i}`,
  });
}

export default {
  // 'GET /mock/api/goods/list': barData,

  'GET /api/singleData'(req: any, res: any) {
    const id = req.query.id;
    res.json({
      data: list[0],
    });
  },

  'GET /api/template'(req: any, res: any) {
    const { pagination, query } = req.query;
    const { current, pageSize } = JSON.parse(pagination);
    const data = list.slice((current - 1) * pageSize, current * pageSize);

    setTimeout(() => {
      res.json({
        items: data,
        current: current * 1,
        pageSize: pageSize * 1,
        total: list.length,
      });
    }, 1000);
  },

  'POST /api/template/add'(req: any, res: any) {
    const data = req.body;

    setTimeout(() => {
      const target = {
        id: String(list.length + 1),
        ...data,
      };
      list.push(target);
      res.json({
        result: 'success',
        item: target,
      });
    }, 1000);
  },

  'POST /api/template/update'(req: any, res: any) {
    const data = req.body;

    setTimeout(() => {
      let targetIndex = list.findIndex((item) => item.id === data.id);
      const target = list[targetIndex];

      const newTarget = {
        ...target,
        ...data,
      };
      list[targetIndex] = newTarget;

      res.json({
        result: 'success',
        item: target,
      });
    }, 1000);
  },

  'DELETE /api/template/delete'(req: any, res: any) {
    const data: string[] = req.body;
    setTimeout(() => {
      data.forEach((id) => {
        let targetIndex = list.findIndex((item) => item.id === id);
        list.splice(targetIndex, 1);
      });

      res.json({
        result: 'success',
      });
    }, 1000);
  },
};
