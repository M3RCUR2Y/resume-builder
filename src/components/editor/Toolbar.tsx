import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Download, RotateCcw, FileText, Image, Link, Check, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Toolbar() {
  const { data, resetData } = useResume();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [exporting, setExporting] = useState<'pdf' | 'png' | null>(null);
  const [copied, setCopied] = useState(false);

  const exportPDF = async () => {
    setExporting('pdf');
    try {
      const el = document.getElementById('resume-preview-page');
      if (!el) return;

      // Collect page-break marker positions before capture (CSS pixels relative to container)
      const containerRect = el.getBoundingClientRect();
      const breakMarkers = el.querySelectorAll('[data-page-break="true"]');
      const forcedBreaks: number[] = [];
      breakMarkers.forEach(marker => {
        const markerRect = marker.getBoundingClientRect();
        const yInContainer = markerRect.top - containerRect.top + el.scrollTop;
        forcedBreaks.push(yInContainer);
      });

      await new Promise(r => setTimeout(r, 200));
      const scale = 2;
      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // One A4 page height in canvas pixels
      const pageHeightInPx = imgWidth * (pdfHeight / pdfWidth);

      // Convert forced-break CSS positions to canvas-pixel positions
      const forcedBreakPx = forcedBreaks.map(y => y * scale);

      // Build page slices respecting forced breaks
      const slices: { start: number; end: number }[] = [];

      // Merge forced breaks with auto page-break boundaries
      // Walk from top to bottom, applying forced breaks first, then auto-splitting
      const allBreakCandidates = [0, ...forcedBreakPx, imgHeight].sort((a, b) => a - b);

      for (let i = 0; i < allBreakCandidates.length - 1; i++) {
        const sectionStart = allBreakCandidates[i];
        const sectionEnd = allBreakCandidates[i + 1];
        // Within each section (between forced breaks), auto-split if taller than one page
        let pos = sectionStart;
        while (pos < sectionEnd) {
          const sliceEnd = Math.min(pos + pageHeightInPx, sectionEnd);
          slices.push({ start: pos, end: sliceEnd });
          pos = sliceEnd;
        }
      }

      for (let si = 0; si < slices.length; si++) {
        if (si > 0) {
          pdf.addPage();
        }

        const { start, end } = slices[si];
        const sliceHeight = end - start;

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = imgWidth;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext('2d')!;

        ctx.drawImage(
          canvas,
          0, start,
          imgWidth, sliceHeight,
          0, 0,
          imgWidth, sliceHeight,
        );

        const pageImgData = pageCanvas.toDataURL('image/png');
        const slicePdfHeight = sliceHeight * (pdfWidth / imgWidth);
        pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, slicePdfHeight);
      }

      pdf.save(`${data.basicInfo.name || '简历'}_简历_${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      setExporting(null);
    }
  };

  const exportPNG = async () => {
    setExporting('png');
    try {
      const el = document.getElementById('resume-preview-page');
      if (!el) return;
      await new Promise(r => setTimeout(r, 200));
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `${data.basicInfo.name || '简历'}_简历_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setExporting(null);
    }
  };

  const copyLink = () => {
    try {
      const json = JSON.stringify(data);
      const base64 = btoa(encodeURIComponent(json));
      const url = `${window.location.origin}${window.location.pathname}#data=${base64}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('内容过长，无法生成链接');
    }
  };

  return (
    <>
      <header className="h-14 border-b border-[#2a2a2a] bg-[#0a0a0a] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#f0f0f0] tracking-tight">简历构建器</span>
          <span className="text-[11px] text-[#555] font-mono">PRODUCT MANAGER RESUME</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowResetDialog(true)}
            className="text-[#808080] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] h-8 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            重置
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="bg-white text-black hover:bg-[#e0e0e0] h-8 text-xs font-medium"
                disabled={!!exporting}
              >
                {exporting === 'pdf' ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                ) : exporting === 'png' ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                )}
                {exporting ? '导出中...' : '导出'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-[#2a2a2a] min-w-[160px]">
              <DropdownMenuItem onClick={exportPDF} className="text-[#f0f0f0] hover:bg-[#2a2a2a] text-xs cursor-pointer focus:bg-[#2a2a2a] focus:text-[#f0f0f0]">
                <FileText className="w-3.5 h-3.5 mr-2" />
                导出为 PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportPNG} className="text-[#f0f0f0] hover:bg-[#2a2a2a] text-xs cursor-pointer focus:bg-[#2a2a2a] focus:text-[#f0f0f0]">
                <Image className="w-3.5 h-3.5 mr-2" />
                导出为 PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={copyLink} className="text-[#f0f0f0] hover:bg-[#2a2a2a] text-xs cursor-pointer focus:bg-[#2a2a2a] focus:text-[#f0f0f0]">
                {copied ? <Check className="w-3.5 h-3.5 mr-2 text-green-400" /> : <Link className="w-3.5 h-3.5 mr-2" />}
                {copied ? '已复制链接' : '复制分享链接'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="bg-[#111111] border-[#2a2a2a] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[#f0f0f0] text-sm">确定要重置简历吗？</DialogTitle>
            <DialogDescription className="text-[#808080] text-xs">
              所有自定义内容将被清空，恢复为默认示例数据。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResetDialog(false)}
              className="border-[#2a2a2a] text-[#f0f0f0] hover:bg-[#1a1a1a] hover:border-[#fff] text-xs"
            >
              取消
            </Button>
            <Button
              size="sm"
              onClick={() => {
                resetData();
                setShowResetDialog(false);
              }}
              className="bg-[#ff4444] text-white hover:bg-[#ff6666] text-xs"
            >
              确定重置
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
