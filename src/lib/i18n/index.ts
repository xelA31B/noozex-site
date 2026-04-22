import { en } from "./en"
import { ru } from "./ru"

export type Lang = "en" | "ru"

export const dictionaries = { en, ru }

export function getDictionary(lang: Lang) {
  return dictionaries[lang] ?? dictionaries.en
}

export const defaultLang: Lang = "en"
export const supportedLangs: Lang[] = ["en", "ru"]
