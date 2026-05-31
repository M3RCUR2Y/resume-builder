import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export default function AdvantagesForm() {
  const { data, setAdvantages } = useResume();
  const { advantages } = data;

  const addAdvantage = () => {
    if (advantages.length >= 6) return;
    setAdvantages([
      ...advantages,
      {
        id: `adv-${Date.now()}`,
        title: '',
        description: '',
      },
    ]);
  };

  const updateAdvantage = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...advantages];
    updated[index] = { ...updated[index], [field]: value };
    setAdvantages(updated);
  };

  const removeAdvantage = (index: number) => {
    setAdvantages(advantages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="text-[10px] text-[#555] font-mono uppercase tracking-wider">
        核心优势 ({advantages.length}/6)
      </div>

      <div className="space-y-3">
        {advantages.map((adv, index) => (
          <div
            key={adv.id}
            className="bg-[#111111] border border-[#2a2a2a] rounded-md p-3 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#555] font-mono">#{index + 1}</span>
              <button
                onClick={() => removeAdvantage(index)}
                className="p-1 rounded hover:bg-[#ff4444]/20 hover:text-[#ff4444] text-[#555] transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#808080]">标题</Label>
              <Input
                value={adv.title}
                onChange={(e) => updateAdvantage(index, 'title', e.target.value)}
                placeholder="如：数据分析与决策"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors placeholder:text-[#444]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#808080]">描述</Label>
              <Textarea
                value={adv.description}
                onChange={(e) => updateAdvantage(index, 'description', e.target.value)}
                placeholder="详细描述该优势..."
                className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs min-h-[60px] focus:border-white transition-colors resize-y placeholder:text-[#444]"
              />
            </div>
          </div>
        ))}
      </div>

      {advantages.length < 6 && (
        <Button
          variant="outline"
          size="sm"
          onClick={addAdvantage}
          className="w-full border-[#2a2a2a] text-[#808080] hover:border-[#fff] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] text-xs h-8"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          添加条目
        </Button>
      )}
    </div>
  );
}
