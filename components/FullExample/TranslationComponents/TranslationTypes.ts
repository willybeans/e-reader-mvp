export interface TranslationResponse {
  alternatives?:     string[];
  detectedLanguage?: DetectedLanguage;
  translatedText?:   string;
}

export interface DetectedLanguage {
  confidence: number;
  language:   string;
}
