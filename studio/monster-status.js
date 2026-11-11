
const API_URL =
  'https://monster-ai-api.j-huang-remote.workers.dev/public-status';

const AGENT_IDS = ['bigfoot', 'yeti', 'swamp', 'vampire'];

export async function getMonsterStatus() {
  const response = await fetch(API_URL, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Monster API HTTP ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== 'online' || !Array.isArray(data.agents)) {
    throw new Error('Invalid monster status response');
  }

  return AGENT_IDS.map(id => {
    const agent = data.agents.find(item => item.id === id);

    return {
      id,
      status: agent?.status === 'working' ? 'working' : 'idle'
    };
  });
}
