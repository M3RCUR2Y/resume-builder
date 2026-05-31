import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

export default function BasicInfoForm() {
  const { data, updateBasicInfo, updateAvatar } = useResume();
  const { basicInfo } = data;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, 200, 200);
        updateAvatar(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="text-[10px] text-[#555] font-mono uppercase tracking-wider">基本信息</div>

      {/* Avatar */}
      <div className="flex items-center gap-3">
        <div className="relative">
          {basicInfo.avatar ? (
            <img
              src={basicInfo.avatar}
              alt="avatar"
              className="w-14 h-14 rounded-full object-cover border border-[#2a2a2a]"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
              <User className="w-5 h-5 text-[#555]" />
            </div>
          )}
          <label className="absolute inset-0 cursor-pointer rounded-full hover:bg-black/20 transition-colors">
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </label>
        </div>
        <div className="text-[11px] text-[#555]">点击上传头像（可选）</div>
        {basicInfo.avatar && (
          <button
            onClick={() => updateAvatar('')}
            className="text-[11px] text-[#ff4444] hover:text-[#ff6666] ml-auto"
          >
            移除
          </button>
        )}
      </div>

      {/* Name */}
      <div className="space-y-1.5">
        <Label className="text-[11px] text-[#808080]">姓名</Label>
        <Input
          value={basicInfo.name}
          onChange={(e) => updateBasicInfo('name', e.target.value)}
          placeholder="请输入姓名"
          className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors placeholder:text-[#444]"
        />
      </div>

      {/* Phone & Email */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-[11px] text-[#808080]">电话</Label>
          <Input
            value={basicInfo.phone}
            onChange={(e) => updateBasicInfo('phone', e.target.value)}
            placeholder="电话号码"
            className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors placeholder:text-[#444]"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[11px] text-[#808080]">邮箱</Label>
          <Input
            value={basicInfo.email}
            onChange={(e) => updateBasicInfo('email', e.target.value)}
            placeholder="邮箱地址"
            className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors placeholder:text-[#444]"
          />
        </div>
      </div>

      {/* Target & City */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-[11px] text-[#808080]">求职意向</Label>
          <Input
            value={basicInfo.target}
            onChange={(e) => updateBasicInfo('target', e.target.value)}
            placeholder="如：产品经理"
            className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors placeholder:text-[#444]"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[11px] text-[#808080]">城市</Label>
          <Input
            value={basicInfo.city}
            onChange={(e) => updateBasicInfo('city', e.target.value)}
            placeholder="所在城市"
            className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] text-xs h-8 focus:border-white transition-colors placeholder:text-[#444]"
          />
        </div>
      </div>
    </div>
  );
}
