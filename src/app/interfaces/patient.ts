export interface Patient {
    id: string;
    image: string;
    name: string;
    email: string;
    assignedDoctor: string;
    dob: Date;
    gender: string;
    phone: string;
    bloodGroup: string;
    balanceDue: number;
    injuryDepartment: string;
  }