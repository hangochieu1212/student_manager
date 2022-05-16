const generateResponseJson = (code: number, message: string, data: object | null) => ({
  code,
  message,
  data,
});

export {
  generateResponseJson,
};
