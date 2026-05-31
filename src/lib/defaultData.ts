import type { ResumeData } from '@/types/resume';

export const defaultResumeData: ResumeData = {
  basicInfo: {
    avatar: '',
    name: '灵感菇',
    phone: '15372232131',
    email: '3072323235@qq.com',
    target: '高级产品经理',
    city: '杭州',
  },
  advantages: [
    {
      id: 'adv-1',
      title: '产品规划与策略',
      description: '熟练掌握产品管理的核心技能，如需求分析、产品设计和市场策略，能够独立完成产品全生命周期管理。',
    },
    {
      id: 'adv-2',
      title: '数据分析与决策',
      description: '擅长运用数据分析工具驱动产品决策，熟练使用 SQL、Python 进行数据处理和可视化。',
    },
    {
      id: 'adv-3',
      title: '跨部门协作',
      description: '具备优秀的沟通协调能力，能够有效推动研发、设计、运营等多部门协作，确保项目按时交付。',
    },
  ],
  workExperience: [
    {
      id: 'we-1',
      company: '灵感菇科技',
      department: '产品部',
      position: '高级产品经理',
      location: '杭州',
      startDate: '2023-02',
      endDate: '至今',
      description: [
        '负责公司核心产品的整体规划和生命周期管理，确保产品的市场竞争力',
        '带领 5 人产品团队，完成 3 个从 0 到 1 的产品孵化，用户增长 200%',
        '建立产品数据指标体系，推动数据驱动的产品迭代流程',
      ],
    },
    {
      id: 'we-2',
      company: '创新互联',
      department: '产品中心',
      position: '产品经理',
      location: '杭州',
      startDate: '2021-07',
      endDate: '2023-01',
      description: [
        '负责电商产品线的产品设计和需求管理，主导完成 2 次大型版本迭代',
        '通过用户研究和数据分析，优化核心转化流程，转化率提升 35%',
        '协调设计、研发、测试资源，保障项目按时高质量交付',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: '智能推荐系统',
      location: '杭州',
      link: 'https://www.example.cn',
      role: '产品负责人',
      startDate: '2023-07',
      endDate: '2023-12',
      description: [
        '负责移动应用产品的规划和设计，采用 Aha! 和 JIRA，吸引了超过 500 万的活跃用户',
        '设计个性化推荐算法策略，用户日均使用时长提升 40%',
      ],
    },
    {
      id: 'proj-2',
      name: '企业协作平台',
      location: '杭州',
      link: '',
      role: '核心产品成员',
      startDate: '2022-03',
      endDate: '2022-09',
      description: [
        '在团队中推进了产品的迭代升级，使用 Scrum 和 Agile 方法，确保了产品的持续优化',
        '主导需求分析和原型设计，产出 PRD 文档 50+ 份',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: '灵感菇大学',
      major: '计算机科学与技术',
      degree: '本科',
      location: '杭州',
      startDate: '2017-09',
      endDate: '2021-06',
      courses: ['产品管理基础（87分）', '市场分析', '用户研究', '敏捷产品开发', '产品策略'],
      certificates: ['Certified Scrum Product Owner', '产品经理专家认证'],
    },
  ],
  moduleOrder: [
    { key: 'basicInfo', name: '基本信息', visible: true, pageBreakBefore: false },
    { key: 'advantages', name: '核心优势', visible: true, pageBreakBefore: false },
    { key: 'workExperience', name: '工作经历', visible: true, pageBreakBefore: false },
    { key: 'projects', name: '项目经历', visible: true, pageBreakBefore: false },
    { key: 'education', name: '教育经历', visible: true, pageBreakBefore: false },
  ],
};
