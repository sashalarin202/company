export interface BaseEntity {
  Id: number;
}

export interface Department extends BaseEntity {
  Name: string;
}

export interface Employee extends BaseEntity {
  Name: string;
  DepartmentId: number;
  DateOfJoining: string;
  PhotoFileName: string;
}

