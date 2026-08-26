export interface User {
  id: string;
  email: string;
  role: string;
}

export interface Student extends User {
  firstName: string;
  lastName: string;
}

export interface Counsellor extends User {
  name: string;
}

export interface University {
  id: string;
  name: string;
}

export interface Program {
  id: string;
  title: string;
  universityId: string;
}

export interface Application {
  id: string;
  studentId: string;
  programId: string;
  status: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: string;
}

export interface Subscription {
  id: string;
  plan: string;
}

export interface Notification {
  id: string;
  message: string;
}
