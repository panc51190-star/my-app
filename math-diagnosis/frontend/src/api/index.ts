import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export interface MathError {
  _id: string;
  topic: string;
  question: string;
  wrongAnswer: string;
  correctAnswer: string;
  errorType: string;
  note: string;
  difficulty: number;
  mastered: boolean;
  createdAt: string;
}

export interface Stats {
  total: number;
  mastered: number;
  unmastered: number;
  byTopic: { _id: string; count: number; masteredCount: number }[];
  byErrorType: { _id: string; count: number }[];
  recent: MathError[];
}

export const getErrors = () => api.get<MathError[]>('/errors').then((r) => r.data);
export const getStats = () => api.get<Stats>('/errors/stats').then((r) => r.data);
export const addError = (data: Omit<MathError, '_id' | 'mastered' | 'createdAt'>) =>
  api.post<MathError>('/errors', data).then((r) => r.data);
export const updateError = (id: string, data: Partial<MathError>) =>
  api.patch<MathError>(`/errors/${id}`, data).then((r) => r.data);
export const deleteError = (id: string) => api.delete(`/errors/${id}`);

export interface ScoreRule {
  _id: string;
  scoreRange: string;
  knowledgePoints: string[];
  coreTopics: string[];
}

export const diagnoseByScore = (scoreRange: string) =>
  api.post<ScoreRule>('/diagnose', { scoreRange }).then((r) => r.data);
