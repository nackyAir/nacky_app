"use client";

import { useState } from "react";
import * as motion from "framer-motion/client";
import { Briefcase, User, Code2, Sparkles } from "@repo/ui/icons/lucide";

import {
  Timeline,
  clientProjects,
  personalProjects,
} from "~/features/Home/ProjectTimeLIne";

type TabType = "personal" | "client";

const tabs: Array<{
  id: TabType;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  count: number;
}> = [
  {
    id: "personal",
    label: "個人プロジェクト",
    icon: User,
    description: "自主的な技術探求とイノベーション",
    count: personalProjects.length,
  },
  {
    id: "client",
    label: "受託開発・インターン",
    icon: Briefcase,
    description: "実務経験とチーム開発の実績",
    count: clientProjects.length,
  },
];

function TabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: (typeof tabs)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 rounded-lg p-4 text-left transition-all duration-200
        ${
          isActive
            ? "bg-white dark:bg-slate-900 border border-blue-600 dark:border-blue-500"
            : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
          p-2 rounded-lg transition-colors duration-200
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }
        `}
        >
          <tab.icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3
            className={`
            font-semibold transition-colors duration-200
            ${
              isActive
                ? "text-slate-900 dark:text-white"
                : "text-slate-700 dark:text-slate-300"
            }
          `}
          >
            {tab.label}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {tab.description}
            </span>
            <span
              className={`
              px-2 py-0.5 rounded text-xs font-medium
              ${
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }
            `}
            >
              {tab.count}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function ProjectsHeader({ activeTab }: { activeTab: TabType }) {
  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <div className="inline-flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-blue-600 text-white">
          {currentTab && <currentTab.icon className="w-5 h-5" />}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {currentTab?.label}
        </h3>
      </div>
      <p className="text-slate-600 dark:text-slate-400">
        {currentTab?.description}を通じて培った技術力と創造性をご紹介します
      </p>
    </motion.div>
  );
}

export function ProjectTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </motion.div>

      <ProjectsHeader activeTab={activeTab} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6"
      >
        {activeTab === "personal" && <Timeline items={personalProjects} />}
        {activeTab === "client" && <Timeline items={clientProjects} />}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 mb-2">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div className="text-xl font-semibold text-slate-900 dark:text-white">
            {personalProjects.length + clientProjects.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Total Projects
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 mb-2">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="text-xl font-semibold text-slate-900 dark:text-white">
            {clientProjects.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Client Work
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 mb-2">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-xl font-semibold text-slate-900 dark:text-white">
            {personalProjects.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Personal
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 mb-2">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-xl font-semibold text-slate-900 dark:text-white">
            3+
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Years Exp
          </div>
        </div>
      </motion.div>
    </div>
  );
}
