// context/LanguageContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect } from "react"

// Instead of restricting to 4 languages, allow any string
type Language = string  

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language
  useEffect(() => {
    const saved = localStorage.getItem("lang")
    if (saved) setLanguage(saved)
  }, [])

  // Save language on change
  useEffect(() => {
    localStorage.setItem("lang", language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider")
  return ctx
}