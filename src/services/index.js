export const getTokenApi = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const result = await (await fetch(endpoint)).json();
  return result;
};

export const getQuestionsApi = async () => {
  const { token } = await getTokenApi();
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const result = await (await fetch(endpoint)).json();
  return result.results;
};
