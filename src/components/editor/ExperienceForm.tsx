import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { WorkExperience, Project, Education } from '@/types/resume';
import DescriptionEditor from './DescriptionEditor';

type ExperienceType = 'workExperience' | 'projects' | 'education';
type AnyExperience = WorkExperience | Project | Education;

interface ExperienceFormProps {
  type: ExperienceType;
}

const config = {
  workExperience: {
    label: '工作经历',
    max: 5,
    nameField: 'company',
    nameLabel: '公司名',
    namePlaceholder: '公司名称',
    subField: 'department',
    subLabel: '部门',
    subPlaceholder: '部门名称',
    posField: 'position',
    posLabel: '职位',
    posPlaceholder: '担任职位',
  },
  projects: {
    label: '项目经历',
    max: 5,
    nameField: 'name',
    nameLabel: '项目名',
    namePlaceholder: '项目名称',
    subField: 'link',
    subLabel: '项目链接',
    subPlaceholder: 'https://...（可选）',
    posField: 'role',
    posLabel: '担任角色',
    posPlaceholder: '如：产品负责人',
  },
  education: {
    label: '教育经历',
    max: 3,
    nameField: 'school',
    nameLabel: '学校',
    namePlaceholder: '学校名称',
    subField: 'major',
    subLabel: '专业',
    subPlaceholder: '所学专业',
    posField: 'degree',
    posLabel: '学历',
    posPlaceholder: '如：本科',
  },
};

