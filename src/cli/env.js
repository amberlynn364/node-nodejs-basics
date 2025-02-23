const parseEnv = () => {
	const envVariables = process.env;
  const rssEnvVariables = Object.entries(envVariables)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  console.log(rssEnvVariables);
};

parseEnv();