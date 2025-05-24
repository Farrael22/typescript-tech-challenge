export const Mock = <T>(type: Partial<{ [Property in keyof T]: any }>) => type as T
