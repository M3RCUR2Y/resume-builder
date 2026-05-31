import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ResumeData, ModuleKey, ModuleConfig, Advantage, WorkExperience, Project, Education } from '@/types/resume';
import { defaultResumeData } from '@/lib/defaultData';

interface ResumeContextType {
  data: ResumeData;
  activeModule: ModuleKey;
  setActiveModule: (key: ModuleKey) => void;
  updateBasicInfo: (field: string, value: string) => void;
  updateAvatar: (url: string) => void;
  setAdvantages: (advantages: Advantage[]) => void;
  setWorkExperience: (exp: WorkExperience[]) => void;
  setProjects: (projects: Project[]) => void;
  setEducation: (edu: Education[]) => void;
  updateModuleOrder: (order: ModuleConfig[]) => void;
  renameModule: (key: ModuleKey, name: string) => void;
  toggleModuleVisibility: (key: ModuleKey) => void;
  togglePageBreak: (key: ModuleKey) => void;
  resetData: () => void;
  loadData: (data: ResumeData) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#data=')) {
      try {
        const json = atob(decodeURIComponent(hash.slice(6)));
        return JSON.parse(json) as ResumeData;
      } catch {
        return defaultResumeData;
      }
    }
    return defaultResumeData;
  });

  const [activeModule, setActiveModule] = useState<ModuleKey>('basicInfo');

  const updateBasicInfo = useCallback((field: string, value: string) => {
    setData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value },
    }));
  }, []);

  const updateAvatar = useCallback((url: string) => {
    setData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, avatar: url },
    }));
  }, []);

  const setAdvantages = useCallback((advantages: Advantage[]) => {
    setData(prev => ({ ...prev, advantages }));
  }, []);

  const setWorkExperience = useCallback((workExperience: WorkExperience[]) => {
    setData(prev => ({ ...prev, workExperience }));
  }, []);

  const setProjects = useCallback((projects: Project[]) => {
    setData(prev => ({ ...prev, projects }));
  }, []);

  const setEducation = useCallback((education: Education[]) => {
    setData(prev => ({ ...prev, education }));
  }, []);

  const updateModuleOrder = useCallback((moduleOrder: ModuleConfig[]) => {
    setData(prev => ({ ...prev, moduleOrder }));
  }, []);

  const renameModule = useCallback((key: ModuleKey, name: string) => {
    setData(prev => ({
      ...prev,
      moduleOrder: prev.moduleOrder.map(m =>
        m.key === key ? { ...m, name } : m
      ),
    }));
  }, []);

  const toggleModuleVisibility = useCallback((key: ModuleKey) => {
    setData(prev => ({
      ...prev,
      moduleOrder: prev.moduleOrder.map(m =>
        m.key === key ? { ...m, visible: !m.visible } : m
      ),
    }));
  }, []);

  const togglePageBreak = useCallback((key: ModuleKey) => {
    setData(prev => ({
      ...prev,
      moduleOrder: prev.moduleOrder.map(m =>
        m.key === key ? { ...m, pageBreakBefore: !m.pageBreakBefore } : m
      ),
    }));
  }, []);

  const resetData = useCallback(() => {
    setData(defaultResumeData);
  }, []);

  const loadData = useCallback((newData: ResumeData) => {
    setData(newData);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        data,
        activeModule,
        setActiveModule,
        updateBasicInfo,
        updateAvatar,
        setAdvantages,
        setWorkExperience,
        setProjects,
        setEducation,
        updateModuleOrder,
        renameModule,
        toggleModuleVisibility,
        togglePageBreak,
        resetData,
        loadData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
