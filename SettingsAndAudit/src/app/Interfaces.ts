export interface Settings {
    name: string,
    value: string,
    type: string
  }
  
  export interface Audit {
    dateTime: Date,
    host: string,
    event: string,
    description: string,
    result: string
  }