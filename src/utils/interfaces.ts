export interface IUser {
  email: string;
  uid: string;
  token: string;
}

export interface IAppRoute {
  path: string;
  element: React.FC;
}

export interface IReadingTest {
  id: string;
  part: string;
  student: string;
  studentId: string;
  img1: string;
  img2: string;
  img3: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
  q12: string;
  q13: string;
  q14: string;
  q15: string;
  q16: string;
  q17: string;
  q18: string;
  q19: string;
  q20: string;
  q21: string;
  q22: string;
  q23: string;
  q24: string;
  q25: string;
  q26: string;
  q27: string;
  q28: string;
  q29: string;
  q30: string;
  q31: string;
  q32: string;
  q33: string;
  q34: string;
  q35: string;
  q36: string;
  q37: string;
  q38: string;
  q39: string;
  q40: string;
}

export interface IListeningTest {
  id: string;
  part: string;
  student: string;
  studentId: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  audio1: string;
  audio2: string;
  audio3: string;
  audio4: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
  q12: string;
  q13: string;
  q14: string;
  q15: string;
  q16: string;
  q17: string;
  q18: string;
  q19: string;
  q20: string;
  q21: string;
  q22: string;
  q23: string;
  q24: string;
  q25: string;
  q26: string;
  q27: string;
  q28: string;
  q29: string;
  q30: string;
  q31: string;
  q32: string;
  q33: string;
  q34: string;
  q35: string;
  q36: string;
  q37: string;
  q38: string;
  q39: string;
  q40: string;
}
export interface IWritingTest {
  id: string;
  part: string;
  img1: string;
  img2: string;
  q1: string;
  q2: string;
  student: string;
  studentId: string;
  wordCount1: string;
  wordCount2: string;
}
export interface IListeningTestAnswer {
  id: string;
  student: string;
  part: string;
  img1: string;
  img2?: string;
  img3?: string;
  img4?: string;
  audio1: string;
  audio2?: string;
  audio3?: string;
  audio4?: string;
  feedback?: string;
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
  q5?: string;
  q6?: string;
  q7?: string;
  q8?: string;
  q9?: string;
  q10?: string;
  q11?: string;
  q12?: string;
  q13?: string;
  q14?: string;
  q15?: string;
  q16?: string;
  q17?: string;
  q18?: string;
  q19?: string;
  q20?: string;
  q21?: string;
  q22?: string;
  q23?: string;
  q24?: string;
  q25?: string;
  q26?: string;
  q27?: string;
  q28?: string;
  q29?: string;
  q30?: string;
  q31?: string;
  q32?: string;
  q33?: string;
  q34?: string;
  q35?: string;
  q36?: string;
  q37?: string;
  q38?: string;
  q39?: string;
  q40?: string;
}


export interface IReadingTestAnswer {
  id: string;
  part: string;
  student: string;
  studentId: string;
  img1: string;
  img2?: string;
  img3?: string;
  feedback?: string;
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
  q5?: string;
  q6?: string;
  q7?: string;
  q8?: string;
  q9?: string;
  q10?: string;
  q11?: string;
  q12?: string;
  q13?: string;
  q14?: string;
  q15?: string;
  q16?: string;
  q17?: string;
  q18?: string;
  q19?: string;
  q20?: string;
  q21?: string;
  q22?: string;
  q23?: string;
  q24?: string;
  q25?: string;
  q26?: string;
  q27?: string;
  q28?: string;
  q29?: string;
  q30?: string;
  q31?: string;
  q32?: string;
  q33?: string;
  q34?: string;
  q35?: string;
  q36?: string;
  q37?: string;
  q38?: string;
  q39?: string;
  q40?: string;
}

export interface IWritingTestAnswer {
  id: string;
  part: string;
  student: string;
  studentId: string;
  img1: string;
  img2: string;
  q1: string;
  q2: string;
  wordCount1: string;
  wordCount2: string;
  feedback: string;
}