export default function ExperienceForm({ type }: ExperienceFormProps) {
  const { data, setWorkExperience, setProjects, setEducation } = useResume();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const c = config[type];

  const experiences: AnyExperience[] =
    type === 'workExperience' ? data.workExperience :
    type === 'projects' ? data.projects :
    data.education;

  const setter = (items: AnyExperience[]) => {
    if (type === 'workExperience') setWorkExperience(items as WorkExperience[]);
    else if (type === 'projects') setProjects(items as Project[]);
    else setEducation(items as Education[]);
  };

  const addExperience = () => {
    if (experiences.length >= c.max) return;
    let newItem: AnyExperience;
    const id = `${type}-${Date.now()}`;
    if (type === 'workExperience') {
      newItem = { id, company: '', department: '', position: '', location: '', startDate: '', endDate: '', description: [''] };
    } else if (type === 'projects') {
      newItem = { id, name: '', location: '', link: '', role: '', startDate: '', endDate: '', description: [''] };
    } else {
      newItem = { id, school: '', major: '', degree: '', location: '', startDate: '', endDate: '', courses: [], certificates: [] };
    }
    setter([...experiences, newItem]);
    setCollapsed(prev => ({ ...prev, [newItem.id]: false }));
  };

  const updateExperience = (index: number, field: string, value: unknown) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value } as AnyExperience;
    setter(updated);
  };

  const removeExperience = (index: number) => {
    setter(experiences.filter((_, i) => i !== index));
  };

  const toggleCollapse = (id: string) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getName = (exp: AnyExperience) => {
    if (type === 'workExperience') return (exp as WorkExperience).company;
    if (type === 'projects') return (exp as Project).name;
    return (exp as Education).school;
  };

  const getSubValue = (exp: AnyExperience) => {
    if (type === 'workExperience') return (exp as WorkExperience).department;
    if (type === 'projects') return (exp as Project).link;
    return (exp as Education).major;
  };

  const getPosValue = (exp: AnyExperience) => {
    if (type === 'workExperience') return (exp as WorkExperience).position;
    if (type === 'projects') return (exp as Project).role;
    return (exp as Education).degree;
  };

  const getDateRange = (exp: AnyExperience) => {
    const s = exp.startDate || '';
    const e = exp.endDate || '';
    if (!s && !e) return '';
    return `${s} ~ ${e || '至今'}`;
  };

  const isEducation = type === 'education';

  return (
    <div className="space-y-4">
      <div className="text-[10px] text-[#555] font-mono uppercase tracking-wider">
        {c.label} ({experiences.length}/{c.max})
      </div>

      <div className="space-y-2">
        {experiences.map((exp, index) => {
          const isCollapsed = collapsed[exp.id];
          const name = getName(exp);

          return (
            <div
              key={exp.id}
              className="bg-[#111111] border border-[#2a2a2a] rounded-md overflow-hidden"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[#141414] transition-colors"
                onClick={() => toggleCollapse(exp.id)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] text-[#555] font-mono shrink-0">#{index + 1}</span>
                  <span className="text-xs text-[#f0f0f0] truncate">
                    {name || `未命名${c.label}`}
                  </span>
                  <span className="text-[10px] text-[#555] truncate">{getDateRange(exp)}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExperience(index);
                    }}
                    className="p-1 rounded hover:bg-[#ff4444]/20 hover:text-[#ff4444] text-[#555] transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  {isCollapsed ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#555]" />
                  ) : (
                    <ChevronUp className="w-3.5 h-3.5 text-[#555]" />
                  )}
                </div>
              </div>

              {/* Body */}
              {!isCollapsed && (
                <div className="px-3 pb-3 space-y-3 border-t border-[#1a1a1a]">
                  <div className="pt-3 grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-[#808080]">{c.nameLabel}</Label>
                      <Input
                        value={getName(exp)}
                        onChange={(e) => updateExperience(index, c.nameField, e.target.value)}
                        placeholder={c.namePlaceholder}
                        className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors placeholder:text-[#444]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-[#808080]">{c.posLabel}</Label>
                      <Input
                        value={getPosValue(exp)}
                        onChange={(e) => updateExperience(index, c.posField, e.target.value)}
                        placeholder={c.posPlaceholder}
                        className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors placeholder:text-[#444]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-[#808080]">{c.subLabel}</Label>
                    <Input
                      value={getSubValue(exp)}
                      onChange={(e) => updateExperience(index, c.subField, e.target.value)}
                      placeholder={c.subPlaceholder}
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors placeholder:text-[#444]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5 col-span-1">
                      <Label className="text-[11px] text-[#808080]">城市</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(index, 'location', e.target.value)}
                        placeholder="城市"
                        className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors placeholder:text-[#444]"
                      />
                    </div>
                    <div className="space-y-1.5 col-span-1">
                      <Label className="text-[11px] text-[#808080]">开始时间</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors [color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-1.5 col-span-1">
                      <Label className="text-[11px] text-[#808080]">结束时间</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                        placeholder="至今"
                        className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <DescriptionEditor
                    exp={exp}
                    index={index}
                    updateExperience={updateExperience}
                    isEducation={isEducation}
                  />

                  {/* Education-specific: courses & certificates */}
                  {isEducation && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-[11px] text-[#808080]">主修课程</Label>
                        {(((exp as Education).courses) || []).map((course: string, ci: number) => (
                          <div key={ci} className="flex gap-1.5">
                            <Input
                              value={course}
                              onChange={(e) => {
                                const courses = [...((exp as Education).courses || [])];
                                courses[ci] = e.target.value;
                                updateExperience(index, 'courses', courses);
                              }}
                              placeholder="课程名称"
                              className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-7 focus:border-white transition-colors flex-1 placeholder:text-[#444]"
                            />
                            <button
                              onClick={() => {
                                const courses = ((exp as Education).courses || []).filter((_: string, i: number) => i !== ci);
                                updateExperience(index, 'courses', courses);
                              }}
                              className="p-1 rounded hover:bg-[#ff4444]/20 hover:text-[#ff4444] text-[#555] transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const courses = [...((exp as Education).courses || []), ''];
                            updateExperience(index, 'courses', courses);
                          }}
                          className="border-[#2a2a2a] text-[#808080] hover:border-[#fff] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] text-xs h-7"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          添加课程
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[11px] text-[#808080]">获得证书</Label>
                        {(((exp as Education).certificates) || []).map((cert: string, ci: number) => (
                          <div key={ci} className="flex gap-1.5">
                            <Input
                              value={cert}
                              onChange={(e) => {
                                const certs = [...((exp as Education).certificates || [])];
                                certs[ci] = e.target.value;
                                updateExperience(index, 'certificates', certs);
                              }}
                              placeholder="证书名称"
                              className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-7 focus:border-white transition-colors flex-1 placeholder:text-[#444]"
                            />
                            <button
                              onClick={() => {
                                const certs = ((exp as Education).certificates || []).filter((_: string, i: number) => i !== ci);
                                updateExperience(index, 'certificates', certs);
                              }}
                              className="p-1 rounded hover:bg-[#ff4444]/20 hover:text-[#ff4444] text-[#555] transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const certs = [...((exp as Education).certificates || []), ''];
                            updateExperience(index, 'certificates', certs);
                          }}
                          className="border-[#2a2a2a] text-[#808080] hover:border-[#fff] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] text-xs h-7"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          添加证书
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {experiences.length < c.max && (
        <Button
          variant="outline"
          size="sm"
          onClick={addExperience}
          className="w-full border-[#2a2a2a] text-[#808080] hover:border-[#fff] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] text-xs h-8"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          添加{c.label}
        </Button>
      )}
    </div>
  );
}
