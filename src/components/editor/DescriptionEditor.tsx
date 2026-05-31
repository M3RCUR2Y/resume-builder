import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import type { WorkExperience, Project, Education } from '@/types/resume';

type AnyExperience = WorkExperience | Project | Education;

interface DescriptionEditorProps {
  exp: AnyExperience;
  index: number;
  updateExperience: (index: number, field: string, value: unknown) => void;
  isEducation: boolean;
}

export default function DescriptionEditor({ exp, index, updateExperience, isEducation }: DescriptionEditorProps) {
  // Education uses courses/certificates instead of description
  if (isEducation) {
    return (
      <div className="space-y-2">
        <Label className="text-[11px] text-[#808080]">描述（可选）</Label>
        {((exp as WorkExperience).description || []).map((desc: string, di: number) => (
          <div key={di} className="flex gap-1.5">
            <Textarea
              value={desc}
              onChange={(e) => {
                const descs = [...((exp as WorkExperience).description || [])];
                descs[di] = e.target.value;
                updateExperience(index, 'description', descs);
              }}
              placeholder="描述内容..."
              className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs min-h-[50px] focus:border-white transition-colors resize-y flex-1 placeholder:text-[#444]"
            />
            <button
              onClick={() => {
                const descs = ((exp as WorkExperience).description || []).filter((_: string, i: number) => i !== di);
                updateExperience(index, 'description', descs);
              }}
              className="p-1 rounded hover:bg-[#ff4444]/20 hover:text-[#ff4444] text-[#555] transition-colors self-start"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const descs = [...((exp as WorkExperience).description || []), ''];
            updateExperience(index, 'description', descs);
          }}
          className="border-[#2a2a2a] text-[#808080] hover:border-[#fff] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] text-xs h-7"
        >
          <Plus className="w-3 h-3 mr-1" />
          添加描述
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label className="text-[11px] text-[#808080]">描述</Label>
      {((exp as WorkExperience | Project).description || []).map((desc: string, di: number) => (
        <div key={di} className="flex gap-1.5">
          <Textarea
            value={desc}
            onChange={(e) => {
              const descs = [...((exp as WorkExperience | Project).description || [])];
              descs[di] = e.target.value;
              updateExperience(index, 'description', descs);
            }}
            placeholder="描述内容..."
            className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs min-h-[50px] focus:border-white transition-colors resize-y flex-1 placeholder:text-[#444]"
          />
          <button
            onClick={() => {
              const descs = ((exp as WorkExperience | Project).description || []).filter((_: string, i: number) => i !== di);
              updateExperience(index, 'description', descs);
            }}
            className="p-1 rounded hover:bg-[#ff4444]/20 hover:text-[#ff4444] text-[#555] transition-colors self-start"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const descs = [...((exp as WorkExperience | Project).description || []), ''];
          updateExperience(index, 'description', descs);
        }}
        className="border-[#2a2a2a] text-[#808080] hover:border-[#fff] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] text-xs h-7"
      >
        <Plus className="w-3 h-3 mr-1" />
        添加描述
      </Button>
    </div>
  );
}
