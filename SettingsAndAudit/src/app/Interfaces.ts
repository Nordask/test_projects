export interface Settings {
    file: string, // setting 
    operation: string, // add, remove, update
    name: string,
    value: string,
    type: string
  }
  
  export interface Audit {
    file: string, // setting 
    operation: string, // add, remove, update
    dateTime: string,
    host: string,
    event: string,
    description: string,
    result: string
  }