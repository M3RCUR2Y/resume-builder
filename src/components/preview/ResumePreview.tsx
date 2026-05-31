import { useMemo } from 'react';
import { useResume } from '@/context/ResumeContext';
import { defaultResumeData } from '@/lib/defaultData';

export default function ResumePreview() {
  const { data } = useResume();
  const { basicInfo, advantages, workExperience, projects, education, moduleOrder } = data;

  const visibleModules = useMemo(
    () => moduleOrder.filter(m => m.visible),
    [moduleOrder]
  );

  return (
    <div className="w-full h-full overflow-auto bg-[#141414] flex items-start justify-center p-6">
      {/* A4 Page */}
      <div
        id="resume-preview-page"
        className="bg-white w-[210mm] min-h-[297mm] shadow-[0_0_40px_rgba(0,0,0,0.6),0_0_0_1px_#333] text-black"
        style={{ fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif" }}
      >
        <div className="px-[15mm] py-[20mm]">
          {visibleModules.map((module, idx) => {
            const section =
              (() => {
                switch (module.key) {
                  case 'basicInfo':
                    return <BasicInfoSection key={module.key} info={basicInfo} moduleName={module.name} />;
                  case 'advantages':
                    return <AdvantagesSection key={module.key} items={advantages} moduleName={module.name} />;
                  case 'workExperience':
                    return <WorkExperienceSection key={module.key} items={workExperience} moduleName={module.name} />;
                  case 'projects':
                    return <ProjectsSection key={module.key} items={projects} moduleName={module.name} />;
                  case 'education':
                    return <EducationSection key={module.key} items={education} moduleName={module.name} />;
                  default:
                    return null;
                }
              })();

            if (module.pageBreakBefore && idx > 0) {
              return (
                <div key={module.key}>
                  <div
                    data-page-break="true"
                    className="flex items-center gap-3 my-4"
                    style={{ breakBefore: 'page', pageBreakBefore: 'always' }}
                  >
                    <div className="flex-1 border-t border-dashed border-[#ccc]" />
                    <span className="text-[10px] text-[#999] shrink-0">分页</span>
                    <div className="flex-1 border-t border-dashed border-[#ccc]" />
                  </div>
                  {section}
                </div>
              );
            }
            return <div key={module.key}>{section}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Section: Basic Info ── */
function BasicInfoSection({ info }: { info: typeof defaultResumeData.basicInfo; moduleName: string }) {
  return (
    <div className="pb-5 mb-5 border-b border-[#eee]">
      <div className="flex items-start gap-5">
        {info.avatar && (
          <img
            src={info.avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#eee] shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-[28px] font-bold text-[#1a1a1a] tracking-tight leading-tight mb-2">
            {info.name || '姓名'}
          </h1>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-[#666]">
            {info.target && <span className="text-[#333] font-medium">{info.target}</span>}
            {info.target && (info.phone || info.email || info.city) && <span className="text-[#ccc]">|</span>}
            {info.phone && <span>{info.phone}</span>}
            {info.phone && info.email && <span className="text-[#ccc]">|</span>}
            {info.email && <span>{info.email}</span>}
            {(info.phone || info.email) && info.city && <span className="text-[#ccc]">|</span>}
            {info.city && <span>{info.city}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section: Advantages ── */
function AdvantagesSection({ items, moduleName }: { items: typeof defaultResumeData.advantages; moduleName: string }) {
  if (items.length === 0) return null;
  return (
    <div className="pb-5 mb-5">
      <SectionTitle title={moduleName} />
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i}>
            <div className="text-[14px] font-semibold text-[#1a1a1a] mb-1">{item.title}</div>
            <div className="text-[12px] text-[#555] leading-relaxed">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section: Work Experience ── */
function WorkExperienceSection({ items, moduleName }: { items: typeof defaultResumeData.workExperience; moduleName: string }) {
  if (items.length === 0) return null;
  return (
    <div className="pb-5 mb-5">
      <SectionTitle title={moduleName} />
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-[#1a1a1a]">{item.company}</div>
                <div className="text-[12px] text-[#666] mt-0.5">
                  {item.position}
                  {item.department && ` · ${item.department}`}
                  {item.location && ` · ${item.location}`}
                </div>
              </div>
              <div className="text-[12px] text-[#999] shrink-0">
                {formatDateRange(item.startDate, item.endDate)}
              </div>
            </div>
            {item.description.length > 0 && item.description[0] && (
              <ul className="mt-2 space-y-1">
                {item.description.map((desc, di) =>
                  desc ? (
                    <li key={di} className="text-[12px] text-[#555] leading-relaxed pl-3 relative">
                      <span className="absolute left-0 top-[5px] w-1 h-1 rounded-full bg-[#aaa]" />
                      {desc}
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section: Projects ── */
function ProjectsSection({ items, moduleName }: { items: typeof defaultResumeData.projects; moduleName: string }) {
  if (items.length === 0) return null;
  return (
    <div className="pb-5 mb-5">
      <SectionTitle title={moduleName} />
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-[#1a1a1a]">
                  {item.name}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066cc] font-normal text-[11px] ml-2 underline hover:text-[#0052a3]"
                    >
                      {item.link}
                    </a>
                  )}
                </div>
                <div className="text-[12px] text-[#666] mt-0.5">
                  {item.role}
                  {item.location && ` · ${item.location}`}
                </div>
              </div>
              <div className="text-[12px] text-[#999] shrink-0">
                {formatDateRange(item.startDate, item.endDate)}
              </div>
            </div>
            {item.description.length > 0 && item.description[0] && (
              <ul className="mt-2 space-y-1">
                {item.description.map((desc, di) =>
                  desc ? (
                    <li key={di} className="text-[12px] text-[#555] leading-relaxed pl-3 relative">
                      <span className="absolute left-0 top-[5px] w-1 h-1 rounded-full bg-[#aaa]" />
                      {desc}
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section: Education ── */
function EducationSection({ items, moduleName }: { items: typeof defaultResumeData.education; moduleName: string }) {
  if (items.length === 0) return null;
  return (
    <div className="pb-5 mb-5">
      <SectionTitle title={moduleName} />
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-[#1a1a1a]">{item.school}</div>
                <div className="text-[12px] text-[#666] mt-0.5">
                  {item.major}
                  {item.degree && ` · ${item.degree}`}
                  {item.location && ` · ${item.location}`}
                </div>
              </div>
              <div className="text-[12px] text-[#999] shrink-0">
                {formatDateRange(item.startDate, item.endDate)}
              </div>
            </div>

            {item.courses.length > 0 && item.courses[0] && (
              <div className="mt-2 text-[11px] text-[#888]">
                <span className="text-[#666] font-medium">主修课程：</span>
                {item.courses.filter(Boolean).join('、')}
              </div>
            )}

            {item.certificates.length > 0 && item.certificates[0] && (
              <div className="mt-1 text-[11px] text-[#888]">
                <span className="text-[#666] font-medium">获得证书：</span>
                {item.certificates.filter(Boolean).join('、')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Shared: Section Title ── */
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 pb-2 mb-3 border-b-2 border-[#1a1a1a]">
      <span className="text-[13px] font-bold text-[#1a1a1a] uppercase tracking-wider">
        {title}
      </span>
    </div>
  );
}

/* ── Helper: Date Range ── */
function formatDateRange(start?: string, end?: string) {
  if (!start && !end) return '';
  const s = start || '';
  const e = end || '';
  return `${s} ~ ${e || '至今'}`;
}
