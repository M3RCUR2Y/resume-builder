import { useResume } from '@/context/ResumeContext';
import ModuleTabs from './ModuleTabs';
import BasicInfoForm from './BasicInfoForm';
import AdvantagesForm from './AdvantagesForm';
import ExperienceForm from './ExperienceForm';

export default function EditorPanel() {
  const { activeModule } = useResume();

  const renderForm = () => {
    switch (activeModule) {
      case 'basicInfo':
        return <BasicInfoForm />;
      case 'advantages':
        return <AdvantagesForm />;
      case 'workExperience':
        return <ExperienceForm type="workExperience" />;
      case 'projects':
        return <ExperienceForm type="projects" />;
      case 'education':
        return <ExperienceForm type="education" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-5">
          <ModuleTabs />
          <div className="border-t border-[#2a2a2a] pt-4">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
}
