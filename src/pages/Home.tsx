import { useState, useEffect } from 'react';
import { ResumeProvider } from '@/context/ResumeContext';
import Toolbar from '@/components/editor/Toolbar';
import EditorPanel from '@/components/editor/EditorPanel';
import ResumePreview from '@/components/preview/ResumePreview';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <ResumeProvider>
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
        <Toolbar />

        {isMobile ? (
          /* Mobile: Tabs */
          <Tabs defaultValue="editor" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="shrink-0 mx-4 mt-2 bg-[#111111] border border-[#2a2a2a] h-9">
              <TabsTrigger
                value="editor"
                className="text-xs data-[state=active]:bg-white data-[state=active]:text-black text-[#808080]"
              >
                编辑
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="text-xs data-[state=active]:bg-white data-[state=active]:text-black text-[#808080]"
              >
                预览
              </TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="flex-1 overflow-hidden mt-0 border-0">
              <div className="h-full border-r border-[#2a2a2a] bg-[#0d0d0d]">
                <EditorPanel />
              </div>
            </TabsContent>
            <TabsContent value="preview" className="flex-1 overflow-hidden mt-0 border-0 p-0">
              <ResumePreview />
            </TabsContent>
          </Tabs>
        ) : (
          /* Desktop: Split Pane */
          <div className="flex-1 flex overflow-hidden">
            {/* Editor Sidebar */}
            <div className="w-[380px] shrink-0 border-r border-[#2a2a2a] bg-[#0d0d0d] overflow-hidden">
              <EditorPanel />
            </div>
            {/* Preview Area */}
            <div className="flex-1 overflow-hidden">
              <ResumePreview />
            </div>
          </div>
        )}
      </div>
    </ResumeProvider>
  );
}
